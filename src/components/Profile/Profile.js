import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Modal from 'react-responsive-modal';
import { Card, Button } from '../../components/common';
import { ConfirmDeactivateProfile, EditProfile } from '../modals';
import { withAuthContainer } from '../../containers/Auth';
import styles from './Profile.scss';

export class Profile extends Component {
  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      createdAt: PropTypes.string,
      fullName: PropTypes.string,
      address: PropTypes.string,
      telephoneNumber: PropTypes.string,
      plan: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null,
  };

  state = {
    confirmDeactivateModalOpened: false,
    editProfileModalOpened: false,
  };

  toggleConfirmDeactiveModal = () => {
    this.setState({ confirmDeactivateModalOpened: !this.state.confirmDeactivateModalOpened });
  }

  toggleEditProfileModal = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ editProfileModalOpened: !this.state.editProfileModalOpened });
  }

  render() {
    const { user, getProfile } = this.props;
    const { confirmDeactivateModalOpened, editProfileModalOpened } = this.state;

    return user ? (
      <Fragment>
        <Modal open={confirmDeactivateModalOpened} onClose={this.toggleConfirmDeactiveModal} little>
          <ConfirmDeactivateProfile
            opened={confirmDeactivateModalOpened}
            onClose={this.toggleConfirmDeactiveModal}
          />
        </Modal>

        <Modal open={editProfileModalOpened} onClose={this.toggleEditProfileModal} little>
          <EditProfile
            user={user}
            closeEditProfileModal={this.toggleEditProfileModal}
            fetchProfileDetaild={getProfile}
          />
        </Modal>
        <div className={styles.card}>
          <Card flex>
            <div className={styles.headerRow}>
              <div className={styles.title}>
                {user.email.split('@')[0]}
              </div>
              <Button kind="success" onClick={this.toggleEditProfileModal}>
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
              <Button onClick={this.toggleConfirmDeactiveModal} kind="danger">
                Deactivate account
              </Button>
            </div>
            <div className={styles.infoContainer}>
              This will also stop sending you weekly reports
            </div>
          </Card>
        </div>
      </Fragment>
    ) : null;
  }
}

export default withAuthContainer(Profile);
