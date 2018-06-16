import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InfoBox } from '../../../components/common';
import { withPropertiesContainer } from '../../../containers/Properties';
import styles from './RemoveProperty.scss';

class RemoveProperty extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isDeletingProperty: PropTypes.bool.isRequired,
    errorDeletingProperty: PropTypes.string.isRequired,
    loadUserProperties: PropTypes.func.isRequired,
    deleteUserProperty: PropTypes.func.isRequired,
    property: PropTypes.shape({
      propertyName: PropTypes.string,
    }).isRequired,
  };

  deleteProperty = async () => {
    const {
      closeModal,
      deleteUserProperty,
      loadUserProperties,
      property: { _id },
    } = this.props;
    await deleteUserProperty(_id);
    await loadUserProperties();
    closeModal();
  }

  render() {
    const {
      property: { name },
      closeModal,
      errorDeletingProperty,
      isDeletingProperty,
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.title}>
          Remove property
        </div>

        {errorDeletingProperty ? (
          <InfoBox>{errorDeletingProperty}</InfoBox>
        ) : (
          <div className={styles.content}>
            <div className={styles.question}>
              Are you sure you want to remove:
              <div className={styles.propertyName}>{name}?</div>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <Button onClick={closeModal}>
            Cancel
          </Button>
          <Button kind="danger" onClick={this.deleteProperty}>
            {isDeletingProperty ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    );
  }
}

export default withPropertiesContainer(RemoveProperty);
