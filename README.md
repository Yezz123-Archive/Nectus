![NECTUS](.vscode/header.svg)

# Nectus :rocket:

Flask Boilerplate to quickly get started with production grade flask application with some additional packages and configuration prebuilt.

## Getting Started

### Prerequisites

- Python 3.9.2 or higher
- PostgreSQL
- Docker

### Project setup

```sh
# clone the repo
$ git clone https://github.com/yezz123/Nectus.git

# move to the project folder
$ cd Nectus
```

### Creating virtual environment

- Install `pipenv` a global python project `pip install pipenv`
- Create a `virtual environment` for this project

```shell
# creating pipenv environment for python 3
$ pipenv --three

# activating the pipenv environment
$ pipenv shell

# if you have multiple python 3 versions installed then
$ pipenv install -d --python 3.8

# install all dependencies (include -d for installing dev dependencies)
$ pipenv install -d
```

### Configuration

- Create a `.env` file from `.env.sample` and set appropriate environment variables before running the project

```sh
APP_NAME=Nectus

DB_HOST= # Host ex. localhost
DB_DATABASE= # Database
DB_USERNAME= # Username ex. Root
DB_PASSWORD= # Password

JWT_SECRET= # generate a JWT Secret
UPLOAD_FOLDER = public

FLASK_APP=main.py
FLASK_ENV=development
```

### Database Migration

- Make sure the database name username, password and host have been set in the env

- Migrate and upgrade database into your database management (for this case postgreeSQL)

```sh
flask db init

flask db migrate -m "create new table"

flask db upgrade
```

### Running app

- If you feel that everything can be run, then run the Flash API

```sh
flask run
```

## Running the Docker Container

- We have the Dockerfile created in above section. Now, we will use the Dockerfile to create the image of the flask app and then start the flask app container.

```sh
docker build
```

- list all the docker images and you can also see the image `nectus:latest` in the list.

```sh
docker images
```

- run the application at port 5000. The various options used are:

> - `-p`: publish the container's port to the host port.
> - `-d`: run the container in the background.
> - `-i`: run the container in interactive mode.
> - `-t`: to allocate pseudo-TTY.
> - `--name`: name of the container

```sh
docker container run -p 5000:5000 -dit --name Nectus nectus:latest
```

- Check the status of the docker container

```sh
docker container ps
```

## Preconfigured Packages

Includes preconfigured packages to kick start flask app by just setting appropriate configuration.

| Package                                                  | Usage                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [flask-cors](https://flask-cors.readthedocs.io/)         | Configuring CORS                                                               |
| [python-dotenv](https://pypi.org/project/python-dotenv/) | Reads the key-value pair from .env file and adds them to environment variable. |
| [PyJWT](https://pyjwt.readthedocs.io/en/stable/)         | Python library which allows you to encode and decode JSON Web Tokens (JWT).    |

`yapf` packages for `linting and formatting`

## License

This program is free software under MIT license. Please see the [LICENSE](LICENSE) file in our repository for the full text.
