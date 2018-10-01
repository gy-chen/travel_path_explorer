from flask import Flask
from flask_cors import CORS
from .model import db, migrate
from .explore import explore_bp
from .geolocation import geolocation, geolocation_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object('travel_path_explorer.web.config.Config')
    CORS(app)
    db.init_app(app)
    migrate.init_app(app)
    geolocation.init_app(app, db)

    app.register_blueprint(geolocation_bp)
    app.register_blueprint(explore_bp)

    return app


app = create_app()
