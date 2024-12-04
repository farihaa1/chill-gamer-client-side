import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";

const AddReviewPage = () => {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState({
    coverImage: "",
    title: "",
    description: "",
    rating: "",
    year: "",
    genre: "",
  });
  const navigate = useNavigate();

  const genres = ["Action", "RPG", "Adventure", "Puzzle", "Shooter"]; // Add more genres as needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      ...review,
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted",
          text: "Your review has been added successfully!",
        });
        setReview({
          coverImage: "",
          title: "",
          description: "",
          rating: "",
          year: "",
          genre: "",
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
    <div className=" max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add New Game Review
      </h2>
      <p className="text-base text-gray-600 dark:text-base-300 mb-6 text-center px-3">
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
            value={review.coverImage}
            onChange={handleChange}
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
            value={review.title}
            onChange={handleChange}
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
            value={review.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="rating">
            Rating (1-100)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            required
            min="1"
            max="10"
            className="w-full px-3 py-2 dark:text-gray-500 border rounded input input-bordered"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="year">
            Publishing Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={review.year}
            onChange={handleChange}
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
            value={review.genre}
            onChange={handleChange}
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
