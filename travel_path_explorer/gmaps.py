import functools
import os
import googlemaps
import dotenv
from googlemaps import convert, client

dotenv.load_dotenv(dotenv.find_dotenv())

gmaps = googlemaps.Client(key=os.getenv("GMAPS_API_KEY"))
gmaps.directions = functools.lru_cache(maxsize=1)(gmaps.directions)


def streetview(client, location, size, heading=None, fov=None):
    params = {
        "location": convert.latlng(location),
        "size": size
    }

    if heading:
        params["heading"] = heading

    if fov:
        params["fov"] = fov

    def extract_body(response):
        if response.status_code != 200:
            raise googlemaps.exceptions.HTTPError(response.status_code)
        return response.content

    return client._request("/maps/api/streetview", params, extract_body=extract_body)


googlemaps.Client.streetview = client.make_api_method(streetview)
