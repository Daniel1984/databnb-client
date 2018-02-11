import { h, Component } from 'preact';
import getGravatarUrl from 'gravatar-url';
import styles from './Gravatar.scss';

export default class Gravatar extends Component {
  componentDidMount() {
    this.getGrvatarImage(this.props);
  }

  componentWillReceiveProps(props) {
    this.getGrvatarImage(props);
  }

  getGrvatarImage({ email, size = 200 }) {
    const gravatarUrl = getGravatarUrl(email, { size });
    this.setState({ gravatarUrl });
  }

  render() {
    const { gravatarUrl } = this.state;
    return (
      <div class={styles.logo} style={{ backgroundImage: `url(${gravatarUrl})` }} />
    )
  }
}
