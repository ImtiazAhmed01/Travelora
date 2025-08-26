
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [countdowns, setCountdowns] = useState({});
    const abusiveWords = ['bitch', 'fuck', 'shit', 'asshole','bitch', 'stupid', 'bully', 'curse'];

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/bookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBookings(data);
                    const initialCountdowns = {};
                    data.forEach((booking) => {
                        const rawDate = booking.tourStartDate || booking.tourDate;
                        const startPart = rawDate?.split('-')[0]?.trim();
                        const year = rawDate?.split(' ')[rawDate.split(' ').length - 1];
                        const fullDate = `${startPart} ${year}`;
                        const parsedDate = new Date(fullDate);
                        initialCountdowns[booking._id] = isNaN(parsedDate)
                            ? 0
                            : parsedDate.getTime() - Date.now();
                    });
                    setCountdowns(initialCountdowns);
                } else {
                    console.error('Expected array but got:', data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdowns((prev) => {
                const updated = {};
                for (const key in prev) {
                    updated[key] = Math.max(0, prev[key] - 1000);
                }
                return updated;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const calculateRefund = (booking) => {
        const rawDate = booking.tourStartDate || booking.tourDate;
        const startPart = rawDate?.split('-')[0]?.trim();
        const year = rawDate?.split(' ')[rawDate.split(' ').length - 1];
        const fullDate = `${startPart} ${year}`;
        const tourDate = new Date(fullDate);
        const currentTime = new Date();

        const timeDiff = tourDate.getTime() - currentTime.getTime();
        const daysBefore = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysBefore >= 7) return 100;
        else if (daysBefore >= 4) return 50;
        else if (daysBefore >= 3) return 0;
        else return -1;
    };

    const handleCancel = async (bookingId) => {
        const booking = bookings.find((b) => b._id === bookingId);
        const refundPercent = calculateRefund(booking);

        if (refundPercent === -1) {
            Swal.fire({
                icon: 'warning',
                title: 'Too Late to Cancel',
                text: 'Cancellations not allowed within 3 days of tour date.',
            });
            return;
        }

        const confirmed = await Swal.fire({
            icon: 'warning',
            title: 'Confirm Cancellation',
            text: `You will receive a ${refundPercent}% refund. Proceed?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel',
        });

        if (!confirmed.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b._id !== bookingId));

                await fetch('http://localhost:5000/refunds', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        bookingId,
                        userEmail: user.email,
                        userName: user.displayName,
                        refundPercent,
                        refundAmount: (booking.price * refundPercent) / 100,
                        cancelDate: new Date().toISOString(),
                        packageName: booking.packageName,
                    }),
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Booking Cancelled',
                    text: `Refund processed: ${refundPercent}%`,
                });
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleSubmitReview = async () => {
        const hasAbusive = abusiveWords.some((word) =>
            reviewText.toLowerCase().includes(word)
        );

        if (hasAbusive) {
            Swal.fire({
                icon: 'warning',
                title: 'Inappropriate content',
                text: 'Your review contains inappropriate language.',
            });
            return;
        }

        const reviewData = {
            userEmail: user.email,
            userName: user.displayName,
            packageId: selectedBooking.packageId,
            packageName: selectedBooking.packageName,
            rating,
            review: reviewText,
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review submitted!',
                });
                setReviewText('');
                setRating(5);
                setSelectedBooking(null);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission failed',
                });
            }
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    const formatCountdown = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">My Bookings</h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-center">
                        <thead className="bg-blue-200">
                            <tr>
                                <th>Package</th>
                                <th>Tour Guide</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Countdown</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="border-b">
                                    <td>{booking.packageName}</td>
                                    <td>{booking.guideName}</td>
                                    <td>{booking.tourDate}</td>
                                    <td>${booking.price}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {booking.status === 'pending'
                                            ? 'Pending'
                                            : formatCountdown(countdowns[booking._id])}
                                    </td>
                                    <td className="flex justify-center flex-wrap gap-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <Link
                                                    to={`/payment/${booking._id}`}
                                                    className="btn btn-success"
                                                >
                                                    Pay
                                                </Link>
                                                {calculateRefund(booking) === -1 ? (
                                                    <button className="btn btn-disabled" disabled>
                                                        Cannot Cancel
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-error"
                                                        onClick={() => handleCancel(booking._id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </>
                                        )}

                                        {booking.status === 'Approved' && (
                                            <button
                                                className="btn btn-info"
                                                onClick={() => setSelectedBooking(booking)}
                                            >
                                                Review
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Review Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
                        <h3 className="text-xl font-semibold mb-4">
                            Review: {selectedBooking.packageName}
                        </h3>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Write your review..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <label className="block mb-2 font-medium">Rating</label>
                        <select
                            className="select select-bordered w-full mb-4"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>
                                    {r} Star{r > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-between">
                            <button onClick={handleSubmitReview} className="btn btn-primary">
                                Submit
                            </button>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBooking;
