
DEBUG = False

ALLOWED_HOSTS = ['*'] # or ip-adres server

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db1',
        'USER': 'django_shop',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '', # empty for default
    }
}
