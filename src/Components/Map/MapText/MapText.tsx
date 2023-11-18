import React, { FC, useEffect } from 'react';
import styles from './MapText.module.scss';
import { useMap } from 'react-leaflet';
import { CustomTextLayer } from '@/Containers/Views/Layer/MapTextLayer';

interface MapTextProps {
  text: string;
}

const MapText = ({ position, text }) => {
  const map = useMap();
  if (!map) throw Error('Need Map Context');

  useEffect(() => {
    const textLayer = new CustomTextLayer(position, text);

    map.addLayer(textLayer);

    return () => {
      map.removeLayer(textLayer);
    };
  }, [map, position, text]);

  return null;
};
export default MapText;
