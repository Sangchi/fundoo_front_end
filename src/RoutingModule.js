import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Notes from "./Dashboard/Note";
import Archive from "./Dashboard/Archive";
import Trash from "./Dashboard/Trash";
import ProtectedRoute from "./Dashboard/ProtectedRoute";


function RoutingModule() {
    const AppRoutes = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/",
            element: <Login />,
        },
    
        {
            path: "/dashboard",

            element: <ProtectedRoute  Component={<Dashboard/>}/>,
            children: [
                { path: "", element: <Notes /> },
                { path: "archive", element: <Archive /> },
                { path: "trash", element: <Trash /> },
            ],
        },
    ]);

    return <RouterProvider router={AppRoutes} />;
}

export default RoutingModule;
