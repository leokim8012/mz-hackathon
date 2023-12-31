import MapText from '@/Components/Map/MapText/MapText';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { FeatureCollection, Polygon } from 'geojson';
import UglyCircle from '@/Assets/uglyCircle.svg';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN || ''; // Replace with your Mapbox access token
export type MapData = {
  tags: Array<{ latitude: number; longitude: number; tag: string; votes: number }>;
  areas?: Array<{ latitude: number; longitude: number; tag: string }>;
};
type MapViewProps = {
  data: MapData;
};

const MapView: FC<MapViewProps> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Type annotation added here

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-121.9727064, 37.3524312],
      zoom: 13.75,
    });

    const removeMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };

    const addMarkers = (zoomLevel: number) => {
      removeMarkers();

      markersRef.current = data.tags
        .filter((tag) => tag.votes >= calculateVoteThreshold(zoomLevel))
        .filter((thing, index, self) => index === self.findIndex((t) => t.tag == thing.tag))
        .map((tag) => {
          const markerDiv = document.createElement('div');
          const root = createRoot(markerDiv); // Use createRoot here
          root.render(<MapText key={tag.tag} text={tag.tag} votes={tag.votes} randomRotation={false} />);
          return new mapboxgl.Marker(markerDiv).setLngLat([tag.longitude, tag.latitude]).addTo(map);
        });
    };

    const calculateVoteThreshold = (zoomLevel: number) => {
      // Define the logic to determine the vote threshold based on zoom level

      if (zoomLevel > 12.5) {
        return 0;
      } else if (zoomLevel > 12) {
        return 5;
      } else if (zoomLevel > 11.5) {
        return 10;
      } else if (zoomLevel > 11) {
        return 15;
      } else {
        return 30;
      }
    };

    map.on('zoom', () => addMarkers(map.getZoom()));

    addMarkers(map.getZoom()); // Initial marker setup

    return () => {
      map.remove();
      removeMarkers();
    };
  }, [data]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapView;
