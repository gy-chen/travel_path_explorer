"""CLI that generate route data as JSON file

Search route from origin to destination, and save the result as file in JSON format.

parameters:
  - origin: default Taichung Traing Station
  - destination: default Taichung Park
  - f: default sample.json
"""
import argparse
import base64
import json
from itertools import chain
from travel_path_explorer.explore import find_route

parser = argparse.ArgumentParser(
    description="search route from origin to destination, and save the result as file in JSON format.")
parser.add_argument('--origin', type=str, dest='origin',
                    default='Taichung Train Station')
parser.add_argument('--destination', type=str,
                    dest='destination', default='Taichung Park')
parser.add_argument('--f', type=str, dest='f', default='sample.json')


def main():
    args = parser.parse_args()

    route = find_route(args.origin, args.destination)
    convert_route_images_to_base64(route)

    with open(args.f, 'w') as f:
        json.dump(route, f)
    print("[*] done saved route data in {}".format(args.f))


def convert_route_images_to_base64(route):
    """Convert every images in route to base64 string.

    By default, find route will use bytes to stored image. Convert it to base64 
    to let route be able is saved in JSON format.
    """
    for img_container in chain(route['steps'], route['parkings']):
        img_container['image'] = base64.b64encode(
            img_container['image']).decode()


if __name__ == '__main__':
    main()
