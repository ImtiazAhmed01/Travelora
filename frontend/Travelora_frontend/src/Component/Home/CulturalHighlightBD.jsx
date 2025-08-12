import React from 'react';
import { motion } from "framer-motion";

const CulturalHighlightBD = () => {
    const highlights = [
        {
            id: 1,
            name: "Pohela Boishakh",
            image: "https://i.ibb.co.com/VQ0gdYm/Bengali-New-Year-640x360.jpg",
            description:
                "Pohela Boishakh, the Bengali New Year, is a vibrant celebration that brings together people of all communities. Streets come alive with colorful processions, traditional music, and delicious local cuisine. It’s a day of joy and renewal, marked by cultural performances and fairs.",
        },
        {
            id: 2,
            name: "Nakshi Kantha",
            image: "https://i.ibb.co.com/hZF4C7F/DSC4660-e1371127635923.jpg",
            description:
                "Nakshi Kantha is a traditional form of embroidery that transforms simple quilts into beautiful pieces of art. Each piece tells a unique story through intricate patterns and designs, reflecting the creativity and heritage of rural artisans in Bangladesh.",
        },
        {
            id: 3,
            name: "Folk Music",
            image: "https://img-cdn.thepublive.com/fit-in/1200x675/30-stades/media/post_banners/O3k3M7QDiOMxYMWscLOw.jpg",
            description:
                "The folk music of Bangladesh, especially the Baul songs, resonates with themes of love, spirituality, and nature. Experience the heartfelt performances of local artists, who use traditional instruments like the dotara and ektara to create soulful melodies.",
        },
    ];

    return (
        <section className="p-8 my-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Cultural Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highlights.map((highlight) => (
                    <motion.div
                        key={highlight.id}
                        className="highlight-card bg-[#87CEEB] rounded-lg shadow-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src={highlight.image}
                            alt={highlight.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{highlight.name}</h3>
                            <p className=" mt-2">{highlight.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};




export default CulturalHighlightBD;


