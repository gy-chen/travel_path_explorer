import base64
import math
from itertools import chain


def calculate_heading(origin, destination):
    """Calculate heading direction from origin to destination

    :param origin: origin coordinate
    :param destination: destination coordinate
    :return: float in degrees, 0 means north, 90 means east, 180 means south, 270 means west
    """
    adj, opp = destination['lng'] - \
        origin['lng'], destination['lat'] - origin['lat']
    hyp = math.sqrt(adj ** 2 + opp ** 2)
    theta = math.asin(opp / hyp) * 180 / math.pi
    # convert from unit circle to degrees that gmap accept
    return -theta + 90


def convert_route_images_to_base64(route):
    """Convert every images in route to base64 string.

    By default, find route will use bytes to stored image. Convert it to base64 
    to let route be able is saved in JSON format.
    """
    for img_container in chain(route['steps'], route['parkings']):
        img_container['image'] = base64.b64encode(
            img_container['image']).decode()
