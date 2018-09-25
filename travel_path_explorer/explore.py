try:
    from .gmaps import gmaps
    from .helper import calculate_heading
except ModuleNotFoundError:
    from gmaps import gmaps
    from helper import calculate_heading


def find_route(origin, destination):
    """Find route from origin to destination

    Route contains information about:
      - overview
        - polyline: can be drawn on the map
      - steps: list of step info
        - html_instructions
        - distance
        - location
        - image
      - parkings: list of parking info
        - location
        - image


    :param origin: (lat, lot) coordinate of origin
    :param destination: (lat, lot) coordinate of destination
    :return: dict
    """
    steps = find_steps(origin, destination)
    parkings = find_parkings(steps[-1]['location']) if steps else None

    result = {
        'overview': find_overview(origin, destination),
        'steps': steps,
        'parkings': parkings
    }

    return result


def find_overview(origin, destination):
    """Find overview of the route from the origin to the destination

    overview:
        - polyline

    :param origin:
    :param destination:
    :return: dict
    """
    directions_result = gmaps.directions(origin, destination)
    if not directions_result:
        raise ValueError("Cannot find directions")
    directions_result = directions_result[0]
    overview = {
        'polyline': directions_result['overview_polyline']
    }
    return overview


def find_steps(origin, destination):
    """Find steps of the route from the origin to the destination

    steps: list of step info
        - html_instructions
        - distance
        - location
        - image

    :param origin:
    :param destination:
    :return: list
    """
    directions_result = gmaps.directions(origin, destination)
    if not directions_result:
        raise ValueError("Cannot find directions")
    directions_result = directions_result[0]
    steps = [{
        "html_instructions": step["html_instructions"],
        "distance": step["distance"]["text"],
        "location": step.get("start_location", step.get("end_location")),
        "image": find_image(step)
    } for step in directions_result['legs'][0]['steps']]
    return steps


def find_image(step):
    origin, destination = step.get("start_location"), step.get("end_location")
    if not origin or not destination:
        return None
    heading = calculate_heading(origin, destination)
    return gmaps.streetview(destination, size="800x600", heading=heading, fov=120)


def find_parkings(destination):
    """Find nearby parkings of the destination

    Parking info:
    {
        'location': {'lat': ..., 'lng': ...},
        'image': ...,
        'name': ...,
    }

    :param destination: dict that contains lat and lng data.
    :return: list that contains dict of parking info
    """
    parkings = gmaps.places_nearby(destination, rank_by="distance", type="parking")

    return [{
        'location': parking['geometry']['location'],
        'image': gmaps.streetview(parking['geometry']['location'], size="800x600"),
        'name': parking['name']
    } for parking in parkings['results']]
