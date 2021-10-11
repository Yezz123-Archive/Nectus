![NECTUS](.github/header.svg)

# Nectus :rocket:

Flask Boilerplate to quickly get started with production grade flask application with some additional packages and configuration prebuilt.

## Getting Started

### Prerequisites

- Python 3.6 or higher
- PostgreSQL
- Docker(optional)

### Project setup

```sh
# clone the repo
$ git clone https://github.com/yezz123/Nectus.git

# move to the project folder
$ cd Nectus
```

### Creating virtual environment 📦

- Using [virtualenv](https://virtualenv.pypa.io/en/latest/) 📦
- Create a `virtual environment` for this project 📦

```shell
# creating virtual environment
$ virtualenv venv

# activating the virtual environment
$ source venv/bin/activate

# installing dependencies
$ pip install -r requirements.txt
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

- If you feel that everything can be run, then run the Flask API

```sh
flask run
```

### Running the Application in Docker 🐳

- We have the Dockerfile created in above section. Now, we will use the Dockerfile to create the image of the Flask app and then start the application container.
- I provide a simplified way by Using a Pre-configured `Makefile` just write in your CLI `make help` and use the commands.

__Note:__ About the preconfigured `.env.sample`, i use it to pass all checks relate to Github Actions, you could check both the [Docker-compose.yml](docker-compose.yml) and [Build.yml](.github/workflows/build.yml).

## Preconfigured Packages

Includes preconfigured packages to kick start flask app by just setting appropriate configuration.

| Package                                                  | Usage                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [flask-cors](https://flask-cors.readthedocs.io/)         | Configuring CORS                                                               |
| [PyJWT](https://pyjwt.readthedocs.io/en/stable/)         | Python library which allows you to encode and decode JSON Web Tokens (JWT).    |

## License 📝

This project is licensed under the terms of the [MIT license](LICENSE).
