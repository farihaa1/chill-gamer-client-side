import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user, updateUserProfile, updateUserEmail } = useContext(AuthContext); // Context functions for updates
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photo: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { name, email, photo } = updatedUser;

    try {
      // Update user profile (displayName, photoURL)
      await updateUserProfile({ displayName: name, photoURL: photo });

      // Update user email if it has changed
      if (user.email !== email) {
        await updateUserEmail(email);
      }

      // Update user information in MongoDB (if required)
      const response = await fetch(`http://localhost:5000/users/${user.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="hero min-h-screen pt-12">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Update Profile</h1>
          <p className="py-6">Edit your profile information below.</p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleUpdate} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                value={updatedUser.photo}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
