import Articles from "../views/Articles/Articles";
import Login from "../views/comptes/Login";
import Register from "../views/comptes/Register";

const Routescomponent = [
    { path: "/", exact: true, name: "Home", element: Login },
    { path: "/register", exact: true, name: "Home", element: Register },
    { path: "/article", exact: true, name: "Home", element: Articles },
]

export default Routescomponent;