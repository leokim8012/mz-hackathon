import MapText from '@/Components/Map/MapText/MapText';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { FeatureCollection, Polygon } from 'geojson';
import { MapData } from './MapView';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN;
export type PepperMapData = {
  tags: Array<{ latitude: number; longitude: number; tag: string; votes: number }>;
};
type PepperMapViewProps = {
  data: MapData;
};

const PepperMapView: FC<PepperMapViewProps> = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Type annotation added here

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/william8012/clp473s7c00cl01rcfodl1rdl',
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
        .filter((thing, index, self) => index === self.findIndex((t) => t.tag == thing.tag))
        .map((tag) => {
          const markerDiv = document.createElement('div');
          const root = createRoot(markerDiv); // Use createRoot here

          root.render(<MapText size={8} key={tag.tag} text={'🌶️'.repeat(tag.votes)} votes={tag.votes} randomRotation={true} />);
          return new mapboxgl.Marker(markerDiv).setLngLat([tag.longitude, tag.latitude]).addTo(map);
        });
    };

    const calculateVoteThreshold = (zoomLevel: number) => {
      // Define the logic to determine the vote threshold based on zoom level
      return 0;
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

export default PepperMapView;
