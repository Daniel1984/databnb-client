import Chart from 'chart.js';

export const CHART_COLORS = [
  'rgb(233, 30, 98)',
  'rgb(33, 149, 242)',
  'rgb(137, 193, 73)',
  'rgb(253, 86, 34)',
  'rgb(102, 58, 182)',
  'rgb(95, 124, 137)',
  'rgb(54, 63, 70)',
  'rgb(119, 84, 70)',
];

export function getHumanizedRatingLabels(ratings) {
  return ratings.map((key) => {
    if (key === 'null') {
      return 'Unrated';
    } else if (key === '1') {
      return `${key} Star`;
    }

    return `${key} Stars`;
  });
}
