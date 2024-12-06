import React from "react";
import { useLoaderData } from "react-router-dom";

const ReviewDetails = () => {
  const review = useLoaderData();
  const {_id, title, description, coverImage, genre, rating, year} = review
  console.log(review, 'review');
  return (
    <div>
      
        <div className=" mx-auto min-h-screen lg:flex lg:justify-center lg:items-start my-12">
          <figure className="px-6 pt-6 min-w-[490px] h-[500px] bg-primary rounded-2xl">
            <img
              src={coverImage}
              className="rounded-xl w-full h-full -mb-12 object-cover object-center"
            />
          </figure>
          <div className="flex flex-col gap-2 pt-6 pl-7 ">
            <h2 className="card-title text-xl md:text-3xl mb-3">{title}</h2>
            <p className="text-lg lg:text-xl">Genre: {genre}</p>
            <p className="text-lg lg:text-xl">Rating: {rating}</p>
            <p className="text-lg lg:text-xl my-2">{description}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Add to WatchList</button>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default ReviewDetails;
