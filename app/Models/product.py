from app import db


class Products(db.Model):
    """
    Product Model

    Args:
        db (SQLAlchemy): SQLAlchemy object

    Returns:
        Product object
    """

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(50), nullable=False)
    product_price = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        """
        String representation of Product object

        Returns:
            String representation of Product object
        """
        return "<Products {}>".format(self.name)
