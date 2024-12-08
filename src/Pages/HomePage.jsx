import React from 'react';
import BannerSlider from '../Components/HomeComponents/BannerSlider';
import TopRatedReviews from '../Components/TopRatedReviews';

const HomePage = () => {
    return (
        <section>
            <div></div>
            <BannerSlider></BannerSlider>
            <section>
                <TopRatedReviews></TopRatedReviews>
            </section>
        </section>
    );
};

export default HomePage;