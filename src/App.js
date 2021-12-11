import { Route, BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/Navigation/NavigationBar";
import Chat from "./views/Chat/Chat";
import { useSelector } from "react-redux";
import BottomNav from "./components/Navigation/BottomNav";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "./components/Layout/Layout";
import routes from "./views/routes";

function App() {
    const { isLogged } = useSelector((s) => s.user);
    const [showChat, setShowChat] = useState(false);
    const isMobile = useMediaQuery("(max-width:640px)");

    return (
        <Layout>
            <Router>
                <NavigationBar />

                {routes.map((views) => (
                    <Route
                        path={views.path}
                        exact
                        render={(routerProps) => (
                            <views.view {...routerProps} />
                        )}
                    />
                ))}

                {isMobile && isLogged && (
                    <BottomNav setShowChat={setShowChat} showChat={showChat} />
                )}
            </Router>

            {isLogged && <Chat setShowChat={setShowChat} showChat={showChat} />}
        </Layout>
    );
}

export default App;
