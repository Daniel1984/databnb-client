import { h } from 'preact';
import styles from './Map.scss';

function Map() {
  return (
    <div class={styles.root}>
      <div class={styles.map} id="map"></div>
    </div>
  );
}

export default Map
