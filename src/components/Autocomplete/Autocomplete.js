import { h, Component } from 'preact';
import places from 'places.js';

export default class Autocomplete extends Component {
  componentDidMount() {
    places({
      container: this.placesEl,
      type: 'address'
    }).on('change', (e) => {
      const { latlng, city } = e.suggestion;
      this.props.updateParentState({ latlng, city });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <input
        id="address"
        ref={el => this.placesEl = el}
        class={this.props.styles}
        placeholder="Type in your address"
      />
    )
  }
}
