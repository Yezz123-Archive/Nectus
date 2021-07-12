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
function Edit(props) {
    const { state } = useContext(AuthContext);

    const intializeState = {
        id: props.location.state.id,
        product_name: props.location.state.product_name,
        product_price: props.location.state.product_price,
        errorMessage: null,
        display: "none",
    };
    const [data, setData] = useState(intializeState);

    const ChangeProduct = (id) => {
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
            .put(api + `/` + id, formData, config)
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
                <h4> Edit Data </h4>
                <Alert color="success" style={{ display: data.display }}>
                    {data.errorMessage}
                </Alert>
                <Form className="form">
                    <Col>
                        <Label>Product Name</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        value={data.product_name}
                                        name="product_name"
                                        onChange={handleInputChange}
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
                                        name="product_price"
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Button
                                        type="button"
                                        onClick={() => ChangeProduct(data.id)}
                                    >
                                        change
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

export default Edit;
