import os

basedir = os.path.abspath(os.path.dirname(__file__))


class JWT(object):
    """
    JWT settings

    Args:
        object (object): Inherits from object

    Returns:
        object: JWT settings
    """

    JWT_SECRET_KEY = str(os.environ.get("JWT_SECRET"))
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
