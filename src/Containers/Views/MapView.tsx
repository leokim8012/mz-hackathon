import React from 'react';
import { MapContainer, TileLayer, SVGOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapViewProps = {
  position: L.LatLngExpression;
  bounds: L.LatLngBoundsExpression;
};

const MapView: React.FC<MapViewProps> = ({ position, bounds }) => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" stroke="white" textAnchor="middle">
          Text
        </text>
      </SVGOverlay>
    </MapContainer>
  );
};

export default MapView;
