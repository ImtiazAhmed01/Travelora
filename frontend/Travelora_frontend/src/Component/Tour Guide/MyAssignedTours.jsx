// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../Provider/authProvider";

// const MyAssignedTours = () => {
//     const { user } = useContext(AuthContext)
//     const [assignedTours, setAssignedTours] = useState([]);

//     const fetchAssignedTours = async () => {
//         try {
//             // Validate if `user.displayName` or `userName` exists
//             if (!user || !user.displayName) {
//                 throw new Error("Logged-in user's name is not available.");
//             }

//             console.log("Fetching tours for guide:", user.displayName); // Debug log

//             const response = await axios.get("http://localhost:5000/bookings/byguide", {
//                 params: { guideName: user.displayName }, // Use `user.displayName`
//             });

//             console.log("Fetched tours data:", response.data); // Debug log
//             setAssignedTours(response.data);
//         } catch (error) {
//             console.error("Error fetching assigned tours:", error.message);
//         }
//     };

//     useEffect(() => {
//         fetchAssignedTours();
//     }, []);




//     useEffect(() => {
//         fetchAssignedTours();
//     }, []);

//     // Handle status change
//     const handleStatusChange = async (packageId, status) => {
//         try {
//             const response = await axios.patch(`http://localhost:5000/bookings/${packageId}`, { status });
//             if (response.status === 200) {
//                 Swal.fire({
//                     icon: "success",
//                     title: `Status updated to ${status}`,
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//                 fetchAssignedTours(); // Refresh the assigned tours
//             }
//         } catch (error) {
//             console.error(`Error updating status to ${status}:`, error.message);
//             Swal.fire({
//                 icon: "error",
//                 title: "Action failed",
//                 text: error.response?.data?.message || "An error occurred",
//             });
//         }
//     };

//     // Handle Reject Confirmation
//     const handleReject = (packageId) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to undo this action!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, reject it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 handleStatusChange(packageId, "Rejected");
//             }
//         });
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">My Assigned Tours</h1>
//             <div className="overflow-x-auto">
//                 <table className="table-auto w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="border border-gray-300 px-4 py-2">Package Name</th>
//                             <th className="border border-gray-300 px-4 py-2">Tourist Name</th>
//                             <th className="border border-gray-300 px-4 py-2">Tour Date</th>
//                             <th className="border border-gray-300 px-4 py-2">Price</th>
//                             <th className="border border-gray-300 px-4 py-2">Status</th>
//                             <th className="border border-gray-300 px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {assignedTours.map((tour) => (
//                             <tr key={tour.packageId}>
//                                 <td className="border border-gray-300 px-4 py-2">{tour.packageName}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{tour.touristName}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{tour.tourDate}</td>
//                                 <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{tour.status}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     <button
//                                         className="btn btn-success mr-2"
//                                         disabled={tour.status !== "In Review"}
//                                         onClick={() => handleStatusChange(tour.packageId, "Accepted")}
//                                     >
//                                         Accept
//                                     </button>
//                                     {tour.status === "In Review" && (
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => handleReject(tour.packageId)}
//                                         >
//                                             Reject
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default MyAssignedTours;


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/authProvider";

const MyAssignedTours = () => {
    const { user } = useContext(AuthContext);
    const [assignedTours, setAssignedTours] = useState([]);

    const fetchAssignedTours = async () => {
        try {
            // Validate if `user.displayName` or `userName` exists
            if (!user || !user.displayName) {
                throw new Error("Logged-in user's name is not available.");
            }

            console.log("Fetching tours for guide:", user.displayName); // Debug log

            const response = await axios.get("http://localhost:5000/bookings/byguide", {
                params: { guideName: user.displayName }, // Use `user.displayName`
            });

            console.log("Fetched tours data:", response.data); // Debug log
            setAssignedTours(response.data);
        } catch (error) {
            console.error("Error fetching assigned tours:", error.message);
        }
    };

    useEffect(() => {
        fetchAssignedTours();
    }, []);

    // Handle status change
    const handleStatusChange = async (packageId, status) => {
        try {
            const response = await axios.patch(`http://localhost:5000/bookings/${packageId}`, { status });
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: `Status updated to ${status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchAssignedTours(); // Refresh the assigned tours
            }
        } catch (error) {
            console.error(`Error updating status to ${status}:`, error.message);
            Swal.fire({
                icon: "error",
                title: "Action failed",
                text: error.response?.data?.message || "An error occurred",
            });
        }
    };

    // Handle Reject Confirmation
    const handleReject = (packageId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusChange(packageId, "Rejected");
            }
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">My Assigned Tours</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-sm lg:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Package Name</th>
                            <th className="border border-gray-300 px-4 py-2">Tourist Name</th>
                            <th className="border border-gray-300 px-4 py-2">Tour Date</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.map((tour) => (
                            <tr key={tour.packageId} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{tour.packageName}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.touristName}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.tourDate}</td>
                                <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-[#87CEEB]/70 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                                        disabled={tour.status !== "In Review"}
                                        onClick={() => handleStatusChange(tour.packageId, "Accepted")}
                                    >
                                        Accept
                                    </button>
                                    {tour.status === "In Review" && (
                                        <button
                                            className="bg-[#52C960] text-white px-3 py-1 rounded"
                                            onClick={() => handleReject(tour.packageId)}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTours;
