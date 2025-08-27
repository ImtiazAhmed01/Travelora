import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AllTourGuide = () => {
    const { id } = useParams(); // ✅ Fixed useParams usage
    const [tourGuides, setTourGuides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/tourguides/all")
            .then((res) => res.json())
            .then((data) => setTourGuides(data))
            .catch((error) => console.error("Error fetching tour guides:", error));
    }, [id]);

    return (
        <div className="px-4 sm:px-8 lg:px-16 py-8 ">
            {/* Tour Guides Section */}
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 ">Tour Guides</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tourGuides.map((guide) => (
                    <div
                        key={guide._id}
                        className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => navigate(`/tourguides/${guide._id}`)}
                    >
                        <img
                            src={guide.img}
                            alt={guide.name}
                            className="w-full h-60 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-xl font-semibold text-gray-900">{guide.name}</h4>
                        <p className="text-sm text-gray-700 mt-1">
                            <strong>Experience:</strong> {guide.experience}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                            <strong>Availability:</strong> {guide.availability}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTourGuide;
