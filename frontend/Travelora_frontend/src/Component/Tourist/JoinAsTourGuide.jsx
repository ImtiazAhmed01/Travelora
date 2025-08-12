import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/authProvider";

const JoinAsTourGuide = () => {
    const [applicationData, setApplicationData] = useState({
        title: "",
        reason: "",
        cvLink: "",
    });

    const [additionalData, setAdditionalData] = useState({
        name: "",
        email: "",
        image: "",
        userRole: "",
        age: "",
        experience: "",
        languages: [""],
        speciality: "",
        gender: "",
    });

    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

    const handleApplicationChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdditionalDataChange = (e) => {
        const { name, value } = e.target;
        setAdditionalData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLanguageChange = (index, value) => {
        const updatedLanguages = [...additionalData.languages];
        updatedLanguages[index] = value;
        setAdditionalData((prev) => ({
            ...prev,
            languages: updatedLanguages,
        }));
    };

    const addLanguageField = () => {
        setAdditionalData((prev) => ({
            ...prev,
            languages: [...prev.languages, ""],
        }));
    };

    const removeLanguageField = (index) => {
        const updatedLanguages = additionalData.languages.filter((_, i) => i !== index);
        setAdditionalData((prev) => ({
            ...prev,
            languages: updatedLanguages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDetailsModalOpen(true);
    };

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:5000/users?email=${user.email}`);
                    if (!response.ok) throw new Error("Failed to fetch user data");
                    const data = await response.json();
                    setAdditionalData((prev) => ({
                        ...prev,
                        name: data.fullName || "",
                        email: data.email || "",
                        image: data.photoURL || "",
                        userRole: data.userRole || "",
                    }));
                } catch (error) {
                    console.error("Error fetching user data:", error.message);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleFinalSubmit = async () => {
        try {
            if (
                !applicationData.title ||
                !applicationData.reason ||
                !applicationData.cvLink ||
                !additionalData.name ||
                !additionalData.email ||
                !additionalData.userRole ||
                !additionalData.age ||
                !additionalData.speciality ||
                !additionalData.gender
            ) {
                Swal.fire("Error", "Please fill in all required fields.", "error");
                return;
            }

            const transformedData = {
                ...applicationData,
                ...additionalData,
                image: additionalData.image || "https://via.placeholder.com/150",
                experience: additionalData.experience || "0",
            };

            const response = await axios.post(
                "http://localhost:5000/guideapplication",
                transformedData
            );

            Swal.fire("Success", "Your application has been submitted.", "success");
            setDetailsModalOpen(false);

            // Reset form
            setApplicationData({ title: "", reason: "", cvLink: "" });
            setAdditionalData({
                name: "",
                email: "",
                image: "",
                userRol: "",
                age: "",
                experience: "",
                languages: [""],
                speciality: "",
                gender: "",
            });
        } catch (error) {
            console.error("Error submitting application:", error.response?.data || error.message);
            Swal.fire("Error", "Failed to submit application.", "error");
        }
    };

    const showConfirmationDialog = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    handleFinalSubmit();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        icon: "error",
                    });
                }
            });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Join as a Tour Guide</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#87CEEB] p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-white font-medium mb-1">Application Title</label>
                    <input
                        type="text"
                        name="title"
                        value={applicationData.title}
                        onChange={handleApplicationChange}
                        placeholder="Enter application title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium mb-1">Why do you want to be a Tour Guide?</label>
                    <textarea
                        name="reason"
                        value={applicationData.reason}
                        onChange={handleApplicationChange}
                        placeholder="Explain why you want to be a tour guide"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium mb-1">CV Link</label>
                    <input
                        type="url"
                        name="cvLink"
                        value={applicationData.cvLink}
                        onChange={handleApplicationChange}
                        placeholder="Enter CV link"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn bg-[#52C960] text-black">
                        Submit Application
                    </button>
                </div>
            </form>

            {isDetailsModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md max-h-screen p-6 rounded-lg shadow-lg text-center overflow-hidden">
                        <h2 className="text-xl font-bold mb-4">Complete Your Application</h2>
                        <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                            <input
                                type="text"
                                name="name"
                                value={additionalData.name}
                                onChange={handleAdditionalDataChange}
                                placeholder="Name"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={additionalData.email}
                                onChange={handleAdditionalDataChange}
                                placeholder="Email"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={additionalData.userRole}
                                onChange={handleAdditionalDataChange}
                                placeholder="Email"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="url"
                                name="image"
                                value={additionalData.image}
                                onChange={handleAdditionalDataChange}
                                placeholder="Image Link"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                value={additionalData.age}
                                onChange={handleAdditionalDataChange}
                                placeholder="Age"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                name="experience"
                                value={additionalData.experience}
                                onChange={handleAdditionalDataChange}
                                placeholder="Experience (if any) in years, 0 for none"
                                className="input input-bordered w-full"
                            />
                            <div>
                                <label className="block mb-1">Languages</label>
                                {additionalData.languages.map((lang, index) => (
                                    <div key={index} className="flex space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={lang}
                                            onChange={(e) => handleLanguageChange(index, e.target.value)}
                                            placeholder="Language"
                                            className="input input-bordered w-full"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLanguageField(index)}
                                                className="btn bg-[#52C960]"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addLanguageField}
                                    className="btn bg-[#87CEEB]"
                                >
                                    Add Language
                                </button>
                            </div>
                            <input
                                type="text"
                                name="speciality"
                                value={additionalData.speciality}
                                onChange={handleAdditionalDataChange}
                                placeholder="Speciality"
                                className="input input-bordered w-full"
                                required
                            />
                            <select
                                name="gender"
                                value={additionalData.gender}
                                onChange={handleAdditionalDataChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-x-4 mt-4">
                            <button onClick={showConfirmationDialog} className="btn bg-[#87CEEB]">
                                Submit
                            </button>
                            <button
                                onClick={() => setDetailsModalOpen(false)}
                                className="btn bg-[#52C960]"
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

export default JoinAsTourGuide;
