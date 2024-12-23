import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";
import { DbContext } from "../providers/DbProviders";

const AddReviewPage = () => {
  const { user } = useContext(AuthContext);
  const { review, setReview } = useContext(DbContext);

  const navigate = useNavigate();

  const genres = ["Action", "RPG", "Adventure", "Puzzle", "Shooter"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const coverImage = form.coverImage.value;
    const title = form.title.value;
    const description = form.description.value;
    const rating = parseInt(form.rating.value);
    const year = parseInt(form.year.value);
    const genre = form.genre.value;

    if (rating < 1 || rating > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Rating must be between 1 and 10.",
      });
      return;
    }
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      Swal.fire({
        icon: "error",
        title: "Invalid Year",
        text: `Year must be between 1900 and ${currentYear}.`,
      });
      return;
    }

    const reviewData = {
      coverImage,
      title,
      description,
      rating,
      year,
      genre,
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const response = await fetch("https://chill-gamer-server-side-jet.vercel.app/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const newReview = await response.json();

        setReview([...review, newReview]);

        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Your review has been added successfully!",
        });

        navigate("/all-review");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className=" max-w-2xl md:max-w-3xl  mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add New Game Review
      </h2>
      <p className="text-base text-gray-600 max-w-xl mx-auto dark:text-base-300 mb-6 text-center px-3">
        Share your thoughts about your favorite games! Fill out the form below
        to provide details like the game title, your review, rating, and more.
        Your input helps others discover great games.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow">
        <div>
          <label className="block font-medium mb-1" htmlFor="coverImage">
            Game Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            required
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Game Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border rounded input input-bordered dark:text-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="description">
            Review Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="5"
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1" >
            Rating (1-10)
          </label>
          <input
            type="text"
            id="rating"
            name="rating"
            required
            min="1"
            max="10"
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Publishing Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            required
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-3 pr-2 py-2 border rounded input input-bordered mr-10 dark:text-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="genre">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            required
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          >
            <option value="">Select a genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            User Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            User Name
          </label>
          <input
            type="text"
            id="name"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg w-full font-bold"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewPage;
