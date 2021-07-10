import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    CardImg,
} from "reactstrap";
import { Link } from "react-router-dom";

const api = process.env.REACT_APP_URL_API + "/login";
function Login(props) {
    const { dispatch } = useContext(AuthContext);

    const intializeState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
    };

    const [data, setData] = useState(intializeState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null,
        });

        let formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };

        axios
            .post(api, formData, config)
            .then((response) => {
                // eslint-disable-next-line eqeqeq
                if (response.status == 200) {
                    dispatch({
                        type: "LOGIN",
                        payload: response.data,
                    });

                    props.history.push("/dashboard");
                } else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: response.data.msg,
                    });
                }
            })
            .catch((error) => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage:
                        "Warning! Please input username/password correct!!",
                });
            });
    };

    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg
                            width="100"
                            src="https://placeimg.com/640/480/people"
                        />
                    </Col>
                    <Col>
                        <h1>Login Form</h1>
                        <hr />
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="with a placeholder"
                                    value={data.email}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="password placeholder"
                                    value={data.password}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            {data.errorMessage && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {data.errorMessage}
                                </div>
                            )}

                            <Button disabled={data.isSubmitting}>
                                {data.isSubmitting ? "...Loading" : "Login"}
                            </Button>
                        </Form>
                        <p>
                            Don't have an account yet?{" "}
                            <Link to="/super-admin">Register</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Login;
