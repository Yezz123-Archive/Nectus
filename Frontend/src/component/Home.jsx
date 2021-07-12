import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Hello World 👋</h1>
                <p className="lead">
                    Nectus is a Boilerplate created by Yezz123
                </p>
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
        </div>
    );
}

export default Home;
