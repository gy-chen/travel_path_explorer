from flask import Flask
from flask_cors import CORS
from .explore import explore_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(explore_bp)

    return app


app = create_app()
