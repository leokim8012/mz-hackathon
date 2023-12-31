import React, { FC, useMemo } from 'react';
import styles from './MapText.module.scss';
import { Flex, IconButton } from '@woozdesign/ui';
import { Icon } from '@woozdesign/icons';

interface MapTextProps {
  text: string;

  size?: number;
  votes?: number;
  randomRotation?: boolean;
}

const MapText: FC<MapTextProps> = ({ text, size = 4, votes = 0, randomRotation = false }) => {
  // Use useMemo to ensure the rotation value is consistent during re-renders of this instance
  const rotation = useMemo(() => {
    if (randomRotation) {
      // Generate a random rotation between -120 and 120 degrees
      return Math.random() * 90 - 45;
    }
    return 0;
  }, [randomRotation]);

  const style = {
    fontSize: `min(calc(var(--font-size-${size}) + ${votes}px), var(--font-size-12))`,
  };
  const wrapperStyle = {
    transform: `translate(-50%, -50%) rotate(${rotation}deg) `,
  };

  return (
    <div className={styles.container}>
      <div style={wrapperStyle}>
        <span className={styles.map_text} style={style}>
          {text}
        </span>
      </div>
      <div className={styles.rate}>
        <Flex>
          <IconButton highContrast>
            <Icon type={'ThumbsUp'} />
          </IconButton>
          <IconButton highContrast>
            <Icon type={'ThumbsDown'} />
          </IconButton>
        </Flex>
      </div>
    </div>
  );
};

export default MapText;
