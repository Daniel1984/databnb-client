import { h } from 'preact';
import styles from './Heading.scss';
import Map from '../Map/Map';
import Dashboard from '../Dashboard/Dashboard';

function Heading({ latlng, listings, updateParentState }) {
  return (
    <div class={styles.root}>
      <div class={styles.mapCol}>
        {!listings.length && (
          <div class={styles.infoContainer}>
            <div class={styles.infoText}>
              <h1 class={styles.header}>META BNB - Free Airbnb Income Calculator</h1>
              <div>Find how much your property could earn on airbnb or any other short term rental platform.</div>
              <br />
              <div>Quickly adopt to market changes by following our recommendations. Increase occupancy and income.</div>
            </div>
          </div>
        )}
        {!!listings.length && (
          <div class={styles.mapContainer}>
            <Map latlng={latlng} listings={listings} />
          </div>
        )}
      </div>
      <div class={styles.controlsCol}>
        <Dashboard listings={listings} updateParentState={state => updateParentState(state)} />
      </div>
    </div>
  );
}

export default Heading;
