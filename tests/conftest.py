import pytest
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
