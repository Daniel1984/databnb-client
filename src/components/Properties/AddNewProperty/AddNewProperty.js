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
            name="propertyId"
            placeholder="Enter property url"
          />
        </FormControl>
        <FormInputError>{errors.propertyId}</FormInputError>
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
    propertyId: '',
    onClose,
    onAddPropertySuccess,
  }),

  validate({ propertyId }) {
    const errors = {};

    if (!propertyId) {
      errors.propertyId = 'Property url is required';
    }

    if (propertyId) {
      const match = propertyId.match(/\/rooms\/(\d+)/);

      if (!match || !match[1]) {
        errors.propertyId = 'Invalid airbnb property url';
      }
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);

    try {
      const { onAddPropertySuccess, propertyId } = values;
      await axios.post(`${config.apiUrl}/property`, { propertyId: propertyId.match(/\/rooms\/(\d+)/)[1] });
      onAddPropertySuccess();
    } catch ({ response: { data } }) {
      setSubmitting(false);
      setFieldError('propertyId', data.err);
    }
  },
})(InnerAddNewPropertyForm);
