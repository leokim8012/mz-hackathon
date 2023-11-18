import MapText from '@/Components/Map/MapText/MapText';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbTgwMTIiLCJhIjoiY2xwM3dqeGwxMTRtcjJpbWozYnNjMXZrYSJ9.Uwtluj_0DzSgfQ-ObQeAIw'; // Replace with your Mapbox access token

type MapViewProps = {
  data: { tags: Array<{ latitude: number; longitude: number; tag: string; votes: number }> };
};

const MapView: FC<MapViewProps> = ({ data }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style URL
      center: [-121.8863286, 37.3382082], // Initial map center coordinates
      zoom: 13,
    });

    const result = data.tags.filter((thing, index, self) => index === self.findIndex((t) => t.tag == thing.tag));

    result.forEach((tag) => {
      const markerDiv = document.createElement('div');

      ReactDOM.render(<MapText key={tag.tag} text={tag.tag} votes={tag.votes} randomRotation={true} />, markerDiv);

      new mapboxgl.Marker(markerDiv).setLngLat([tag.longitude, tag.latitude]).addTo(map);
    });

    return () => map.remove();
  }, [data]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapView;
