import { h } from 'preact';

function Heading() {
  return (
    <div class="app_heading">
      <div class="app_heading-backdrop"></div>
      <div class="app_heading-content">
        <h1 class="app_title">META BNB</h1><br />
        <h2 class="app_sub-title">Most efficient airbnb rental price optimiser</h2>
      </div>
    </div>
  );
}

export default Heading;
