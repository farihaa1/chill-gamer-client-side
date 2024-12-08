import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProviders";

export const DbContext = createContext();

const DbProviders = ({ children }) => {
  const [review, setReview] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    if (review.length === 0) {
      fetch("https://chill-gamer-server-side-jet.vercel.app/review")
        .then((response) => response.json())
        .then((data) => setReview(data))
        .catch((error) => console.error("Failed to fetch reviews", error));
    }
  }, [review, setReview]);
  const dbInfo = {

 
    review,
    setReview,
  };

  return (
    <DbContext.Provider value={dbInfo}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-ring text-blue-800 w-44 h-34"></span>
        </div>
      ) : (
        children
      )}
    </DbContext.Provider>
  );
};

export default DbProviders;
