// src/components/TravelTipsAdvice.jsx

import React from 'react';
import { motion } from 'framer-motion';

const tips = [
    "Pack light to save space and weight.",
    "Always carry a portable charger.",
    "Learn basic local phrases.",
    "Keep digital copies of important documents.",
    "Book tickets in advance for popular attractions.",
    "Carry a reusable water bottle to stay hydrated.",
];

const TravelTipsAdvice = () => {
    return (
        <motion.div
            className="p-4 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Travel Tips & Advice</h2>
            <ul className="space-y-4">
                {tips.map((tip, index) => (
                    <motion.li
                        key={index}
                        className="bg-[#FEFAE0] text-[#3F0113] p-4 rounded-md shadow-lg cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD700] hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        {tip}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default TravelTipsAdvice;
