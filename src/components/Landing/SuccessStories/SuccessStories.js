import React from 'react';
import styles from './SuccessStories.scss';

export default function SuccessStories() {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        Who is Metabnb for?
      </div>
      <div className={styles.info}>
        Metabnb is designed to help hosts with keeping their properties occupied 100% of time and increase their income
      </div>

      <div className={styles.storyContainer}>
        <div className={styles.avatar}>
          <div className={styles.avatarImage} />
          <div className={styles.avatarName}>Alex</div>
        </div>
        <div className={styles.storyInfo}>
          <div>
            <div className={styles.storyBlock}>
              <div className={styles.storyLabel}>Property:</div>
              <div className={styles.storyValue}>1 bedroom, Vilnius</div>
            </div>

            <div className={styles.storyBlock}>
              <div className={styles.storyLabel}>Occupancy increase:</div>
              <div className={styles.storyValue}>25%</div>
            </div>

            <div className={styles.storyBlock}>
              <div className={styles.storyLabel}>Income increase:</div>
              <div className={styles.storyValue}>17.5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
