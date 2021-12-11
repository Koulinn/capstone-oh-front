import Booking from "./Booking/Booking";
import CompleteRegistration from "./CompleteRegistration/CompleteRegistration";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";

const routes = [
    {
        path: "/",
        view: Home,
    },
    {
        path: "/dashboard",
        view: Dashboard,
    },
    {
        path: "/register",
        view: Register,
    },
    {
        path: "/login",
        view: Login,
    },
    {
        path: "/registrationOAuth",
        view: CompleteRegistration,
    },
    {
        path: "/booking",
        view: Booking,
    },
];

export default routes;
