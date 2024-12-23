import React from 'react';
import BannerSlider from '../Components/HomeComponents/BannerSlider';
import TopRatedReviews from '../Components/TopRatedReviews';
import UpcomingGamesSection from '../Components/HomeComponents/UpcomingGamesSection.jsx';
import AboutUs from '../Components/HomeComponents/AboutUs';
import ChillGameComments from '../Components/ChillGameComments.jsx';
import Newsletter from '../Components/HomeComponents/Newsletter.jsx';

const HomePage = () => {
    return (
        <section>
            <div></div>
            <BannerSlider></BannerSlider>
            <section>
                <TopRatedReviews></TopRatedReviews>
            </section>
            <section>
                <UpcomingGamesSection></UpcomingGamesSection>
            </section>
            <section>
                <ChillGameComments></ChillGameComments>
            </section>
            <section>
                <AboutUs></AboutUs>
            </section>
            <section>
                <Newsletter></Newsletter>
            </section>
        </section>
    );
};

export default HomePage;