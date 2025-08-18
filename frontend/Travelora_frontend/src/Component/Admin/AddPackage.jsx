import React, { useState } from 'react';

const AddPackage = () => {
    const [packageData, setPackageData] = useState({
        name: '',
        duration: '',
        price: '',
        highlights: [''],
        included: [''],
        image: [''],
        tourtype: '',
        tourplan: [''],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleArrayChange = (e, fieldName, index) => {
        const updatedArray = [...packageData[fieldName]];
        updatedArray[index] = e.target.value;
        setPackageData((prevData) => ({ ...prevData, [fieldName]: updatedArray }));
    };

    const addArrayField = (fieldName) => {
        setPackageData((prevData) => ({
            ...prevData,
            [fieldName]: [...prevData[fieldName], ''],
        }));
    };

    const removeArrayField = (fieldName, index) => {
        const updatedArray = [...packageData[fieldName]];
        updatedArray.splice(index, 1);
        setPackageData((prevData) => ({ ...prevData, [fieldName]: updatedArray }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const packageId = Date.now();
        const newPackage = { ...packageData, packageId };

        try {
            const response = await fetch('http://localhost:5000/ourpackages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPackage),
            });

            if (response.ok) {
                alert('Package added successfully!');
                setPackageData({
                    name: '',
                    duration: '',
                    price: '',
                    highlights: [''],
                    included: [''],
                    image: [''],
                    tourtype: '',
                    tourplan: [''],
                });
            } else {
                alert('Failed to add package');
            }
        } catch (error) {
            console.error('Error adding package:', error);
            alert('An error occurred while adding the package.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex m-5">
            <div className="bg-white md:px-10 rounded-lg shadow-lg  w-full p-5">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Add New Package</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={packageData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
                                placeholder="Enter package name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={packageData.duration}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
                                placeholder="Enter duration (e.g., 7 days)"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={packageData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
                                placeholder="Enter price"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Tour Type</label>
                            <input
                                type="text"
                                name="tourtype"
                                value={packageData.tourtype}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
                                placeholder="Enter tour type"
                                required
                            />
                        </div>
                    </div>

                    {['highlights', 'included', 'image', 'tourplan'].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-600 font-medium mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            {packageData[field].map((value, index) => (
                                <div key={index} className="md:flex items-center space-x-3 mb-3">
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleArrayChange(e, field, index)}
                                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
                                        placeholder={`Enter ${field.slice(0, -1)}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField(field, index)}
                                        className="bg-[#52C960] text-white rounded-lg px-4 py-2 hover:bg-[#52C960]"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayField(field)}
                                className="bg-[#87CEEB]/70 text-white rounded-lg px-4 py-2 hover:bg-[#87CEEB]"
                            >
                                Add more field
                            </button>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-[#87CEEB] text-white rounded-lg px-5 py-3 font-medium"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
