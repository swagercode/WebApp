import psycopg, os
from dotenv import load_dotenv

DB_PATH = os.getenv('DB_PATH', 'spots.db')
conn = psycopg.connect(DB_PATH)
cur = conn.cursor()

with open('schema.sql', 'r', encoding='utf-8') as f:
    cur.execute(f.read())

load_dotenv()

conn.commit()
conn.close()
print('Database initialized.')