import sqlite3
conn = sqlite3.connect('spots.db')
cur = conn.cursor()

with open('schema.sql', 'r', encoding='utf-8') as f:
    cur.executescript(f.read())

conn.commit()
conn.close()
print('Database initialized.')