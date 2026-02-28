FROM python:3.13-slim

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["sh", "-c", "python init_db.py && exec gunicorn -w 4 -b 0.0.0.0:5000 main:app"]