import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();
    const form = e.target;
    const email= form.email.value;
    const password= form.password.value;


    loginUser(email, password)
    .then(res=>{
      console.log('logged in user', res.user);
      setError('');
      navigate('/')
    })
    .catch(err => {
      console.log('login error', err.message)
      setError("Invalid email or password")
    })


  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Login - Chill Gamer</h1>
          <p className="py-6 w-8/12 mx-auto ">
            Log in to share your gaming experiences, discover new games, and
            connect with fellow gamers.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
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
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              {error && (
              <p className="text-red-500 text-center mb-2">{error}</p>
            )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
