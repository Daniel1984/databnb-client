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
            name="propertyLink"
            placeholder="Enter property url"
          />
        </FormControl>
        <FormInputError>{errors.propertyLink}</FormInputError>
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
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: ({ onClose }) => ({
    propertyLink: '',
    onClose,
  }),

  validate({ propertyLink }) {
    const errors = {};

    if (!propertyLink) {
      errors.propertyLink = 'Property url is required';
    }

    if (propertyLink) {
      const match = propertyLink.match(/\/rooms\/(\d+)/);

      if (!match || !match[1]) {
        errors.propertyLink = 'Invalid airbnb property url';
      }
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(false);

    try {
      const { onClose, propertyLink } = values;
      onClose();
      await axios.post(`${config.apiUrl}/property`, { propertyLink });
    } catch ({ response: { data } }) {
      setFieldError('propertyLink', data.err);
    }
  },
})(InnerAddNewPropertyForm);
