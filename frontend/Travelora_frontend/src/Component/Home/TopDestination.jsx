import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TopDestination = () => {
    const navigate = useNavigate();
    const destinations = [
        {
            id: 1,
            name: "Sundarbans Mangrove Forest",
            image: "https://i.ibb.co/8mVXXHH/ev-ert5t-n5.jpg",
            description: "Explore the world's largest mangrove forest.",
        },
        {
            id: 2,
            name: "Cox's Bazar Beach",
            image: "https://i.ibb.co/ZW5HjWy/What-are-the-most-unique-things-to-do-in-Coxs-Bazar.jpg",
            description: "Enjoy the serene beauty of the world's longest beach.",
        },
        {
            id: 3,
            name: "Bandarban Hills",
            image: "https://i.ibb.co/6XrkwLf/maxresdefault.jpg",
            description: "Witness the majestic hills and waterfalls.",
        },
    ];

    return (
        <div className="px-4 sm:px-8 lg:px-16">
            <section className="top-destinations py-8 bg-gray-100 text-center">
                <h2 className="text-3xl text-black font-bold mb-6">Top Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
                    {destinations.map((destination) => (
                        <motion.div
                            key={destination.id}
                            className="w-full max-w-xs bg-white rounded-lg shadow-lg p-4 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/alltirpspages")}
                        >
                            <img
                                src={destination.image}
                                alt={destination.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-bold mt-4">{destination.name}</h3>
                            <p className="text-gray-700 mt-2">{destination.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopDestination;
