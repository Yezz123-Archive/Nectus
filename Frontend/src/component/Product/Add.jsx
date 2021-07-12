import React, { useContext, useState } from "react";
import {
    Container,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
} from "reactstrap";
import { AuthContext } from "../../App";
import axios from "axios";
import { Redirect } from "react-router-dom";

const api = process.env.REACT_APP_URL_API + "/products";
function add(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state } = useContext(AuthContext);

    const intializeState = {
        product_name: "",
        product_price: "",
        errorMessage: null,
        display: "none",
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(intializeState);

    const addProduct = () => {
        var config = {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + state.token,
            },
        };

        let formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("product_price", data.product_price);

        axios
            .post(api, formData, config)
            .then((res) => {
                setData({
                    ...data,
                    display: "block",
                    errorMessage: res.data.msg,
                });
                setTimeout(() => {
                    props.history.push("/product");
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    if (!state.isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <div>
            <Container>
                <h4> Add Data </h4>
                <Alert color="success" style={{ display: data.display }}>
                    {data.errorMessage}
                </Alert>
                <Form className="form">
                    <Col>
                        <Label>Nama Product</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        value={data.product_name}
                                        onChange={handleInputChange}
                                        name="product_name"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Product Price</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="number"
                                        value={data.product_price}
                                        onChange={handleInputChange}
                                        name="product_price"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Button
                                        type="button"
                                        onClick={() => addProduct()}
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        </div>
    );
}

export default add;
