import pytest
import pickle
from travel_path_explorer.web import create_app


@pytest.fixture
def app(tmpdir):
    app = create_app({
        'TESTING': True,
        'FILE_STORAGE_PATH': tmpdir
    })
    with app.app_context():
        yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def route_sample_data():
    with open('./data/route_sample.pickle', 'rb') as f:
        return pickle.load(f)
