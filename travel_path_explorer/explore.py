try:
    from .gmaps import gmaps
    from .helper import calculate_heading
    from .exception import NotFoundError, ApiError
except ModuleNotFoundError:
    from gmaps import gmaps
    from helper import calculate_heading
    from exception import NotFoundError, ApiError


def _default_extract_image(c): return c


def find_route(origin, destination, extract_image=None):
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
    :params find_steps_function: function for custom how to find steps, the function must accept
        arguments origin and destinaion.
    :return: dict
    """
    steps = find_steps(origin, destination, extract_image=extract_image)
    parkings = find_parkings(
        steps[-1]['location'], extract_image=extract_image)

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
        raise NotFoundError()
    directions_result = directions_result[0]
    overview = {
        'polyline': directions_result['overview_polyline']
    }
    return overview


def find_steps(origin, destination, extract_image=None):
    """Find steps of the route from the origin to the destination

    steps: list of step info
        - html_instructions
        - distance
        - location
        - image

    :param origin:
    :param destination:
    :param find_image_function: function that can custom how to find image.
        the function must accepct argument step.
    :return: list
    """
    try:
        directions_result = gmaps.directions(origin, destination)
        if not directions_result:
            raise NotFoundError()
    except ApiError as e:
        if e.status == "NOT_FOUND":
            raise NotFoundError()
        raise e
    directions_result = directions_result[0]
    steps = [{
        "html_instructions": step["html_instructions"],
        "distance": step["distance"]["text"],
        "location": step.get("start_location", step.get("end_location")),
        "image": find_image(step, extract_image=extract_image)
    } for step in directions_result['legs'][0]['steps']]
    return steps


def find_image(step, extract_image=None):
    extract_image = _default_extract_image if extract_image is None else extract_image
    origin, destination = step.get("start_location"), step.get("end_location")
    if not origin or not destination:
        return None
    heading = calculate_heading(origin, destination)
    return extract_image(gmaps.streetview(destination, size="800x600", heading=heading, fov=120))


def find_parkings(destination, extract_image=None):
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
    extract_image = _default_extract_image if extract_image is None else extract_image
    parkings = gmaps.places_nearby(
        destination, rank_by="distance", type="parking")

    return [{
        'location': parking['geometry']['location'],
        'image': extract_image(gmaps.streetview(parking['geometry']['location'], size="800x600")),
        'name': parking['name']
    } for parking in parkings['results']]
