// src/components/TravelBlogNews.jsx

import React from 'react';
import { motion } from 'framer-motion';

const TravelBlogNews = () => {
    return (
        <motion.div
            className="p-4 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Travel Blog & News</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="shadow-lg rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.lonelyplanet.com/news"
                        title="Lonely Planet News"
                        className="w-full h-96"
                    ></iframe>
                </div>
                <div className="shadow-lg rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.nationalgeographic.com/travel"
                        title="National Geographic Travel"
                        className="w-full h-96"
                    ></iframe>
                </div>
            </div>
        </motion.div>
    );
};

export default TravelBlogNews;
