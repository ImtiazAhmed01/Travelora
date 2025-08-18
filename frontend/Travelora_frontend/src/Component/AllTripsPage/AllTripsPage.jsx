import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Step 1: Log user context
                console.log("👤 AuthContext user:", user);

                let fetchedUser = null;

                if (user?.email) {
                    const userRes = await fetch(`http://localhost:5000/users?email=${user.email}`);
                    //const userRes = await fetch(`http://localhost:5000/users/${user.email}`);
                    if (!userRes.ok) throw new Error('Failed to fetch user info');
                    fetchedUser = await userRes.json();
                    console.log("✅ Fetched userData:", fetchedUser);
                    setUserData(fetchedUser);
                }

                const packageRes = await fetch('http://localhost:5000/ourpackages/allpackages');
                if (!packageRes.ok) throw new Error('Failed to fetch packages');
                const packageData = await packageRes.json();
                console.log("📦 All fetched packages:", packageData);

                // Step 4: Sort by preferred destination
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

    // Live filtering
    useEffect(() => {
        applyFilters();
    }, [searchTerm, filter]);

    const applyFilters = () => {
        const results = packages.filter(pkg => {
            const keywordMatch = pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.tourtype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.highlights?.join(' ').toLowerCase().includes(searchTerm.toLowerCase());

            const priceMatch =
                (!filter.minPrice || pkg.price >= parseInt(filter.minPrice)) &&
                (!filter.maxPrice || pkg.price <= parseInt(filter.maxPrice));

            const durationMatch = !filter.duration || pkg.duration.includes(filter.duration);
            const dateMatch = !filter.travelDate || pkg.dates?.some(date => date.includes(filter.travelDate));

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

                {/* Packages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg, index) => (
                        <div
                            key={pkg._id}
                            className="package-card bg-white shadow-lg rounded-lg p-4"
                        >
                            <img
                                src={pkg.image?.[0] || '/default-image.jpg'}
                                alt={pkg.name}
                                className="w-full h-48 object-cover rounded-md"
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllTripsPage;
