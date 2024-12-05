import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSlider = () => {
    const slides = [
        {
          id: 1,
          title: "Welcome to Chill Gamer!",
          description: "The ultimate platform for discovering and reviewing your favorite games! Explore thousands of games, connect with a passionate gaming community, and get honest feedback on the latest titles. Whether you're into action, adventure, or strategy, we have something for everyone!"
        },
        {
          id: 2,
          title: "Discover Amazing Games",
          description: "Find top-rated games, new releases, and hidden gems across all genres. From AAA blockbusters to indie masterpieces, discover games that will keep you entertained for hours. Dive into various categories, including RPG, shooters, strategy, and more, to find your next favorite game."
        },
        {
          id: 3,
          title: "Enjoy the Best Reviews",
          description: "Read honest, in-depth reviews from gamers just like you! Our community shares their real experiences with the games, from gameplay mechanics to graphics and storyline. Make informed decisions before purchasing your next game, and find out what the experts and players are saying!"
        },
      ];

  return (
    <div
      className="banner-slider relative w-full bg-cover bg-center "
      style={{
        backgroundImage: `url('https://i.ibb.co/wwVjHZb/banner-1.jpg')`,
      }}
    >
      <div className='bg-gradient-to-b from-[#1a202c] to-[#222a3571] dark:bg-gradient-to-b dark:from-[#1a202c] dark:to-[#222a3584]'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="absolute inset-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center justify-center w-full  text-center px-6 py-4 h-[460px] md:h-[500px] md:py-10">
              <div>
                <h2 className="text-white text-2xl lg:text-5xl font-bold mb-2 transition-transform duration-300 hover:scale-105">
                  {slide.title}
                </h2>
                <p className="text-white text-xs lg:text-base opacity-90 transition-opacity duration-300 hover:opacity-100 max-w-4xl my-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
