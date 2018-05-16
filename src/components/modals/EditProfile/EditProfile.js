import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import pick from 'lodash/fp/pick';
import flow from 'lodash/fp/flow';
import { Button, Input, FormControl, FormInputError } from '../../common';
import axios from '../../../shared/axios';
import config from '../../../../config';
import styles from './EditProfile.scss';

ProfileEditForm.propTypes = {
  values: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string,
    address: PropTypes.string,
    fullName: PropTypes.string,
    telephoneNumber: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

ProfileEditForm.defaultProps = {
  values: {
    email: '',
    address: '',
    fullName: '',
    telephoneNumber: '',
  },
};

function ProfileEditForm({
  values,
  handleSubmit,
  isSubmitting,
  errors,
}) {
  const hasError = !!Object.keys(errors).length;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Edit profile
      </div>
      <Form onSubmit={handleSubmit}>
        <FormControl vertical htmlFor="email">
          <Input
            id="email"
            thickLines
            name="email"
            type="email"
            placeholder="Email Address"
          />
        </FormControl>
        <FormControl label="Full name:" vertical>
          <Input
            thickLines
            name="fullName"
            type="text"
            placeholder="Full name"
          />
        </FormControl>
        <FormControl label="Address:" vertical>
          <Input
            thickLines
            name="address"
            type="text"
            placeholder="Address"
          />
        </FormControl>
        <FormControl label="Phone number:" vertical>
          <Input
            thickLines
            name="telephoneNumber"
            type="phone"
            placeholder="Phone number"
          />
        </FormControl>
        <FormInputError>{errors.error}</FormInputError>
        <div className={styles.footer}>
          <Button onClick={values.onClose}>
            Cancel
          </Button>
          <Button type="submit" kind="success" disabled={hasError || isSubmitting}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

const EditProfileModal = withFormik({
  mapPropsToValues: ({ user = {}, onClose }) => {
    // formic/react does not like null values
    const assignEmptiStringForNullValues = (fields) => {
      Object.keys(fields).forEach((key) => {
        fields[key] = fields[key] || '';
      });

      return fields;
    };

    return {
      ...flow(
        pick(['email', 'fullName', 'address', 'telephoneNumber', '_id']),
        assignEmptiStringForNullValues
      )(user),
      onClose,
    };
  },

  validate({ email }) {
    const errors = {};

    if (!email) {
      errors.error = 'Email is required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(false);
    const { onClose, _id } = values;

    try {
      await axios.put(`${config.apiUrl}/me/${_id}`, values);
      onClose();
    } catch (error) {
      setFieldError('error', 'Oops. Something went wrong. Please try again later');
    }
  },
})(ProfileEditForm);

export default EditProfileModal;
