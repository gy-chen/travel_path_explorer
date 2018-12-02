import pytest
from itertools import chain
from travel_path_explorer import explore, exception


def test_route_exceptions():
    with pytest.raises(exception.NotFoundError):
        explore.find_route('UnknownOrigin', 'UnknownDestination')

    with pytest.raises(exception.NotFoundError):
        explore.find_route('Taiwan Strait', 'Pacific')


def test_route_result(route_sample_data):
    route = explore.find_route('TaichungTrainStation', 'TaichungPark')
    assert route_sample_data == route


def test_route_extract_image(route_sample_data):

    def extract_image(c):
        return hash(c)

    route = explore.find_route(
        'TaichungTrainStation', 'TaichungPark', extract_image)

    def get_image(d):
        return d['image']

    for img, img_hash in chain(
        zip(map(get_image, route_sample_data['steps']), map(
            get_image, route['steps'])),
        zip(map(get_image, route_sample_data['parkings']), map(
            get_image, route['parkings'])),
    ):
        assert hash(img) == img_hash


def test_route_parkings_max_results(route_sample_data):
    route = explore.find_route(
        'TaichungTrainStation', 'TaichungPark', parkings_max_results=5)
    assert len(route['parkings']) <= 5
    for p1, p2 in zip(route, route_sample_data):
        assert p1 == p2