import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";

const GameWatchListPage = () => {
  const { user } = useContext(AuthContext);
  const [watchListWithEmail, setWatchListWithEmail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (!user) {
      setIsLoading(true);
    }

    fetch(`https://chill-gamer-server-side-jet.vercel.app/watch-list?userEmail=${user.email}`)
      .then((response) => response.json())
      .then((watchList) => {
        setWatchListWithEmail(watchList);
        setIsLoading(false);
        
      })
      .catch((error) => console.error("Error fetching watch-list:", error));
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Watch List</h2>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-ring text-blue-800 w-32 h-32"></span>
        </div>
      ) : watchListWithEmail.length === 0 ? (
        <p className="text-center text-lg text-red-500">
          You haven’t added anything to your watchlist yet.
        </p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Cover</th>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Genre</th>
              <th className="px-4 py-2 text-left border-b">Rating</th>
              <th className="px-4 py-2 text-left border-b">Year</th>
            </tr>
          </thead>
          <tbody>
            {watchListWithEmail.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border-b">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.genre}</td>
                <td className="px-4 py-2 border-b">{item.rating}</td>
                <td className="px-4 py-2 border-b">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameWatchListPage;
