import React, { useState } from "react";
import slider1Image from "../../assets/SlideImg/tourist-trends-in-Saudia-Arabia.jpg";
import slider2Image from "../../assets/SlideImg/Tourism-FM-Article.jpg";
import slider3Image from "../../assets/SlideImg/pexels-asadphoto-1450340.jpg";
import slider4Image from "../../assets/SlideImg/Tourists-enjoy-sunset-in-Oia-San-Torini-Greece.jpg";

const slidesData = [
    {
        id: "slide1",
        image: slider1Image,
        title: "Explore Bangladesh Like Never Before",
        description: "Discover hidden gems, breathtaking landscapes, and vibrant cultures with our personalized tour guides.",
    },
    {
        id: "slide2",
        image: slider2Image,
        title: "Plan Your Perfect Getaway",
        description: "Seamlessly organize your trips with our comprehensive planning tools and expert recommendations.",
    },
    {
        id: "slide3",
        image: slider3Image,
        title: "Your Trusted Travel Companion",
        description: "From transportation to accommodations, our platform ensures a hassle-free travel experience.",
    },
    {
        id: "slide4",
        image: slider4Image,
        title: "Start Your Adventure Today",
        description: "Embark on unforgettable journeys with our curated itineraries designed just for you.",
    },
];

const MyCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden bg-black">
            {/* Slides */}
            {slidesData.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                    <div className="absolute bottom-8 inset-x-0 bg-opacity-80 bg-black text-white text-center py-6 px-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">{slide.title}</h2>
                        <p className="mt-2">{slide.description}</p>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
                <button onClick={prevSlide} className="btn btn-circle text-white shadow-md">❮</button>
                <button onClick={nextSlide} className="btn btn-circle text-white shadow-md">❯</button>
            </div>
        </div>
    );
};

export default MyCarousel;
