from . import db


class GeoLocation(db.Model):
    __tablename__ = 'geolocation'

    network = db.Column(db.String, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
