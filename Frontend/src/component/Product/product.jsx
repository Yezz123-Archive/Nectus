import React, { useContext, useState, useEffect, useCallback } from "react";
import { Table, Container, Button } from "reactstrap";
import { AuthContext } from "../../App";
import axios from "axios";
import { Redirect, Link, NavLink } from "react-router-dom";

const api = process.env.REACT_APP_URL_API + "/products";
function Product() {
    const [product, setProduct] = useState([]);
    const { state } = useContext(AuthContext);
    const fetchData = useCallback(() => {
            var config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + state.token,
                },
            };
            axios.get(api, config).then(response => {
                setProduct(response.data);
            });
        },
        [state.token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const DeleteProduct = (id) => {
        var config = {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + state.token,
            },
        };

        axios
            .delete(api + `/` + id, config)
            .then((res) => {
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!state.isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <div>
            <Container>
                <h2>Product List</h2>
                <NavLink to="/Product/add">
                    <Button className="success">Add Data</Button>
                </NavLink>
                <br />
                <Table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product) => (
                            <tr key={product.id}>
                                <td>{product.product_name}</td>
                                <td>{product.product_price}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/product/edit",
                                            state: {
                                                id: product.id,
                                                product_name:
                                                    product.product_name,
                                                product_price:
                                                    product.product_price,
                                            },
                                        }}
                                    >
                                        <Button>Edit</Button>
                                    </Link>
                                    <span></span>
                                    <Button
                                        color="danger"
                                        onClick={() =>
                                            DeleteProduct(product.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Product;
