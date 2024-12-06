import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { DbContext } from "../providers/DbProviders";

const MyReviews = () => {
  const { user, loading } = useContext(AuthContext);
  const { review, setReview } = useContext(DbContext);
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading spinner for 1-2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);

    if (review && user) {
      const filteredReviews = review.filter((rev) => rev.email === user.email);
      setUserReviews(filteredReviews);
    }

    return () => clearTimeout(timer); // Cleanup the timer
  }, [review, user]);

  const handleDelete = (reviewId) => {
    const updatedReviews = userReviews.filter((rev) => rev._id !== reviewId);
    setUserReviews(updatedReviews);
  };

  const handleUpdate = (reviewId) => {
    console.log(`Updating review with ID: ${reviewId}`);
  };

  return (
    <div>
      <h1>{user ? `${user.displayName}'s Reviews` : "My Reviews"}</h1>

      {/* Show loading spinner for 1-2 seconds */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-ring text-blue-800 w-44 h-34"></span>
        </div>
      ) : userReviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Game Name</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userReviews.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>{review.title}</td>
                  <td>{review.description.slice(0, 60) + "..."}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(review._id)}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p>You haven't added any reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
