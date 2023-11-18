import React from 'react';
import { MapContainer, TileLayer, SVGOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapViewProps = {
  position: L.LatLngExpression;
  bounds: L.LatLngBoundsExpression;
  data: { tags: Array<{ latitude: number; longitude: number; tag: string }> };
};

const MapView: React.FC<MapViewProps> = ({ data, position, bounds }) => {
  const map = useMap();

  const convertLatLngToLayerPoint = (latLng) => {
    return map.latLngToLayerPoint(latLng);
  };

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        {data.tags.map((tag, index) => {
          const point = convertLatLngToLayerPoint(new L.LatLng(tag.latitude, tag.longitude));
          return (
            <text key={index} x={point.x} y={point.y} stroke="white" textAnchor="middle">
              {tag.tag}
            </text>
          );
        })}
      </SVGOverlay>
    </MapContainer>
  );
};

export default MapView;
