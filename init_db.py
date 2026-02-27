import sqlite3, os

DB_PATH = os.getenv('DB_PATH', 'spots.db')
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

with open('schema.sql', 'r', encoding='utf-8') as f:
    cur.executescript(f.read())

conn.commit()
conn.close()
print('Database initialized.')