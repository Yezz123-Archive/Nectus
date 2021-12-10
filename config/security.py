from decouple import config


class JWT(object):
    """
    JWT settings

    Args:
        object (object): Inherits from object

    Returns:
        object: JWT settings
    """

    JWT_SECRET_KEY = config("JWT_SECRET_KEY")
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
