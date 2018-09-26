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
from travel_path_explorer.helper import convert_route_images_to_base64

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


if __name__ == '__main__':
    main()
