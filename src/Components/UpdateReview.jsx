import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProviders';

const UpdateReview = () => {
    const upReview = useLoaderData();

    const {_id, title, description, coverImage, genre, rating, year} = upReview;

    const { user } = useContext(AuthContext);
    const [review, setReview] = useState({
        coverImage: coverImage || "",
        title: title || "",
        description: description || "",
        rating: rating || "",
        year: year || "",
        genre: genre || "",
    });
    const navigate = useNavigate();

    useEffect(() => {
      
        setReview({
            coverImage,
            title,
            description,
            rating,
            year,
            genre,
        });
    }, [upReview]); 

    const genres = ["Action", "RPG", "Adventure", "Puzzle", "Shooter"]; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedReviewData = {
            ...review,
            email: user?.email,
            name: user?.displayName,
        };

        try {
            const response = await fetch(`https://chill-gamer-server-side-jet.vercel.app/review/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReviewData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Review Updated",
                    text: "Your review has been updated successfully!",
                });
                setReview({
                    coverImage: "",
                    title: "",
                    description: "",
                    rating: "",
                    year: "",
                    genre: "",
                });
                navigate("/my-reviews");
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
        <div className="max-w-2xl md:max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Update Game Review
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto dark:text-base-300 mb-6 text-center px-3">
                Share your thoughts about your favorite games! Fill out the form below
                to provide details like the game title, your review, rating, and more.
                Your input helps others discover great games.
            </p>
            <form onSubmit={handleUpdate} className="space-y-6 p-6 rounded-lg shadow">
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
                        Rating (1-10)
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
                    Update Review
                </button>
            </form>
        </div>
    );
};

export default UpdateReview;
