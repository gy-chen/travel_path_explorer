from flask import Blueprint, request, jsonify
from ..explore import find_route
from ..helper import convert_route_images_to_base64

explore_bp = Blueprint("explore", __name__)


@explore_bp.route('/explore')
def explore():
    origin = request.args['origin']
    destination = request.args['destination']

    route = find_route(origin, destination)
    convert_route_images_to_base64(route)
    return jsonify(route)
