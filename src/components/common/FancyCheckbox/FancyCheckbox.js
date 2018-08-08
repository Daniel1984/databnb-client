import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './FancyCheckbox.scss';

export default class FancyCheckbox extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    htmlFor: PropTypes.string,
    vertical: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    label: '',
    htmlFor: '',
    vertical: false,
  };

  render() {
    const {
      label,
      vertical,
      htmlFor,
      onChange,
    } = this.props;

    return (
      <div className={classnames(styles.root, vertical && styles.vertical)}>
        {label && (
          <div className={styles.label}>
            {label}
          </div>
        )}
        <label htmlFor={htmlFor} className={styles.switch}>
          <input
            id={htmlFor}
            type="checkbox"
            className={styles.checkbox}
            onChange={onChange}
          />
          <span className={styles.slider} />
        </label>
      </div>
    );
  }
}
