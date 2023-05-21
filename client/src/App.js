/**
 *
 *
 */
import React from "react";
import {
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Contact from "./components/Contacts/Contact";
import PostDetails from "./components/PostDetails/PostDetails";

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
const user = JSON.parse(localStorage.getItem("profile"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/posts" replace={true} />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/posts" />}
        />
      </Route>
    </>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
