import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, user, updateUserProfile } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      });
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((res) => {
        const createdUser = res.user;
        console.log(createdUser, "created");

        updateUserProfile(name, photo)
          .then(() => {
            const newUser = { name, email, photo };
            console.log("Updating database with user:", newUser);

            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newUser),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("User saved to database:", data);

                if (data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  form.reset();
                  navigate("/");
                } else {
                  throw new Error("Failed to save user to database");
                }
              })
              .catch((err) => {
                console.error("Database error:", err);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Could not save user data. Please try again later.",
                });
              })
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Could not update profile. Please try again.",
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Firebase error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Could not create user. Please check your credentials.",
        });
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen pt-12">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Register - Chill Gamer</h1>
          <p className="py-6 w-8/12 mx-auto">
            Join the Chill Gamer community to share your reviews, discover new
            games, and connect with fellow gamers.
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
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
                placeholder="Email"
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
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-primary text-white ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <label className="label">
              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-primary" to="/login">
                  Login
                </Link>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
