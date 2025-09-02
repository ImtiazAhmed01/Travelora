import React, { useState, useEffect } from 'react';


const Reviews = ({ packageName }) => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 5;

    useEffect(() => {
        if (!packageName) {
            setReviews([]);
            setTotalCount(0);
            return;
        }

        const fetchReviews = async () => {
            try {
                const res = await fetch(
                    `https://backend-eight-inky.vercel.app/reviews?packageName=${encodeURIComponent(packageName)}&limit=${limit}&skip=${(page - 1) * limit}`
                );
                const data = await res.json();
                setReviews(data.reviews);
                setTotalCount(data.totalCount);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };
        fetchReviews();
    }, [packageName, page]);


    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Reviews for: {packageName || "Select a package"}
            </h2>

            {reviews.length > 0 ? (
                reviews.map((rev, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-white shadow-sm mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="font-semibold text-blue-600">{rev.userName}</span>
                            <span className="text-yellow-500 font-bold">{'⭐'.repeat(rev.rating)}</span>
                        </div>
                        <p className="text-gray-700">{rev.review}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {new Date(rev.timestamp).toLocaleString()}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No reviews found for this package.</p>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        className="btn btn-outline"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="btn btn-outline"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >

                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Reviews;
