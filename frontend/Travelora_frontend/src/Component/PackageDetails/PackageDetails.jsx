import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TourPlanSection from "./TourPlanSection";
import { AuthContext } from "../Provider/authProvider";
import Reviews from "./Reviews";

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [packageDetails, setPackageDetails] = useState(null);
    const [tourGuides, setTourGuides] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedGuide, setSelectedGuide] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log("User:", user);
        fetch(`http://localhost:5000/ourpackages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched package details:", data);
                setPackageDetails(data);
            })
            .catch((error) => console.error("Error fetching package details:", error));

        fetch("http://localhost:5000/tourguides/all")
            .then((res) => res.json())
            .then((data) => setTourGuides(data))
            .catch((error) => console.error("Error fetching tour guides:", error));
    }, [id]);
    const handleBooking = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        const bookingData = {
            packageId: id,
            packageName: packageDetails.name,
            touristName: user.displayName,
            touristEmail: user.email,
            touristImage: user.image,
            price: packageDetails.price,
            tourDate: selectedDate,
            guideName: selectedGuide,
            status: "pending",
        };
        console.log("Booking data to send:", bookingData);
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Booking response:", data);
                if (data.bookingId) {
                    setShowModal(true);
                } else {
                    alert("Booking failed. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error creating booking:", error);
                alert("An error occurred while booking. Please try again.");
            });
    };
    if (!packageDetails) return <div>Loading...</div>;

    return (
        <section className="package-details-section py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">{packageDetails.name}</h2>

                {/* Image Grid */}
                <div className="grid grid-rows-2 grid-cols-4 gap-4 mb-8">
                    {packageDetails.image?.length >= 5 ? (
                        <>
                            <div className="row-span-2 col-span-2">
                                <img
                                    src={packageDetails.image[0]}
                                    alt="Tour Image 1"
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                            <div className="col-span-1">
                                <img
                                    src={packageDetails.image[1]}
                                    alt="Tour Image 2"
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                            <div className="col-span-1">
                                <img
                                    src={packageDetails.image[2]}
                                    alt="Tour Image 3"
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                            <div className="col-span-1 row-span-2">
                                <img
                                    src={packageDetails.image[3]}
                                    alt="Tour Image 4"
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                            <div className="col-span-1">
                                <img
                                    src={packageDetails.image[4]}
                                    alt="Tour Image 5"
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                        </>
                    ) : (
                        <p>No images available for this package.</p>
                    )}
                </div>

                {/* About the Tour Section */}
                <div className="mb-8 px-10">
                    <h3 className="text-2xl font-bold mb-4">About the Tour</h3>
                    <p>{packageDetails.tourtype || "No tour type available."}</p>
                    <p className="text-xl font-semibold mb-4">Included:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        {packageDetails.included?.map((item, index) => (
                            <li key={index} className="text-lg">{item}</li>
                        )) || <li>No items included in this package.</li>}
                    </ul>
                    <p className="text-xl font-semibold mb-4">Highlights:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        {packageDetails.highlights?.map((item, index) => (
                            <li key={index} className="text-lg">{item}</li>
                        )) || <li>No highlights available for this package.</li>}
                    </ul>
                </div>

                {/* Tour Plan Section */}
                <TourPlanSection packageDetails={packageDetails} />

                {/* Tour Guides Section */}
                <div className="px-4 sm:px-8 lg:px-16 py-8">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">Tour Guides</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tourGuides.length > 0 ? (
                            tourGuides.map((guide) => (
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
                                    <p className="text-sm mt-1">
                                        <strong>Experience:</strong> {guide.experience}
                                    </p>
                                    <p className="text-sm mt-1">
                                        <strong>Availability:</strong> {guide.availability}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No tour guides available.</p>
                        )}
                    </div>
                </div>
                <Reviews packageName={packageDetails.name} />

                {/* Booking Form */}
                <div className="border p-6 rounded-md shadow-md">
                    <h3 className="text-2xl font-bold mb-4">Book This Tour</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Name of the Package</label>
                            <input
                                type="text"
                                value={packageDetails.name || ""}
                                readOnly
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Tourist Name</label>
                            <input
                                type="text"
                                value={user?.displayName || ""}
                                readOnly
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Tourist Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Tour Date</label>
                            <select
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="" disabled>Select a date</option>
                                {packageDetails.dates?.length > 0 ? (
                                    packageDetails.dates.map((date, index) => (
                                        <option key={index} value={date}>{date}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No dates available</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Tour Guide</label>
                            <select
                                value={selectedGuide}
                                onChange={(e) => setSelectedGuide(e.target.value)}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select a guide</option>
                                {tourGuides.length > 0 ? (
                                    tourGuides.map((guide) => (
                                        <option key={guide._id} value={guide.name}>
                                            {guide.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No guides available</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Price</label>
                            <input
                                type="text"
                                value={packageDetails.price || ""}
                                readOnly
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleBooking}
                            className="bg-[#52C960]/70 text-white py-2 px-4 rounded hover:bg-[#52C960]"
                            disabled={!selectedDate || !selectedGuide}
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </div>

            {/* Booking Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p className="text-lg font-bold mb-4">Booking Confirmed!</p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                navigate('/dashboard/tourist/myBookings');
                            }}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Go to My Bookings
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PackageDetails;