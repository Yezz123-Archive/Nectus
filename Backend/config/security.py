import os

basedir = os.path.abspath(os.path.dirname(__file__))


class JWT(object):
    JWT_SECRET_KEY = str(os.environ.get("JWT_SECRET"))
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
