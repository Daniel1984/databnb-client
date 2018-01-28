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
              <div class={styles.header}>META BNB</div>
              <div>Find how much you could earn with your property on airbnb or any other short term rental platform.</div>
              <br />
              <div>Quickly adopt to market changes by following our recommendations, increase your occupancy and income.</div>
            </div>
          </div>
        )}
        {!!listings.length && (
          <Map latlng={latlng} listings={listings} />
        )}
      </div>
      <div class={styles.controlsCol}>
        <Dashboard listings={listings} updateParentState={state => updateParentState(state)} />
      </div>
    </div>
  );
}

export default Heading;
