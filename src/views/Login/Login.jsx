import React from "react";
import { Row } from "react-bootstrap";
import Welcome from "../../components/Register/Welcome/Welcome";
import { ReactComponent as LoginIMG } from "../../assets/loginImg.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Credentials from "../../components/Credentials/Credentials";
import { CSSTransition } from "react-transition-group";
import lib from "../../lib";

const {
    animationConfig: { fadeTopBottomTimer },
} = lib;

function Login({ history }) {
    const [viewController, setViewController] = useState({
        welcome: true,
        steps: false,
    });

    const { welcome, steps } = viewController;
    const isLogged = useSelector((s) => s.user.isLogged);

    useEffect(() => {
        if (isLogged) {
            history.push("/dashboard");
        } else {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Row className="box-shadow my-5 overflow-hidden">
            <CSSTransition
                in={welcome}
                timeout={fadeTopBottomTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <Welcome
                    action="Login"
                    title="How can we help you today?"
                    subLabel="Continue with e-mail"
                    option="Doesn't have an account? Go to "
                    redirect="Register"
                    url="/register"
                    setViewController={setViewController}
                    viewController={viewController}
                    gBtnText="Continue with Google"
                />
            </CSSTransition>

            <CSSTransition
                in={steps}
                timeout={fadeTopBottomTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <Credentials
                    title="Welcome back"
                    history={history}
                    setViewController={setViewController}
                />
            </CSSTransition>

            <CSSTransition
                in={welcome || steps}
                timeout={fadeTopBottomTimer}
                classNames="fade-Top-Bottom"
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
            >
                <div
                    className={
                        "d-none d-md-flex col-6 flex-column flex-center-center"
                    }
                >
                    <LoginIMG />
                </div>
            </CSSTransition>
        </Row>
    );
}

export default Login;
