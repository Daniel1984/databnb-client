import { h, Component } from 'preact';
import Settings from '../../components/Settings/Settings';
import styles from './Profile.scss';

export default class Profile extends Component {
  render() {
    return (
      <Settings>
        <h1>profile</h1>
      </Settings>
    );
  }
}
