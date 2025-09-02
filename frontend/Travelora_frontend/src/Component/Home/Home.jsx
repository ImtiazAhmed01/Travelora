import React, { useState } from 'react';
import MyCarousel from './MyCarousel';
import TourismAndTravelGuide from './TourismAndTravelGuide';
import TouristStorySection from './touristStorySection';
import TopDestination from './TopDestination';
import CulturalHighlightBD from './culturalHighlightBD';



const Home = () => {


    return (
        <div>
            <div>

            </div>

            <MyCarousel></MyCarousel>


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
                <CulturalHighlightBD></CulturalHighlightBD>

            </div>


        </div>
    );
};

export default Home;