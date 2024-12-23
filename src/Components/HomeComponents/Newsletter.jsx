import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Here you can handle email submission, for example, sending it to a backend or API
    // For now, we'll just show a SweetAlert as confirmation

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have successfully subscribed to the Chill Gamer newsletter with the email: ${email}`,
    });

    // Optionally clear the input after submission
    setEmail("");
  };

  return (
    <div className="max-w-xl lg:max-w-2xl mx-auto px-4 py-8 md:my-12">
      <h2 className="text-3xl font-bold text-center mb-6">Subscribe to Our Newsletter</h2>
      <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-6 md:mb-16">
        Stay updated with the latest news, game reviews, and updates from Chill Gamer. Enter your email to get all the exciting content straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full max-w-md px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg w-full max-w-md font-bold"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
