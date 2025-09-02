import React, { useEffect, useState } from 'react';

const AdminState = () => {
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalTourGuides, setTotalTourGuides] = useState(0);
    const [totalPackages, setTotalPackages] = useState(0);
    const [totalClients, setTotalClients] = useState(0);
    const [totalStories, setTotalStories] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = 'http://localhost:5000/admin';
                const paymentRes = await fetch(`${baseUrl}/payments/total`);
                const paymentData = await paymentRes.json();
                setTotalPayment(paymentData.totalPayment || 0);
                const tourGuideRes = await fetch(`${baseUrl}/tourguides/count`);
                const tourGuideData = await tourGuideRes.json();
                setTotalTourGuides(tourGuideData.totalTourGuides || 0);
                const packagesRes = await fetch(`${baseUrl}/packages/count`);
                const packagesData = await packagesRes.json();
                setTotalPackages(packagesData.totalPackages || 0);
                const clientsRes = await fetch(`${baseUrl}/clients/count`);
                const clientsData = await clientsRes.json();
                setTotalClients(clientsData.totalClients || 0);
                const storiesRes = await fetch(`${baseUrl}/stories/count`);
                const storiesData = await storiesRes.json();
                setTotalStories(storiesData.totalStories || 0);
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Statistics of the Company</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-primary text-primary-content shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Total Payment</h2>
                        <p className="text-2xl">${totalPayment.toLocaleString()}</p>
                    </div>
                </div>
                <div className="card bg-secondary text-secondary-content shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Total Tour Guides</h2>
                        <p className="text-2xl">{totalTourGuides}</p>
                    </div>
                </div>
                <div className="card bg-accent text-accent-content shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Total Packages</h2>
                        <p className="text-2xl">{totalPackages}</p>
                    </div>
                </div>
                <div className="card bg-neutral text-neutral-content shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Total Clients</h2>
                        <p className="text-2xl">{totalClients}</p>
                    </div>
                </div>
                <div className="card bg-info text-info-content shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">Total Stories</h2>
                        <p className="text-2xl">{totalStories}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminState;
