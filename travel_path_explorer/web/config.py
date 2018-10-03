import os


def convert_to_float(value, default=None):
    try:
        return float(value)
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
