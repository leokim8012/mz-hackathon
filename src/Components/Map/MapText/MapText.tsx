import React, { FC, useMemo } from 'react';
import styles from './MapText.module.scss';

interface MapTextProps {
  text: string;
  votes?: number;
  randomRotation?: boolean;
}

const MapText: FC<MapTextProps> = ({ text, votes = 0, randomRotation = false }) => {
  // Use useMemo to ensure the rotation value is consistent during re-renders of this instance
  const rotation = useMemo(() => {
    if (randomRotation) {
      // Generate a random rotation between -120 and 120 degrees
      return Math.random() * 90 - 45;
    }
    return 0;
  }, [randomRotation]);

  const style = {
    fontSize: `calc(var(--font-size-4) + ${votes}px)`,
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <span className={styles.map_text} style={style}>
      {text}
    </span>
  );
};

export default MapText;
