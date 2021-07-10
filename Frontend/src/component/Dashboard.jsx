import React, { useContext } from "react";
import { Jumbotron, Button } from "reactstrap";
import { AuthContext } from "../App";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
    // eslint-disable-next-line no-unused-vars
    const { state, dispatch } = useContext(AuthContext);
    console.log(state);
    if (!state.isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Jumbotron>
            <h1 className="display-3">Hi {state.user}</h1>
            <p className="lead">Nectus is a Boilerplate created by Yezz123</p>
            <hr className="my-2" />
            <p>Yes Help Me and Use My Boilerplate UwU, Support me Also!</p>
            <p className="lead">
                <Link
                    to={{ pathname: "https://blog.yezz.me/" }}
                    target="_blank"
                >
                    <Button color="primary">Learn More</Button>
                </Link>
            </p>
        </Jumbotron>
    );
}

export default Dashboard;
