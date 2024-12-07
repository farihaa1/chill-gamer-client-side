import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const GameWatchListPage = () => {
  const watchListWithEmail = useLoaderData();
  const { user } = useContext(AuthContext);


  const filteredWatchList = watchListWithEmail.filter(
    (item) => item.userEmail === user?.email
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Watch List</h2>
      {filteredWatchList.length === 0 ? (
        <p className="text-center text-lg">Your watch list is empty.</p>
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
            {filteredWatchList.map((item) => (
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
