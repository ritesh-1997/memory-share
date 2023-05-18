/**
 *
 *
 */
import React from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter,
  Routes,
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Contact from "./components/Contacts/Contact";
//import Login from "./components/Google/Login";
// import Logout from "./components/Google/Logout";

import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId =
  "671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com";

const routes = [
  <Navbar key="navbar" element={<Navbar />} />,
  <Route key="home" path="/" element={<Home />} />,
  <Route key="Auth" path="/auth" element={<Auth />} />,
  <Route key="Contact" path="/contact" element={<Contact />} />,
];
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
// const routers = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/auth",
//         element: <Auth />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
