import React from "react";

const UpcomingGamesSection = () => {
  const games = [
    {
      title: "Date Everything",
      coverImage: "https://i.ibb.co/KyGSLBY/Date-Everything.jpg",
      releaseDate: "2025-02-10",
    },
    {
      title: "Tomb Raider IV-VI Remastered",
      coverImage: "https://i.ibb.co/XkQRFps/Tomb-Raider-IV-VI-Remastered.jpg",
      releaseDate: "2025-03-15",
    },
    {
      title: "Two Point Museum",
      coverImage: "https://i.ibb.co/PN3vSV7/Two-Point-Museum.jpg",
      releaseDate: "2025-05-01",
    },
    {
      title: "Cyber Legends",
      coverImage: "https://i.ibb.co/mXtYX8K/Cyber-Legends.png",
      releaseDate: "2025-06-20",
    },
    {
      title: "Dragon Quest X",
      coverImage: "https://i.ibb.co/xzCkQym/Dragon-Quest-X.jpg",
      releaseDate: "2025-07-12",
    },
    {
      title: "Galactic Wars: Unity",
      coverImage: "https://i.ibb.co/6D1Kprp/Galactic-Wars.webp",
      releaseDate: "2025-08-30",
    },
  ];

  return (
    <section className="upcoming-games-section  py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 md:text-3xl lg:text-4xl lg:mb-12">Upcoming Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div
              key={index} // Use index as the key since there's no unique ID in the array
              className="game-card bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg  mt-4 text-gray-700 font-semibold">{game.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Release Date: {new Date(game.releaseDate).toLocaleDateString()}
              </p>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingGamesSection;
