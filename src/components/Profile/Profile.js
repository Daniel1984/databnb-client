import React, { Component } from 'react';
import format from 'date-fns/format';
import Settings from '../../components/Settings/Settings';
import { Card, Button } from '../../components/common';
import styles from './Profile.scss';

export default class Profile extends Component {
  render() {
    const { user } = this.props;
    console.log(user)
    return (
      <Settings user={user}>
        {!!user && (
          <div>
            <div className={styles.card}>
              <Card flex>
                <div className={styles.headerRow}>
                  <div className={styles.title}>
                    {user.email.split('@')[0]}
                  </div>
                  <Button success>
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
                  <Button>
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
