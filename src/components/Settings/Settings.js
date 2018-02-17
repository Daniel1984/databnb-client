import { h, Component } from 'preact';
import RedirectUnauthenticated from '../../components/RedirectUnauthenticated/RedirectUnauthenticated';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import { SettingsPageContainer } from '../../components/common';
import fetch from '../../shared/fetch';
import config from '../../../config';
import styles from './Settings.scss';

export default class Settings extends RedirectUnauthenticated {
  state = {
    user: null
  };

  componentDidMount() {
    fetch(`${config.apiUrl}/me`)
      .then(user => this.setState({ user }))
      .catch(() => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;

    return (
      <SettingsPageContainer title="Metabnb Account Settings">
        <Navbar backTo="/" title="Settings" />
        {!!user && (
          <div class={styles.contentWrapper}>
            <div class={styles.menu}>
              <SettingsMenu user={user} />
            </div>
            <div class={styles.content}>
              {this.props.children}
            </div>
          </div>
        )}
        <Footer />
      </SettingsPageContainer>
    )
  }
}
