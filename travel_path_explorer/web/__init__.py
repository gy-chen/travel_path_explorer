from flask import Flask
from flask_cors import CORS
from .model import db
from .explore import explore_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object('travel_path_explorer.web.config.Config')
    CORS(app)
    db.init_app(app)

    app.register_blueprint(explore_bp)

    return app


app = create_app()
