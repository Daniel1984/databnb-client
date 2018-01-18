import { h } from 'preact';
import styles from './SuccessStories.scss'

export default function SuccessStories() {
  return (
    <div class={styles.root}>
      <div class={styles.heading}>
        Who is Metabnb for?
      </div>
      <div class={styles.info}>
        Metabnb is designed to help hosts with keeping their properties occupied 100% of time and increase their income
      </div>

      <div class={styles.storyContainer}>
        <div class={styles.avatar}>
          <div class={styles.avatarImage} />
          <div class={styles.avatarName}>Alex</div>
        </div>
        <div class={styles.storyInfo}>
          <div>
            <div class={styles.storyBlock}>
              <div class={styles.storyLabel}>Property:</div>
              <div class={styles.storyValue}>1 bedroom, Vilnius</div>
            </div>

            <div class={styles.storyBlock}>
              <div class={styles.storyLabel}>Occupancy increase:</div>
              <div class={styles.storyValue}>25%</div>
            </div>

            <div class={styles.storyBlock}>
              <div class={styles.storyLabel}>Income increase:</div>
              <div class={styles.storyValue}>37.5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
