from app import db


class Products(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(50), nullable=False)
    product_price = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Products {}>'.format(self.name)