import json
import os
import sys

def handler(event: dict, context) -> dict:
    """Принимает заявку от клиента типографии и сохраняет в базу данных."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
        'Content-Type': 'application/json'
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    try:
        import psycopg2
    except ImportError:
        for path in ['/usr/lib/python3/dist-packages', '/usr/local/lib/python3.11/dist-packages']:
            sys.path.insert(0, path)
        import psycopg2

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, comment) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, comment or None)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'id': lead_id})
    }
