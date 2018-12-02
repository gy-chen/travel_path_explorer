import os


def convert_to_float(value, default=None):
    try:
        return float(value)
    except ValueError:
        return None


def convert_to_int(value, default=None):
    try:
        return int(value)
    except ValueError:
        return None


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'SQLALCHEMY_DATABASE_URI', 'sqlite:///:memory:')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv(
        'SQLALCHEMY_TRACK_MODIFICATIONS', False)
    GEOLOCATION_DEFAULT_LATITUDE = convert_to_float(os.getenv(
        'GEOLOCATION_DEFAULT_LATITUDE'))
    GEOLOCATION_DEFAULT_LONGTITUDE = convert_to_float(os.getenv(
        'GEOLOCATION_DEFAULT_LONGTITUDE'))
    EXPLORE_PARKINGS_MAX_RESULTS = convert_to_int(os.getenv(
        'EXPLORE_PARKINGS_MAX_RESULTS'))
