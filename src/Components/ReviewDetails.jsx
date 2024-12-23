import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData();
  const { user } = useContext(AuthContext);
  const [addedToWatchList, setAddedToWatchList] = useState(false);
  const { _id, title, description, coverImage, genre, rating, year } = review;

  useEffect(() => {
    if (!user) return;

    fetch(`https://chill-gamer-server-side-jet.vercel.app/watch-list?userEmail=${user.email}`)
      .then((response) => response.json())
      .then((watchList) => {
        const isAlreadyAdded = watchList.some((item) => item.reviewId === _id);
        setAddedToWatchList(isAlreadyAdded);
      })
      .catch((error) => console.error("Error fetching watch-list:", error));
  }, []);

  const handleAddToWatchList = () => {
    if (!user) {
      alert("Please log in to add to your watch-list!");
      return;
    }

    const watchListData = {
      reviewId: _id,
      title,
      coverImage,
      genre,
      rating,
      year,
      description,
      userEmail: user.email,
      username: user.username,
    };

    fetch("https://chill-gamer-server-side-jet.vercel.app/watch-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchListData),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Added to WatchList",
          });
          setAddedToWatchList(true);
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to add to WatchList");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="md:my-12 py-8">
      <h2 className="text-center text-3xl lg:text-4xl font-bold pb-4">Review Details</h2>
      <div className="w-11/12 mx-auto  lg:flex lg:justify-center lg:items-start my-12 gap-3">
        <figure className="md:px-6 md:py-6 lg:pt-6 min-w-[390px] h-[500px] lg:min-w-[730px] lg:h-[600px] bg-primary rounded-2xl">
          <img
            src={coverImage}
            className="rounded-xl w-full h-full object-cover object-center"
            alt={title}
          />
        </figure>
        <div className="flex flex-col gap-2 pt-6 pl-7">
          <h2 className="card-title text-xl md:text-3xl mb-3">{title}</h2>
          <p className="text-lg lg:text-xl text-gray-800">Genre: {genre}</p>
          <p className="text-lg lg:text-xl text-gray-800">Published: {year}</p>
          <p className="text-lg lg:text-xl text-gray-800">Rating: {rating}</p>
          <p className="text-lg lg:text-xl my-2 text-gray-800">Review: {description}</p>
          <div className="card-actions">
            <button
              className={`btn bg-primary text-white dark:bg-gray-700 dark:text-gray-200 ${addedToWatchList ? "disabled" : ""}`}
              onClick={handleAddToWatchList}
              disabled={addedToWatchList}
            >
              {addedToWatchList ? "Added to WatchList" : "Add to WatchList"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
