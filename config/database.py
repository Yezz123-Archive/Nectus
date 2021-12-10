from decouple import config


class Config(object):
    """
    This class is used to configure the database.

    Args:
        object (): The parent class.
    """

    HOST = config("DB_HOST")
    DATABASE = config("DB_NAME")
    USERNAME = config("DB_USER")
    PASSWORD = config("DB_PASSWORD")
    PORT = config("DB_PORT")

    SQLALCHEMY_DATABASE_URI = (
        "postgresql://{username}:{password}@{host}:{port}/{database}".format(
            username=USERNAME,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            database=DATABASE,
        )
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
