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
import MyReviews from "./Pages/MyReviews.jsx";
import DbProviders from "./providers/DbProviders.jsx";
import UpdateReview from "./Components/UpdateReview.jsx";

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
        path: "/watch-list",
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
        path: "/update-profile/:id",
        element: <UpdateProfile></UpdateProfile> ,
        loader: ({params})=> fetch(`http://localhost:5000/users/${params.id}`),
      },
      
      {
        path: "/my-reviews",
        element: <MyReviews></MyReviews>,
        },
      {
        path: "/update-Review/:id",
        element: <UpdateReview></UpdateReview>,
        loader: ({params})=> fetch(`http://localhost:5000/review/${params.id}`)
        },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <DbProviders>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
      </DbProviders>
    </AuthProviders>
  </StrictMode>
);
