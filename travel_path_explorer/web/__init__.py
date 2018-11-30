from flask import Flask
from flask_cors import CORS
from .model import db, migrate
from .explore import explore_bp
from .geolocation import geolocation, geolocation_bp
from .file_storage import FileStorage, file_storage_bg


def create_app(config_mapping=None):
    app = Flask(__name__)
    app.config.from_object('travel_path_explorer.web.config.Config')
    if config_mapping is not None:
        app.config.from_mapping(config_mapping)
    CORS(app)
    db.init_app(app)
    migrate.init_app(app)
    geolocation.init_app(app, db)
    file_storage = FileStorage()
    file_storage.init_app(app)

    app.register_blueprint(geolocation_bp)
    app.register_blueprint(explore_bp)
    app.register_blueprint(file_storage_bg, url_prefix='/files')

    return app


app = create_app()
