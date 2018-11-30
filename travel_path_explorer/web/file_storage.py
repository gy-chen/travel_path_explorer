import os
import hashlib
from flask import current_app, Blueprint, send_from_directory
from werkzeug.local import LocalProxy


def get_file_storage():
    return current_app.extensions['file_storage']


file_storage = LocalProxy(get_file_storage)

file_storage_bg = Blueprint('file_storage', __name__)


@file_storage_bg.route('/<name>')
def get(name):
    return send_from_directory(file_storage.storage_path, name)


class FileStorage:
    """store files in local file system

    support configurations:
      - FILE_STORAGE_PATH: absolute or relative path to where to store files.
        if path is relative, it will be relataive to app.instance_path

    """

    def __init__(self, app=None):
        self._app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        app.config.setdefault('FILE_STORAGE_PATH', '')
        app.extensions['file_storage'] = self
        os.makedirs(self._build_storage_path(app), exist_ok=True)

    @property
    def storage_path(self):
        return self._build_storage_path(current_app)

    def _build_storage_path(self, app):
        return os.path.join(app.instance_path, app.config['FILE_STORAGE_PATH'])

    def put(self, content, name=None):
        if name is None:
            md5 = hashlib.md5()
            md5.update(content)
            name = md5.hexdigest()
        path = os.path.join(self.storage_path, name)
        with open(path, 'wb') as f:
            current_app.logger.info('write to {}'.format(path))
            f.write(content)
        return name
