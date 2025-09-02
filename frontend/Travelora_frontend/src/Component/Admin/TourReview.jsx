import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const TourReview = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://backend-eight-inky.vercel.app/adminReview/all');
                const data = await res.json();
                setPackages(data);
            } catch (err) {
                console.error('Failed to fetch packages', err);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date)) return 'N/A';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const parseDatesAndDuration = (rangeString) => {
        if (!rangeString || !rangeString.includes('-')) return { start: null, end: null, duration: 'N/A' };
        const [startPart, endPart] = rangeString.split(' - ').map(s => s.trim());
        const endYearMatch = endPart.match(/\d{4}$/);
        const year = endYearMatch ? endYearMatch[0] : new Date().getFullYear();
        const startDate = new Date(`${startPart} ${year}`);
        const endDate = new Date(endPart);
        if (isNaN(startDate) || isNaN(endDate)) return { start: null, end: null, duration: 'N/A' };
        const diffDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const duration = `${formatDate(startDate)} - ${formatDate(endDate)} (${diffDays} day${diffDays > 1 ? 's' : ''})`;
        return { start: startDate, end: endDate, duration };
    };

    const sendEmail = async (userName, userEmail, tour) => {
        const firstDateRange = tour.dates?.[0] || '';
        const { start, duration } = parseDatesAndDuration(firstDateRange);

        const templateParams = {
            to_name: userName,
            to_email: userEmail,
            tour_name: tour.name,
            tour_type: tour.tourtype || 'N/A',
            tour_price: tour.price || 'N/A',
            tour_duration: duration,
            tour_date: start ? formatDate(start) : 'N/A',
        };

        try {
            await emailjs.send(
                'service_yff3adl',
                'template_krjyxmf',
                templateParams,
                'HKrsrYC-31ttxYPQL'
            );
            console.log('Email sent');
        } catch (error) {
            console.error('Email send failed:', error);
        }
    };

    const handleApprove = async (packageId, userEmail, tour) => {
        if (!packageId) return alert('Missing package ID');

        try {
            const res = await fetch(`https://backend-eight-inky.vercel.app/adminReview/approve/${packageId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail, tourDetails: tour }),
            });

            if (res.ok) {
                await sendEmail(tour.userName, userEmail, tour);
                alert('Approved and email sent!');

                setPackages(prev =>
                    prev.map(pkg =>
                        pkg.packageId === packageId ? { ...pkg, adminStatus: 'Approved' } : pkg
                    )
                );
            } else {
                alert('Approval failed');
            }
        } catch (err) {
            console.error('Approve error:', err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Tour Review</h2>
            {packages.length === 0 ? (
                <p className="text-center text-gray-500">No pending tours for review.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map(tour => {
                        const isApproved = tour.adminStatus === 'Approved';
                        const firstDateRange = tour.dates?.[0];
                        const { start, end, duration } = parseDatesAndDuration(firstDateRange);

                        return (
                            <div key={tour._id} className="border p-4 rounded shadow">
                                <img src={tour.image?.[0] || '/default-image.jpg'} alt={tour.name} className="w-full h-40 object-cover rounded" />
                                <h3 className="text-xl font-semibold mt-3">{tour.name}</h3>
                                <p>Type: {tour.tourtype || 'N/A'}</p>
                                <p>Price: ${tour.price || 'N/A'}</p>
                                <p>Date: {start ? formatDate(start) : 'N/A'} - {end ? formatDate(end) : 'N/A'}</p>
                                <p>Duration: {duration}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Submitted by: {tour.userName} ({tour.userEmail})
                                </p>
                                <button
                                    onClick={() => handleApprove(tour.packageId, tour.userEmail, tour)}
                                    disabled={isApproved}
                                    className={`mt-4 px-4 py-2 text-white rounded transition ${isApproved
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-800'
                                        }`}
                                >
                                    {isApproved ? 'Approved' : 'Approve & Notify'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TourReview;
