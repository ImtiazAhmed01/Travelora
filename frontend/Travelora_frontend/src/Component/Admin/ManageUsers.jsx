


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// const ManageUsers = () => {
//     const [combinedData, setCombinedData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [search, setSearch] = useState('');
//     const [role, setRole] = useState(null);

//     const roles = [
//         { value: 'User', label: 'User' },
//         { value: 'Tourist', label: 'Tourist' },
//     ];

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [usersResponse, tourGuidesResponse] = await Promise.all([
//                     axios.get('http://localhost:5000/users/all'),
//                     axios.get('http://localhost:5000/tourguides/all'),
//                 ]);

//                 const combined = [
//                     ...(Array.isArray(usersResponse.data) ? usersResponse.data : []).map((user) => ({
//                         ...user,
//                         fullName: user.fullName || user.name,
//                     })),
//                     ...(Array.isArray(tourGuidesResponse.data) ? tourGuidesResponse.data : []).map((guide) => ({
//                         ...guide,
//                         fullName: guide.fullName || guide.name,
//                     })),
//                 ];

//                 setCombinedData(combined);
//                 setFilteredData(combined);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//                 setCombinedData([]);
//                 setFilteredData([]);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const filtered = combinedData.filter((item) => {
//             const matchesSearch =
//                 !search ||
//                 item.fullName.toLowerCase().includes(search.toLowerCase()) ||
//                 item.email.toLowerCase().includes(search.toLowerCase());
//             const matchesRole = !role || item.userRole === role.value;
//             return matchesSearch && matchesRole;
//         });

//         setFilteredData(filtered);
//     }, [search, role, combinedData]);

//     return (
//         <div className="p-4 font-sans max-w-screen-lg mx-auto">
//             <h1 className="text-2xl font-bold text-center mb-6">Manage Users</h1>

//             <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center ml-3">
//                 <input
//                     type="text"
//                     placeholder="Search by name or email"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2"
//                 />
//                 <div className="w-full sm:w-1/3">
//                     <Select
//                         options={roles}
//                         value={role}
//                         onChange={(selectedRole) => setRole(selectedRole)}
//                         placeholder="Filter by role"
//                         isClearable
//                         styles={{
//                             control: (provided) => ({
//                                 ...provided,
//                                 minHeight: '40px',
//                             }),
//                         }}
//                     />
//                 </div>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border  shadow-md">
//                     <thead className="bg-[#87CEEB]/70">
//                         <tr>
//                             <th className="p-3 text-center">#</th>
//                             <th className="p-3 text-center">Name</th>
//                             <th className="p-3 text-center">Email</th>
//                             <th className="p-3 text-center">Role</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.length > 0 ? (
//                             filteredData.map((item, index) => (
//                                 <tr
//                                     key={item._id}
//                                     className={`text-center ${index % 2 === 0 ? '' : ''
//                                         }`}
//                                 >
//                                     <td className="p-3 border border-gray-300">{index + 1}</td>
//                                     <td className="p-3 border border-gray-300">{item.fullName || item.name}</td>
//                                     <td className="p-3 border border-gray-300">{item.email}</td>
//                                     <td className="p-3 border border-gray-300">{item.userRole}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan="4"
//                                     className="p-3 text-center border border-gray-300 font-bold text-gray-500"
//                                 >
//                                     No users found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const ManageUsers = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState(null);

    const roles = [
        { value: 'User', label: 'User' },
        { value: 'Tourist', label: 'Tourist' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tourGuidesResponse] = await Promise.all([
                    axios.get('http://localhost:5000/users/all'),
                    axios.get('http://localhost:5000/tourguides/all'),
                ]);

                const combined = [
                    ...(Array.isArray(usersResponse.data) ? usersResponse.data : []).map((user) => ({
                        ...user,
                        fullName: user.fullName || user.name,
                    })),
                    ...(Array.isArray(tourGuidesResponse.data) ? tourGuidesResponse.data : []).map((guide) => ({
                        ...guide,
                        fullName: guide.fullName || guide.name,
                    })),
                ];

                setCombinedData(combined);
                setFilteredData(combined);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setCombinedData([]);
                setFilteredData([]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = combinedData.filter((item) => {
            const matchesSearch =
                !search ||
                item.fullName.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase());
            const matchesRole = !role || item.userRole === role.value;
            return matchesSearch && matchesRole;
        });

        setFilteredData(filtered);
    }, [search, role, combinedData]);

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:5000/users/delete`, {
                data: { email },
            });
            setCombinedData((prev) => prev.filter((item) => item.email !== email));
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    return (
        <div className="p-4 font-sans max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Manage Users</h1>

            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center ml-3">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2"
                />
                <div className="w-full sm:w-1/3">
                    <Select
                        options={roles}
                        value={role}
                        onChange={(selectedRole) => setRole(selectedRole)}
                        placeholder="Filter by role"
                        isClearable
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: '40px',
                            }),
                        }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border  shadow-md">
                    <thead className="bg-[#87CEEB]/70">
                        <tr>
                            <th className="p-3 text-center">#</th>
                            <th className="p-3 text-center">Name</th>
                            <th className="p-3 text-center">Email</th>
                            <th className="p-3 text-center">Role</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item._id} className="text-center">
                                    <td className="p-3 border border-gray-300">{index + 1}</td>
                                    <td className="p-3 border border-gray-300">{item.fullName}</td>
                                    <td className="p-3 border border-gray-300">{item.email}</td>
                                    <td className="p-3 border border-gray-300">{item.userRole}</td>
                                    <td className="p-3 border border-gray-300">
                                        <button
                                            onClick={() => handleDelete(item.email)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-3 text-center border font-bold text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
