import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
import { motion } from "framer-motion";

const AllTripsPage = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filter, setFilter] = useState({
        minPrice: '',
        maxPrice: '',
        duration: '',
        travelDate: ''
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { day: "2-digit", month: "long" };
        return date.toLocaleDateString("en-US", options).replace(" ", "-");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("👤 AuthContext user:", user);

                let fetchedUser = null;

                if (user?.email) {
                    const userRes = await fetch(`https://backend-eight-inky.vercel.app/users?email=${user.email}`);
                    if (!userRes.ok) throw new Error('Failed to fetch user info');
                    fetchedUser = await userRes.json();
                    console.log("✅ Fetched userData:", fetchedUser);
                    setUserData(fetchedUser);
                }

                const packageRes = await fetch('https://backend-eight-inky.vercel.app/ourpackages/allpackages');
                if (!packageRes.ok) throw new Error('Failed to fetch packages');
                const packageData = await packageRes.json();
                console.log("📦 All fetched packages:", packageData);

                if (fetchedUser?.preferredDestination) {
                    const preferred = fetchedUser.preferredDestination.trim().toLowerCase();
                    const matching = packageData.filter(pkg =>
                        pkg.country?.trim().toLowerCase() === preferred
                    );
                    const others = packageData.filter(pkg =>
                        pkg.country?.trim().toLowerCase() !== preferred
                    );
                    const finalSorted = [...matching, ...others];
                    console.log("🎯 Sorted with preferred destination first:", finalSorted);
                    setPackages(finalSorted);
                    setFilteredPackages(finalSorted);
                } else {
                    console.log("ℹ️ No preferred destination, showing all normally.");
                    setPackages(packageData);
                    setFilteredPackages(packageData);
                }

            } catch (err) {
                console.error("❌ Error fetching data:", err.message);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, filter]);

    const applyFilters = () => {
        const results = packages.filter(pkg => {
            const keywordMatch =
                pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.tourtype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.highlights?.join(' ').toLowerCase().includes(searchTerm.toLowerCase());

            const priceMatch =
                (!filter.minPrice || pkg.price >= parseInt(filter.minPrice)) &&
                (!filter.maxPrice || pkg.price <= parseInt(filter.maxPrice));

            const durationMatch = !filter.duration || pkg.duration.includes(filter.duration);

            const dateMatch = !filter.travelDate || pkg.dates?.some(date =>
                formatDate(date).toLowerCase().includes(filter.travelDate.toLowerCase())
            );

            return keywordMatch && priceMatch && durationMatch && dateMatch;
        });

        setFilteredPackages(results);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setFilter({ minPrice: '', maxPrice: '', duration: '', travelDate: '' });
        setFilteredPackages(packages);
        setIsFilterModalOpen(false);
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    return (
        <section className="all-trips-section py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">All Trips</h2>

                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name, type, highlights..."
                        className="border p-2 rounded w-full md:w-1/2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleEnterKey}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className="bg-[#3F0113] text-white px-4 py-2 rounded hover:bg-[#52C960]"
                        >
                            Filter
                        </button>
                        <button
                            onClick={resetFilters}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Packages with 3D Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg._id}
                            className="package-card bg-white shadow-lg rounded-lg p-4 transform perspective-1000"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{
                                rotateX: 8,
                                rotateY: -8,
                                scale: 1.05,
                                boxShadow: "0px 20px 30px rgba(0,0,0,0.25)",
                            }}
                        >
                            <motion.img
                                src={pkg.image?.[0] || '/default-image.jpg'}
                                alt={pkg.name}
                                className="w-full h-48 object-cover rounded-md"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <h3 className="text-xl font-bold mt-4">{pkg.name}</h3>
                            <p className="text-gray-700 mt-2">{pkg.tourtype}</p>
                            <p className="text-gray-700 mt-2">Country: {pkg.country}</p>
                            <p className="text-lg font-semibold text-[#3F0113] mt-4">
                                Price: ${pkg.price}
                            </p>
                            <button
                                onClick={() => navigate(`/packages/${pkg._id}`)}
                                className="mt-4 px-4 py-2 bg-[#52C960] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#52C960] transition"
                            >
                                View Details
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Filter Trips</h3>

                        <div className="space-y-3">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={filter.minPrice}
                                onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={filter.maxPrice}
                                onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g., 7 days)"
                                value={filter.duration}
                                onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Travel Date"
                                value={filter.travelDate}
                                onChange={(e) => setFilter({ ...filter, travelDate: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    applyFilters();
                                    setIsFilterModalOpen(false);
                                }}
                                className="px-4 py-2 bg-[#3F0113] text-white rounded hover:bg-[#52C960]"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AllTripsPage;
