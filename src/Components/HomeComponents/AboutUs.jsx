import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="about-us-section bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary ">
          About Us
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="text-orange-500">Chill Gamer</span>, where
          we bring you the latest and greatest in gaming reviews and
          recommendations! Our team is passionate about games and committed to
          creating a fun, informative, and interactive experience for all
          gamers.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-primary">
          Our Mission
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to create a friendly, engaging space for all types of
          gamers. From upcoming releases to classic hits, our team works
          tirelessly to bring you up-to-date content. We also strive to be a
          trusted source for game reviews, offering honest opinions and useful
          insights to help you make informed decisions on your next game
          purchase.
        </p>
        <div className="flex flex-col ">
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            Why Chill Gamer?
          </h3>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6 text-start">
            <li>
              Expert Reviews: Written by passionate and experienced gamers.
            </li>
            <li>
              Up-to-date Information: Stay on top of the latest gaming news.
            </li>
            <li>
              Community Focused: We value feedback and discussions from our
              users.
            </li>
            <li>
              Detailed Analysis: In-depth reviews and game features breakdown.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
