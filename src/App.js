import { Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./views/Home/Home";
import NavigationBar from "./components/Navigation/NavigationBar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Booking from "./views/Booking/Booking";
import Dashboard from "./views/Dashboard/Dashboard";
import CompleteRegistration from "./views/CompleteRegistration/CompleteRegistration";
import Chat from "./views/Chat/Chat";
import { useSelector } from "react-redux";
import BottomNav from "./components/Navigation/BottomNav";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "./components/Layout/Layout";

function App() {
    const { isLogged } = useSelector((s) => s.user);
    const [showChat, setShowChat] = useState(false);
    const isMobile = useMediaQuery("(max-width:640px)");

    return (
        <Layout>
            <Router>
                <NavigationBar />
                <Route
                    path="/"
                    exact
                    render={(routerProps) => <Home {...routerProps} />}
                ></Route>
                <Route
                    path="/dashboard"
                    exact
                    render={(routerProps) => <Dashboard {...routerProps} />}
                ></Route>
                <Route
                    path="/register"
                    exact
                    render={(routerProps) => <Register {...routerProps} />}
                ></Route>
                <Route
                    path="/login"
                    exact
                    render={(routerProps) => <Login {...routerProps} />}
                ></Route>
                <Route
                    path="/registrationOAuth"
                    exact
                    render={(routerProps) => (
                        <CompleteRegistration {...routerProps} />
                    )}
                ></Route>
                <Route
                    path="/booking"
                    exact
                    render={(routerProps) => <Booking {...routerProps} />}
                ></Route>

                {isMobile && isLogged && (
                    <BottomNav setShowChat={setShowChat} showChat={showChat} />
                )}
            </Router>

            {isLogged && <Chat setShowChat={setShowChat} showChat={showChat} />}
        </Layout>
    );
}

export default App;
