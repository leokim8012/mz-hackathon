import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbTgwMTIiLCJhIjoiY2xwM3dqeGwxMTRtcjJpbWozYnNjMXZrYSJ9.Uwtluj_0DzSgfQ-ObQeAIw'; // Replace with your Mapbox access token

const MapView = ({ data, center }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style URL
      center: [-121.8863286, 37.3382082], // Initial map center coordinates
      zoom: 13,
    });

    data.tags.forEach((tag) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.color = 'blue'; // Text color
      el.innerText = tag.tag; // Text to display

      new mapboxgl.Marker(el).setLngLat([tag.longitude, tag.latitude]).addTo(map);
    });

    return () => map.remove();
  }, [data]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapView;
