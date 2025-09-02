import React from 'react';
import OverviewSection from './OverviewSection.jsx'
import OfficeMap from '../AboutUs/OfficeMap';
import TravelBlogNews from '../AboutUs/TravelBlogNews';
import TravelTipsAdvice from '../AboutUs/TravelTipsAdvice';
import LocalEvents from './LocalEvents';

const AboutUs = () => {
    return (
        <div>
            <div>
                <OverviewSection></OverviewSection>
            </div>
            <div>
                <OfficeMap></OfficeMap>
            </div>
            <div>
                <TravelBlogNews></TravelBlogNews>
            </div>
            <div>
                <TravelTipsAdvice></TravelTipsAdvice>
            </div>
            <div>
                <LocalEvents></LocalEvents>
            </div>
        </div>
    );
};

export default AboutUs;