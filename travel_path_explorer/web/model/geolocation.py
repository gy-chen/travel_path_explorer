from . import db


class GeoLocation(db.Model):
    __tablename__ = 'geolocation'
    __table_args__ = (
        db.PrimaryKeyConstraint('network_from', 'network_to'),
    )

    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    network = db.Column(db.String, nullable=False)
    network_from = db.Column(db.Integer)
    network_to = db.Column(db.Integer)
