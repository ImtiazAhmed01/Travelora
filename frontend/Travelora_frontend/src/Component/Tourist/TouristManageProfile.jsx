

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
// import AdminState from '../Admin/AdminState';
// import Overstate from '../Overstate/Overstate';

const TouristManageProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:5000/users?email=${user.email}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = () => {
        if (!userData?.email) {
            alert('User data not loaded. Please try again.');
            return;
        }

        const updatedData = {
            email: userData.email.trim().toLowerCase(),
            userRole: userData.userRole,
            ...editedUser,
        };

        fetch('http://localhost:5000/update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || 'Failed to update user data');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
                setEditModalOpen(false);
                setEditedUser({});
                alert('Profile updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating user data:', error.message);
                alert(`Error: ${error.message}`);
            });
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="p-6">
            <div className="text-center font-sans">
                <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
                    Welcome to the Travelora,{' '}
                    <span className="font-semibold">{userData ? userData.fullName : 'Loading...'}</span>!
                </h1>

                <div className="lg:flex justify-center items-center mt-8">
                    <img
                        src={userData?.photoURL || 'https://via.placeholder.com/150'}
                        alt="User profile"
                        className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
                    />
                    <div className="text-left ">
                        <p><strong>Name:</strong> {userData?.fullName || 'N/A'}</p>
                        <p><strong>Role:</strong> {userData?.userRole || 'Tourist'}</p>
                        <p><strong>Joined:</strong> {userData?.registrationDate || 'N/A'}</p>
                        <p><strong>Email:</strong> {userData?.email || 'N/A'}</p>
                        <p><strong>Age:</strong> {userData?.age || 'N/A'}</p>
                        <p><strong>Address:</strong> {userData?.address || 'N/A'}</p>
                        <p><strong>Phone:</strong> {userData?.phone || 'N/A'}</p>
                        {userData?.userRole === 'Tour guide' && (
                            <p><strong>Availability:</strong> {userData?.availability || 'Available'}</p>
                        )}
                        {userData?.userRole === 'Tourist' && (
                            <p><strong>Preferred Destination:</strong> {userData?.preferredDestination || 'N/A'}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <button className="btn btn-primary mr-4" onClick={() => setEditModalOpen(true)}>
                        Edit Profile
                    </button>
                    {userData?.userRole !== 'Admin' && userData?.userRole !== 'Tour guide' && (
                        <button
                            className="btn btn-success"
                            onClick={() => navigate('/dashboard/tourist/joinguide')}
                        >
                            Apply For Tour Guide
                        </button>
                    )}
                </div>
            </div>

            {/* {userData?.userRole !== 'Tourist' && userData?.userRole !== 'Tour guide' && <AdminState />} */}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-20">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-center text-lg font-bold mb-4">Edit Profile</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUser.firstName ?? userData?.firstName ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUser.lastName ?? userData?.lastName ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Role</label>
                                <input
                                    type="text"
                                    name="userRole"
                                    value={userData?.userRole}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={userData?.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={editedUser.photoURL ?? userData?.photoURL ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={editedUser.age ?? userData?.age ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editedUser.address ?? userData?.address ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUser.phone ?? userData?.phone ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {userData?.userRole === 'Tour guide' && (
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Availability</label>
                                    <select
                                        name="availability"
                                        value={editedUser.availability ?? userData?.availability ?? 'Available'}
                                        onChange={handleEditChange}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Booked">Booked</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Preferred Destination (Country)</label>
                                <input
                                    type="text"
                                    name="preferredDestination"
                                    value={editedUser.preferredDestination ?? userData?.preferredDestination ?? ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <button type="button" className="btn btn-success" onClick={handleEditSave}>
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => {
                                        setEditModalOpen(false);
                                        setEditedUser({});
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div>
                {/* <Overstate /> */}
            </div>
        </div>
    );
};

export default TouristManageProfile;
