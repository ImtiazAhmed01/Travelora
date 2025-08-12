import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const OfficeMap = () => {
    const dubaiCoords = [25.2048, 55.2708]; // Dubai center

    return (
        <div className="relative z-10 my-10 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                Our Dubai Tourism Office
            </h2>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                <MapContainer
                    center={dubaiCoords}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-[300px] sm:h-[400px] w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={dubaiCoords}>
                        <Popup>
                            Our Tourism Office <br /> Downtown Dubai.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default OfficeMap;
