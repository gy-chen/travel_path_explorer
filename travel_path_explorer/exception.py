from googlemaps.exceptions import ApiError, TransportError, Timeout

__ALL__ = ['ApiError', 'TransportError', 'Timeout', 'NotFoundError']


class NotFoundError(Exception):
    pass
