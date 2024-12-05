import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import MainLayout from "./MainLayout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import UpdateProfile from "./Components/UpdateProfile.jsx";
import AllReviewsPage from "./Pages/AllReviewsPage.jsx";
import AddReviewPage from "./Pages/AddReviewPage.jsx";
import GameWatchListPage from "./Pages/GameWatchListPage.jsx";
import { ThemeProvider } from "./providers/ThemeContext.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import ReviewDetails from "./Components/ReviewDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/all-review",
        element: <AllReviewsPage></AllReviewsPage>,
        loader: ()=>fetch('http://localhost:5000/review'),
      },
      {
        path: "/add-review",
        element: <AddReviewPage></AddReviewPage>,
      },
      {
        path: "/wish-list",
        element: <GameWatchListPage></GameWatchListPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile></UpdateProfile> ,
      },
      {
        path: "/review-details/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: ({params})=>fetch(`http://localhost:5000/review/${params.id}`)
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProviders>
  </StrictMode>
);
