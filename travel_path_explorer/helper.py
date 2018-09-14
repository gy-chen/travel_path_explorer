import math


def calculate_heading(origin, destination):
    """Calculate heading direction from origin to destination

    :param origin: origin coordinate
    :param destination: destination coordinate
    :return: float in degrees, 0 means north, 90 means east, 180 means south, 270 means west
    """
    adj, opp = destination['lng'] - origin['lng'], destination['lat'] - origin['lat']
    hyp = math.sqrt(adj ** 2 + opp ** 2)
    theta = math.asin(opp / hyp) * 180 / math.pi
    # convert from unit circle to degrees that gmap accept
    return -theta + 90
