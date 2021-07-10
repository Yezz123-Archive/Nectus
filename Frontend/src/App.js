import React, { useReducer, createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Menu from "./component/Menu";
import Product from "./component/Product/product";
import add from "./component/Product/Add";
import Edit from "./component/Product/Edit";
import SuperAdmin from "./component/Auth/SuperAdmin";

//context
export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.data.username)
            );
            localStorage.setItem(
                "token",
                JSON.stringify(action.payload.access_token)
            );
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.data.username,
                token: action.payload.access_token,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <BrowserRouter>
            <Switch>
                <AuthContext.Provider
                    value={{
                        state,
                        dispatch,
                    }}
                >
                    <Menu />
                    <Route exact path="/" component={Home} />{" "}
                    <Route exact path="/dashboard" component={Dashboard} />{" "}
                    <Route exact path="/login" component={Login} />{" "}
                    <Route exact path="/product" component={Product} />{" "}
                    <Route exact path="/product/edit" component={Edit} />{" "}
                    <Route exact path="/product/add" component={add} />{" "}
                    <Route exact path="/super-admin" component={SuperAdmin} />
                </AuthContext.Provider>{" "}
            </Switch>{" "}
        </BrowserRouter>
    );
}

export default App;
