from decouple import config

from app import app

app = app()

HOST = config("HOST")
PORT = config("PORT")

if __name__ == "__main__":
    """
    This is the main entry point for the program
    """
    app.run(host=HOST, port=PORT)
