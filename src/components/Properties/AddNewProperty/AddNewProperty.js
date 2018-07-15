import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import {
  Input,
  Button,
  FormControl,
  FormInputError,
} from '../../../components/common';
import axios from '../../../shared/axios';
import config from '../../../../config';
import styles from './AddNewProperty.scss';

InnerAddNewPropertyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({
    onClose: PropTypes.func,
  }).isRequired,
};

const propertyIdRegex = /\/rooms\/(\d+)/;
const locationRegex = /location=([^&]*)/;

function InnerAddNewPropertyForm({
  errors,
  handleSubmit,
  isSubmitting,
  values,
}) {
  const hasError = !!Object.keys(errors).length;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Add new property
      </div>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormControl>
          <Input
            thickLines
            type="text"
            name="listingUrl"
            placeholder="Enter property url"
          />
        </FormControl>
        <FormInputError>
          {Object.keys(errors).map(key => (
            <div className={styles.error} key={key}>
              {errors[key]}
            </div>
          ))}
        </FormInputError>
        <div className={styles.footer}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              values.onClose();
            }}
          >
            Cancel
          </Button>
          <Button disabled={hasError || isSubmitting} kind="success" type="submit">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: ({ onClose, onAddPropertySuccess }) => ({
    listingUrl: '',
    onClose,
    onAddPropertySuccess,
  }),

  validate({ listingUrl }) {
    const errors = {};

    if (!listingUrl) {
      errors.general = 'Property url is required';
    }

    if (listingUrl) {
      const propertyIdMatch = listingUrl.match(propertyIdRegex);
      const locationMatch = listingUrl.match(locationRegex);

      if (!propertyIdMatch || !propertyIdMatch[1]) {
        errors.listingId = 'Invalid property id. Please check url';
      }

      if (!locationMatch || !locationMatch[1]) {
        errors.location = 'Invalid location. Please check url';
      }
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);

    try {
      const { onAddPropertySuccess, listingUrl } = values;
      const propertyId = listingUrl.match(propertyIdRegex)[1];
      const location = listingUrl.match(locationRegex)[1];

      await axios.post(`${config.apiUrl}/properties`, {
        propertyId,
        location: decodeURIComponent(location),
      });
      onAddPropertySuccess();
    } catch ({ response: { data } }) {
      setSubmitting(false);
      setFieldError('propertyId', data.err);
    }
  },
})(InnerAddNewPropertyForm);
