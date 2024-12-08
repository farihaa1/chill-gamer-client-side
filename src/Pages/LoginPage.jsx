import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginUser, handleGoogleLogin, loading, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        console.log("logged in user", res.user);
        setError("");
        navigate("/");
      })
      .catch((err) => {
        console.error("login error", err.message);
        setError("Invalid email or password");
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true); // Start loading state
    handleGoogleLogin()
      .then((res) => {
        console.log("Google sign-in user", res.user);
        navigate("/"); // Redirect to the home page after login
      })
      .catch((err) => {
        console.error("Google login error:", err.message);
        setError("Failed to sign in with Google. Please try again.");
      })
      .finally(() => setLoading(false)); // End loading state
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Login - Chill Gamer</h1>
          <p className="py-6 w-8/12 mx-auto">
            Log in to share your gaming experiences, discover new games, and
            connect with fellow gamers.
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:text-gray-300"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt dark:text-white link link-hover"
                >
                  Forgot password?
                </a>
              </label>
              {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Login</button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>OR</p>
            <button
              onClick={handleGoogleSignIn}
              className="btn  border-primary mt-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
