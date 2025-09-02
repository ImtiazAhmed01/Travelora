import React from 'react';

const OverviewSection = () => {
    return (
        <section className="overview-section py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-[#1E90FF] mb-8">
                    Welcome to The Tourist Guide - Explore Bangladesh
                </h2>
                <p className="text-xl text-center  mb-8">
                    The Tourist Guide is your ultimate travel companion for exploring the hidden gems and popular landmarks in Bangladesh. Whether you're planning to visit historical sites, enjoy the natural beauty, or indulge in local cuisine, we provide all the information you need to make your trip unforgettable.
                </p>
                <div className="flex justify-center mb-8">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/aegaDwmgr4Q?si=5Raa1b9MlLw-n_yf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="text-center">
                    <p className="text-lg ">
                        Dive into the beauty of Bangladesh with detailed travel guides, tips, and videos that bring you closer to the heart of the country.
                    </p>
                    <button
                        className="mt-4 px-8 py-3 bg-[#52C960] text-[#3F0113] rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-[#3F0113] hover:text-[#52C960]"
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;
