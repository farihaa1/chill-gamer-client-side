import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Fade } from 'react-awesome-reveal'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const ChillGameComments = () => {
    const comments = [
        { 
          id: 1, 
          text: "This game is super relaxing, I love it! The gameplay is intuitive and fun. Perfect for anyone seeking a chill and refreshing gaming experience.", 
          user: "JohnDoe123" 
        },
        { 
          id: 2, 
          text: "I can play this game for hours without getting bored! The controls are smooth, and the overall atmosphere is so calming. Truly an amazing game!", 
          user: "JaneSmith" 
        },
        { 
          id: 3, 
          text: "Amazing graphics and smooth gameplay make this a standout title. I highly recommend it for anyone looking for an escape from their daily grind!", 
          user: "GamerGal_88" 
        },
        { 
          id: 4, 
          text: "Perfect way to relax after a long day! The soothing background music and stunning visuals make this my go-to game whenever I need to unwind.", 
          user: "ChrisCool" 
        },
        { 
          id: 5, 
          text: "Highly recommend this game to all gamers! The immersive atmosphere, excellent sound design, and engaging gameplay make it an absolute joy to play.", 
          user: "UltimateGamer" 
        },
        { 
          id: 6, 
          text: "One of the most chill games I’ve ever played! The ambient sounds and beautifully crafted levels make it an unforgettable experience every time.", 
          user: "RelaxedPlayer" 
        },
        { 
          id: 7, 
          text: "The game is visually stunning, and the mechanics are perfectly balanced. It’s so easy to lose track of time while playing. Absolutely love it!", 
          user: "Gaming_Star" 
        },
        { 
          id: 8, 
          text: "Great game to play with friends or alone! Its relaxing vibe and captivating gameplay make it enjoyable for players of all skill levels. A must-try!", 
          user: "PlayerX_99" 
        },
        { 
          id: 9, 
          text: "I’ve been playing this game for hours, and it just keeps getting better! The pacing is perfect, and every level is designed with so much creativity.", 
          user: "MysticWolf" 
        },
        { 
          id: 10, 
          text: "I just love how relaxing this game is! It’s the perfect way to spend a quiet evening, and I can’t wait to recommend it to all my friends and family.", 
          user: "LeisureLover" 
        }
      ];
      
      
    

  return (
    <div className="w-full bg-gray-800 py-16 px-4">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-8">Chill Game Comments</h2>

   
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="absolute inset-0"
        >
          {comments.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Fade duration={1000}>
                <div key={slide.id} className="flex items-center justify-center w-full text-center px-6 py-4 h-[300px] md:py-10">
                  <div>
                    <h2 className="text-white text-2xl lg:text-5xl font-bold mb-4 transition-transform duration-300 hover:scale-105">
                    {slide.user}
                    </h2>
                    <p className="text-white text-xs lg:text-base opacity-90 transition-opacity duration-300 hover:opacity-100 my-6 max-w-xl">
                      {slide.text}
                    </p>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ChillGameComments;
