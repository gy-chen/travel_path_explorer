from functools import partial
from flask import Blueprint, request, jsonify, url_for
from . import file_storage
from .. import explore
from ..exception import TransportError, ApiError, NotFoundError

explore_bp = Blueprint("explore", __name__)


def extract_image(content):
    name = file_storage.file_storage.put(content)
    return url_for('file_storage.get', name=name, _external=True)


find_route = partial(explore.find_route, extract_image=extract_image)


@explore_bp.route('/explore')
def explore_():
    origin = request.args['origin']
    destination = request.args['destination']

    result = {
        "route": None,
        "status": "Unknown"
    }

    try:
        route = find_route(origin, destination)
        result["status"] = "OK"
        result["route"] = route
    except NotFoundError:
        result["status"] = "NOT_FOUND"
    except (TransportError, ApiError):
        result["status"] = "UNAVAILABLE"

    return jsonify(result)
