import React, { Component } from 'react';
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
          <Card flex>
            <div className={styles.headerRow}>
              <div className={styles.name}>
                {/* {user.emai.split('@')[0]} */}
                daniel.stenger
              </div>
              <Button success>
                Edit
              </Button>
            </div>
          </Card>
        )}
      </Settings>
    );
  }
}
