from flask import Blueprint, request, jsonify
from googlemaps.exceptions import ApiError
from ..explore import find_route
from ..helper import convert_route_images_to_base64

explore_bp = Blueprint("explore", __name__)


@explore_bp.route('/explore')
def explore():
    origin = request.args['origin']
    destination = request.args['destination']

    result = {
        "route": None,
        "status": "Unknown"
    }

    try:
        route = find_route(origin, destination)
        convert_route_images_to_base64(route)
        result["status"] = "OK"
        result["route"] = route
    except ApiError:
        result["status"] = "NOT_FOUND"

    return jsonify(result)
