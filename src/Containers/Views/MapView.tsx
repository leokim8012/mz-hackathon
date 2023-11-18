import MapText from '@/Components/Map/MapText/MapText';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { FeatureCollection, Polygon } from 'geojson';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbTgwMTIiLCJhIjoiY2xwM3dqeGwxMTRtcjJpbWozYnNjMXZrYSJ9.Uwtluj_0DzSgfQ-ObQeAIw'; // Replace with your Mapbox access token
type MapData = {
  tags: Array<{ latitude: number; longitude: number; tag: string; votes: number }>;
  oneDecimalLessAllUsersPaths: Array<{ latitude: string; longitude: string; category: string }>;
};
type MapViewProps = {
  data: MapData;
};

const createRectangleGeoJSON = (data: MapData['oneDecimalLessAllUsersPaths']): FeatureCollection<Polygon> => {
  const offset = 0.0025; // Adjust this value for rectangle size
  return {
    type: 'FeatureCollection',
    features: data.map((item) => {
      const lat = parseFloat(item.latitude);
      const lng = parseFloat(item.longitude);
      return {
        type: 'Feature',
        properties: {
          category: item.category,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [lng - offset, lat - offset],
              [lng + offset, lat - offset],
              [lng + offset, lat + offset],
              [lng - offset, lat + offset],
              [lng - offset, lat - offset], // Close the polygon
            ],
          ],
        },
      };
    }),
  };
};

const MapView: FC<MapViewProps> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Type annotation added here

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-121.9529723, 37.3536691],
      zoom: 13,
    });

    const removeMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };

    const addMarkers = (zoomLevel: number) => {
      removeMarkers();

      markersRef.current = data.tags
        .filter((tag) => tag.votes >= calculateVoteThreshold(zoomLevel))
        .map((tag) => {
          const markerDiv = document.createElement('div');
          const root = createRoot(markerDiv); // Use createRoot here
          root.render(<MapText key={tag.tag} text={tag.tag} votes={tag.votes} randomRotation={true} />);
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

    map.on('load', () => {
      // Create GeoJSON data for rectangles
      const rectanglesGeoJSON = createRectangleGeoJSON(data.oneDecimalLessAllUsersPaths);

      // Add rectangles as a new layer
      map.addLayer({
        id: 'rectangles',
        type: 'fill',
        source: {
          type: 'geojson',
          data: rectanglesGeoJSON,
        },
        layout: {},
        paint: {
          'fill-color': [
            'match',
            ['get', 'category'],
            'rich',
            '#00ff00', // Red for 'rich'
            'suits',
            '#0000ff', // Blue for 'suits'
            'normies',
            '#cccccc', // Green for 'normies'
            '#000', // Default color
          ],
          'fill-opacity': 0.01,
        },
      });
    });

    addMarkers(map.getZoom()); // Initial marker setup

    return () => {
      map.remove();
      removeMarkers();
    };
  }, [data]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapView;
