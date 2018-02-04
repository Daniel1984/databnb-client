import { h } from 'preact';
import RedirectUnauthenticated from '../../components/RedirectUnauthenticated/RedirectUnauthenticated';
import { SettingsPageContainer } from '../../components/common';

export default class Settings extends RedirectUnauthenticated {
  render() {
    return (
      <SettingsPageContainer title="Metabnb Account Settings">
        <div>Settings</div>
      </SettingsPageContainer>
    )
  }
}
