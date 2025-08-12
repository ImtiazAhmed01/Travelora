import React, { useState } from 'react';
import MyCarousel from './MyCarousel';
import OverviewSection from './OverviewSection';
import TourismAndTravelGuide from './TourismAndTravelGuide';
import TouristStorySection from './touristStorySection';
import TopDestination from './TopDestination';
import CulturalHighlightBD from './culturalHighlightBD';
import TravelBlogNews from './TravelBlogNews';
import TravelTipsAdvice from './TravelTipsAdvice';
import LocalEvents from './LocalEvents';
import OfficeMap from './OfficeMap';

const Home = () => {


    return (
        <div>
            <div>

            </div>

            <MyCarousel></MyCarousel>
            <div>
                <OverviewSection></OverviewSection>
            </div>
            <div>
                <OfficeMap></OfficeMap>
            </div>
            <div>
                <TourismAndTravelGuide></TourismAndTravelGuide>
            </div>
            <div>
                <TouristStorySection></TouristStorySection>
            </div>
            <div>
                <TopDestination></TopDestination>
            </div>
            <div>
                <TravelBlogNews></TravelBlogNews>
            </div>
            <div>
                <TravelTipsAdvice></TravelTipsAdvice>
            </div>
            <div>
                <CulturalHighlightBD></CulturalHighlightBD>

            </div>
            <div>
                <LocalEvents></LocalEvents>
            </div>

        </div>
    );
};

export default Home;