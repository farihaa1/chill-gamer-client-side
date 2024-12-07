import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Footer from "./Footer";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData();
  const {user} = useContext(AuthContext)
  const [addedToWatchList, setAddedToWatchList] = useState(false);
  const {_id, title, description, coverImage, genre, rating, year} = review
  const handleAddToWatchList = async () => {
    if (!user) {
      alert("Please log in to add to your watchlist!");
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
    try {
      const response = await fetch("http://localhost:5000/watchList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchListData),
      });
      if (response.ok) {
        console.log('added')
        Swal.fire({
          icon: "success",
          title: "Added to WatchList",
          
        });
        setAddedToWatchList(true);
      } else {
        throw new Error("Failed to add in watchList");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }

  }

  return (
    <div>
      
        <div className="w-11/12 mx-auto min-h-screen lg:flex lg:justify-center lg:items-start my-12">
          <figure className="px-6 pt-6 min-w-[490px] h-[500px] bg-primary rounded-2xl">
            <img
              src={coverImage}
              className="rounded-xl w-full h-full -mb-12 object-cover object-center"
            />
          </figure>
          <div className="flex flex-col gap-2 pt-6 pl-7 ">
            <h2 className="card-title text-xl md:text-3xl mb-3">{title}</h2>
            <p className="text-lg lg:text-xl">Genre: {genre}</p>
            <p className="text-lg lg:text-xl">Published: {year}</p>
            <p className="text-lg lg:text-xl">Rating: {rating}</p>
            <p className="text-lg lg:text-xl my-2">{description}</p>
            <div className="card-actions">
            <button
              className={`btn btn-primary ${addedToWatchList ? "disabled" : ""}`}
              onClick={handleAddToWatchList}
              disabled={addedToWatchList}
            >
              {addedToWatchList ? "Added to Watchlist" : "Add to Watchlist"}
            </button>
            </div>
          </div>
        </div>
        <footer>
          <Footer></Footer>
        </footer>
     
    </div>
  );
};

export default ReviewDetails
