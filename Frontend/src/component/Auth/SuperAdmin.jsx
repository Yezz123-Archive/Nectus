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
// eslint-disable-next-line no-unused-vars
import { Redirect } from "react-router-dom";

const api = process.env.REACT_APP_URL_API + "/save-super-admin";
function SuperAdmin(props) {
    // eslint-disable-next-line no-unused-vars
    const { state } = useContext(AuthContext);

    const intializeState = {
        full_name: "",
        username: "",
        email: "",
        password: "",
        errorMessage: null,
        display: "none",
    };
    const [data, setData] = useState(intializeState);

    const tambahSuperAdmin = () => {
        var config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };

        let formData = new FormData();
        formData.append("full_name", data.full_name);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        axios
            .post(api, formData, config)
            .then((res) => {
                setData({
                    ...data,
                    display: "block",
                    errorMessage: res.data.msg,
                });
                setTimeout(() => {
                    props.history.push("/login");
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

    return (
        <div>
            <Container>
                <h4> Tambah Super Admin </h4>
                <Alert color="success" style={{ display: data.display }}>
                    {data.errorMessage}
                </Alert>
                <Form className="form">
                    <Col>
                        <Label>Full Name</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        value={data.full_name}
                                        onChange={handleInputChange}
                                        name="full_name"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Username</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        value={data.username}
                                        onChange={handleInputChange}
                                        name="username"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Email</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        name="email"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <Label>Passowrd</Label>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input
                                        type="password"
                                        value={data.password}
                                        onChange={handleInputChange}
                                        name="password"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <FormGroup>
                            <Row>
                                <Col>
                                    <Button
                                        type="button"
                                        onClick={() => tambahSuperAdmin()}
                                    >
                                        Simpan
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

export default SuperAdmin;
