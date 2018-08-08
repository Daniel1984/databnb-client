import React, { PureComponent } from 'react';
import LineChart from '../LineChart/LineChart';

export default class ListingsGrowthChart extends PureComponent {
  state = {};

  componentDidMount() {
    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ listings }) {
    const listingsPerYear = listings.reduce((acc, { listing_start_date }) => {
      if (!listing_start_date) {
        return acc;
      }

      const year = listing_start_date.substring(0, 4);
      acc[year] = acc[year] ? (acc[year] + 1) : 1;
      return acc;
    }, {});

    const labels = Object.keys(listingsPerYear);
    const dataset = labels.map(label => listingsPerYear[label]);
    this.setState({ labels, dataset });
  }

  render() {
    const { labels = [], dataset = [] } = this.state;

    return (
      <LineChart
        labels={labels}
        data={dataset}
        label="Listings growth per year"
      />
    );
  }
}
