# backend/Dockerfile
FROM python:3.11

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj plik requirements.txt i zainstaluj zależności
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj pozostałe pliki aplikacji
COPY . /app/

# Otwórz port 8000
EXPOSE 8000

# Uruchom serwer Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]