import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCandidate = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/guideapplications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error.message);
        }
    };


    useEffect(() => {
        fetchApplications();
    }, []);

    const handleAction = async (applicationId, action) => {
        try {
            let payload = { applicationId, action };

            if (action === 'accept') {
                const selectedApp = applications.find((app) => app._id === applicationId);
                payload = {
                    ...payload,
                    guideDetails: {
                        name: selectedApp.name,
                        age: selectedApp.age,
                        gender: selectedApp.gender,
                        languages: selectedApp.languages,
                        experience: selectedApp.experience,
                        speciality: selectedApp.speciality,
                        rating: 0,
                        availability: "Available",
                        img: selectedApp.img, // Ensure img is available in the application object
                        email: selectedApp.email,
                        userRole: "Tour guide",
                    },
                };
            }

            const response = await axios.post('http://localhost:5000/manageApplication', payload);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Update the applications state to reflect changes
                setApplications((prevApplications) =>
                    prevApplications.filter((app) => app._id !== applicationId)
                );
            }
        } catch (error) {
            console.error(`Error performing ${action} action:`, error.message);
            Swal.fire({
                icon: 'error',
                title: 'Action failed',
                text: error.response?.data?.message || 'An error occurred',
            });
        }
    };




    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Manage Candidates</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application._id}>
                                <td
                                    className="border border-gray-300 px-4 py-2 cursor-pointer text-[#87CEEB]"
                                    onClick={() => {
                                        setSelectedApplication(application);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    {application.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{application.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{application.userRole}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="btn btn-success mr-2"
                                        onClick={() => handleAction(application._id, 'accept')}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleAction(application._id, 'reject')}
                                    >
                                        Reject
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {application.status || 'Pending'}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Modal for Viewing Applicant Details */}
            {isModalOpen && selectedApplication && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2 text-black">
                        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
                        <p>
                            <strong>Name:</strong> {selectedApplication.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedApplication.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {selectedApplication.age}
                        </p>
                        <p>
                            <strong>Experience:</strong> {selectedApplication.experience}
                        </p>
                        <p>
                            <strong>Languages:</strong> {selectedApplication.languages.join(', ')}
                        </p>
                        <p>
                            <strong>Speciality:</strong> {selectedApplication.speciality}
                        </p>
                        <p>
                            <strong>Gender:</strong> {selectedApplication.gender}
                        </p>
                        <p>
                            <strong>Reason:</strong> {selectedApplication.reason}
                        </p>
                        <p>
                            <strong>CV Link:</strong>{' '}
                            <a href={selectedApplication.cvLink} target="_blank" rel="noopener noreferrer">
                                View CV
                            </a>
                        </p>
                        <button
                            className="btn bg-[#52C960] text-black mt-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCandidate;
