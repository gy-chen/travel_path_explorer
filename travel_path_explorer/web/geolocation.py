import netaddr
from flask import current_app, Blueprint, request, jsonify
from .model.geolocation import GeoLocation as GeoLocationModel

geolocation_bp = Blueprint('geolocation', __name__)


@geolocation_bp.route('/geolocation')
def geolocation():
    """Search geolocation of requester's ip

    return JSON data that in format { "lat": ..., "lng": ...}
    """
    remote_addr = request.headers.get('X-Real-IP') or\
        request.headers.get('X-Forwarded-For') or\
        request.remote_addr
    return jsonify(geolocation.find_geolocation(remote_addr))


class GeoLocation:
    """GeoLocation flask extension

    provides:
      - search latitude and longtitude of the ip

    settings:
      - GEOLOCATION_DEFAULT_LATITUDE: default latitude when latitude of the ip is not found
      - GEOLOCATION_DEFAULT_LONGTITUDE: default longtitude when longtitude of the ip is not found
    """

    def __init__(self, app=None, db=None):
        self._app = app
        self._db = db
        if app is not None and db is not None:
            self.init_app(app, db)

    def init_app(self, app, db=None):
        db = db or self._db
        app.config.setdefault('GEOLOCATION_DEFAULT_LATITUDE', None)
        app.config.setdefault('GEOLOCATION_DEFAULT_LONGTITUDE', None)
        app._db = db

    @property
    def app(self):
        return self._app or current_app

    @property
    def db(self):
        try:
            return self.app._db
        except AttributeError:
            raise RuntimeError(
                'Not initialize GeoLocation with app and db. Please call init_app(app, db) or initialize with app and db first.')

    def find_geolocation(self, ip):
        """Find geolocation of the ip

        if cannot find the geolocation, use defualt latitude and longtitude that provided in settings 
        instead.

        :return: { 'lat': ..., 'lng': ...}
        """
        ip = netaddr.IPNetwork(ip)
        geolocation = self.db.session.query(GeoLocationModel).filter(GeoLocationModel.network_from <= ip.value,
                                                                     ip.value < GeoLocationModel.network_to
                                                                     ).one_or_none()
        if geolocation is not None:
            return {
                'lat': geolocation.lat,
                'lng': geolocation.lng
            }
        else:
            return {
                'lat': self.app.config['GEOLOCATION_DEFAULT_LATITUDE'],
                'lng': self.app.config['GEOLOCATION_DEFAULT_LONGTITUDE']
            }


geolocation = GeoLocation()
