import React from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';
import {
  Input,
  Button,
  Card,
  SettingsPageContainer,
  FormControl,
  FormInputError,
} from '../../components/common';
import axios from '../../shared/axios';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ResetPassword.scss';

InnerResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({
    successMsg: PropTypes.string,
  }).isRequired,
};

function InnerResetPasswordForm({
  values,
  errors,
  handleSubmit,
  isSubmitting,
}) {
  const hasError = !!Object.keys(errors).length;

  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="Reset Password">
          {!values.successMsg && (
            <Form className={styles.form} onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  thickLines
                  type="email"
                  name="email"
                  placeholder="Email Address"
                />
              </FormControl>
              <FormControl>
                <Button disabled={hasError || isSubmitting} kind="success" type="submit">
                  Reset my password
                </Button>
              </FormControl>
              <FormInputError>{errors.email}</FormInputError>
            </Form>
          )}

          {!!values.successMsg && (
            <div className={styles.successContainer}>
              <div className={styles.successTitle}>Done!</div>
              <div className={styles.successMsg}>
                {values.successMsg}
              </div>
            </div>
          )}
        </Card>
      </div>
    </SettingsPageContainer>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    successMsg: '',
  }),

  validate({ email }) {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    return {};
  },

  handleSubmit: async (values, { setSubmitting, setFieldError, setFieldValue }) => {
    setSubmitting(false);

    try {
      const { email } = values;
      const { data: { msg } } = await axios.post(`${config.apiUrl}/request-password-reset`, { email });
      setFieldValue('successMsg', msg);
    } catch ({ response: { data } }) {
      setFieldError('email', data.err);
    }
  },
})(InnerResetPasswordForm);
