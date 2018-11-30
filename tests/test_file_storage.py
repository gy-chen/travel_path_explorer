import os
import hashlib
from travel_path_explorer.web.file_storage import file_storage


def test_init(app):
    assert app.extensions['file_storage']
    assert os.path.isdir(file_storage.storage_path)


def test_put(app):
    expect_content = b'DemoContent'
    md5 = hashlib.md5()
    md5.update(expect_content)
    expect_name = md5.hexdigest()
    expect_path = os.path.join(file_storage.storage_path, expect_name)
    assert not os.path.exists(expect_path)
    name = file_storage.put(expect_content)
    assert os.path.isfile(expect_path)
    assert expect_name == name
    with open(expect_path, 'rb') as f:
        assert expect_content == f.read()


def test_get(client):
    expect_content = b'DemoContent'
    name = file_storage.put(expect_content)
    response = client.get('/files/{}'.format(name))
    assert expect_content == response.data
