import { useState } from "react";

const TourPlanSection = ({ packageDetails }) => {
    const [activeDay, setActiveDay] = useState(null);

    const handleBoxClick = (index) => {
        setActiveDay((prevDay) => (prevDay === index ? null : index));
    };

    const handleOutsideClick = () => {
        setActiveDay(null);
    };

    return (
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-center  mb-6">
                Tour Plan
            </h3>

            {/* Grid Layout for Days */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                onClick={handleOutsideClick}
            >
                {packageDetails.tourplan?.length > 0 ? (
                    packageDetails.tourplan.map((day, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg bg-[#333333] text-[#87CEEB] text-center border shadow-md transition-transform duration-300 ease-in-out cursor-pointer transform hover:scale-105 hover:bg-gray-100 hover:text-[#333333] ${activeDay === index ? "bg-gray-200 border-indigo-500" : "bg-white border-gray-300"
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBoxClick(index);
                            }}
                        >
                            <h4 className="font-semibold text-lg ">
                                Day {index + 1}
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                {day.substring(0, 50)}...
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No tour plan available for this package.
                    </p>
                )}
            </div>

            {/* Display Selected Day's Tour Plan */}
            {activeDay !== null && (
                <div
                    className="border-2 border-indigo-500 p-6 rounded-lg mt-6  bg-[#87CEEB] shadow-lg transform transition-transform duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h4 className="font-semibold text-2xl text-white mb-3">
                        Day {activeDay + 1}
                    </h4>
                    <p className="text-white text-base leading-relaxed">
                        {packageDetails.tourplan[activeDay]}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TourPlanSection;
