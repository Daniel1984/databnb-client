import React, { Component } from 'react';
import format from 'date-fns/format';
import Settings from '../../components/Settings/Settings';
import { Card, Button } from '../../components/common';
import { ConfirmDeactivateProfile, EditProfile } from '../modals';
import styles from './Profile.scss';

export default class Profile extends Component {
  state = {
    confirmDeactivateModalOpened: false,
    editProfileModalOpened: false,
  };

  closeConfirmDeactiveModal = () => {
    this.setState({ confirmDeactivateModalOpened: false })
  }

  openConfirmDeactiveModal = () => {
    this.setState({ confirmDeactivateModalOpened: true })
  }

  closeEditProfileModal = () => {
    this.setState({ editProfileModalOpened: false })
  }

  openEditProfileModal = () => {
    this.setState({ editProfileModalOpened: true })
  }

  render() {
    const { user } = this.props;
    const { confirmDeactivateModalOpened, editProfileModalOpened } = this.state;

    return (
      <Settings user={user}>
        <ConfirmDeactivateProfile
          opened={confirmDeactivateModalOpened}
          onClose={this.closeConfirmDeactiveModal}
        />
        <EditProfile
          user={user}
          opened={editProfileModalOpened}
          onClose={this.closeEditProfileModal}
        />
        {!!user && (
          <div>
            <div className={styles.card}>
              <Card flex>
                <div className={styles.headerRow}>
                  <div className={styles.title}>
                    {user.email.split('@')[0]}
                  </div>
                  <Button success onClick={this.openEditProfileModal}>
                    Edit
                  </Button>
                </div>
                <div className={styles.infoContainer}>
                  <div>{user.email}</div>
                  <div>Member since {format(user.createdAt, 'DD/MMM/YYYY')}</div>
                  <div>Full name: {user.fullName ? user.fullName : 'a/a'}</div>
                  <div>Address: {user.address ? user.address : 'n/a'}</div>
                  <div>Phone number: {user.telephoneNumber ? user.telephoneNumber : 'n/a'}</div>
                  <div>Plan: {user.plan}</div>
                </div>
              </Card>
            </div>
            <div className={styles.card}>
              <Card flex>
                <div className={styles.headerRow}>
                  <div className={styles.title}>
                    Deactivate account
                  </div>
                  <Button onClick={this.openConfirmDeactiveModal} danger>
                    Deactivate account
                  </Button>
                </div>
                <div className={styles.infoContainer}>
                  This will also stop sending you weekly reports
                </div>
              </Card>
            </div>
          </div>
        )}
      </Settings>
    );
  }
}
