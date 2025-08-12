import React from 'react';

const events = [
    {
        id: 1,
        title: "Pohela Boishakh",
        date: "April 14",
        location: "Dhaka",
        description: "Celebrate Bengali New Year with colorful parades, cultural shows, and traditional foods at Ramna Park."
    },
    {
        id: 2,
        title: "Cox's Bazar Beach Festival",
        date: "December 10-15",
        location: "Cox's Bazar",
        description: "Enjoy beach sports, music concerts, and local seafood along the longest sea beach in the world."
    },
    {
        id: 3,
        title: "Santo Gaur Festival",
        date: "March 5-7",
        location: "Dinajpur",
        description: "Witness colorful rituals and parades honoring Lord Krishna at the famous Kantajew Temple."
    },
    {
        id: 4,
        title: "Lalon Festival",
        date: "October 17-19",
        location: "Kushtia",
        description: "Celebrate the legacy of mystic bard Lalon Shah with folk music and spiritual gatherings at his shrine."
    },
    {
        id: 5,
        title: "Sundarbans Honey Festival",
        date: "May 12-14",
        location: "Khulna",
        description: "Learn about traditional honey collection methods and enjoy local boat rides in the Sundarbans."
    },
    {
        id: 6,
        title: "Rangamati Hill Festival",
        date: "November 20-22",
        location: "Rangamati",
        description: "Experience indigenous culture, hill cuisine, and traditional crafts in the scenic hill district."
    }
];

const LocalEvents = () => {
    return (
        <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-br from-[#87CEEB]/50 to-white shadow-md my-10 rounded-lg max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text- text-center">Local Events & Festivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div
                        key={event.id}
                        className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border-white">
                        <h3 className="text-lg sm:text-xl font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-800 mb-1"><strong>Date:</strong> {event.date}</p>
                        <p className="text-sm text-gray-800 mb-2"><strong>Location:</strong> {event.location}</p>
                        <p className="text-sm text-gray-900">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocalEvents;
