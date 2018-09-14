import setuptools

with open('requirements.txt', 'r') as f:
    install_requires = [require.strip() for require in f.readlines()]

setuptools.setup(
    name="travel_path_explorer",
    version="0.0.1",
    author="GYCHEN",
    author_email="gy.chen@gms.nutc.edu.tw",
    packages=setuptools.find_packages(),
    install_requires=install_requires
)
