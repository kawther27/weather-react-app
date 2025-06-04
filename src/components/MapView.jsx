// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ lat = 45.4765, lon = -75.7013 }) => (
  <div className="h-[100px] w-full rounded-xl overflow-hidden shadow-lg">
  <MapContainer
    center={[lat, lon]}
    zoom={10}
    style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }} 
    scrollWheelZoom={false}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[lat, lon]}>
      <Popup>You are here!</Popup>
    </Marker>
  </MapContainer>
  </div>
);

export default MapView;
