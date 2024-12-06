import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { DbContext } from "../providers/DbProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const { user, loading } = useContext(AuthContext);
  const { review, setReview } = useContext(DbContext);
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (review && user) {
      const filteredReviews = review.filter((rev) => rev.email === user.email);
      setUserReviews(filteredReviews);
    }

    return () => clearTimeout(timer);
  }, [review, user]);

  const handleDelete = (reviewId) => {
    // const updatedReviews = userReviews.filter((rev) => rev._id !== reviewId);
    // setUserReviews(updatedReviews);
    console.log(reviewId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/review/${reviewId}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your review has been deleted.",
                  icon: "success",
                });
                const remaining = userReviews.filter((rev) => rev._id !== reviewId);
                setUserReviews(remaining); // Update state with remaining reviews
              }
            })
            .catch((error) => console.error("Delete failed", error));
          
      }
    });
  };

  return (
    <div>
      <h1>{user ? `${user.displayName}'s Reviews` : "My Reviews"}</h1>

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
                    <Link
                      to = {`/update-Review/${review._id}`}
                      className="px-4 py-2 rounded-lg bg-primary text-base-100 mr-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-4 py-2 rounded-lg bg-orange-600 text-base-100 "
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
