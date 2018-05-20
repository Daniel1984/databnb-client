import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import styles from './SignUp.scss';

InnerSignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({
    successMsg: PropTypes.string,
  }).isRequired,
};

function InnerSignupForm({
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
        <Card title="Sign Up">
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
                <Input
                  thickLines
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </FormControl>

              <FormControl>
                <Button disabled={hasError || isSubmitting} kind="success" type="submit">
                  Sign Up
                </Button>
              </FormControl>
              <FormInputError>{errors.error}</FormInputError>
            </Form>
          )}

          {!!values.successMsg && (
            <div className={styles.successContainer}>
              <div className={styles.successTitle}>Congratulations!</div>
              <div className={styles.successMsg}>
                {values.successMsg}
              </div>
            </div>
          )}
        </Card>
      </div>
      <div className={styles.signupHelper}>
        Already have an account? <Link className={styles.signupLink} to="/login">Log In</Link>
      </div>
    </SettingsPageContainer>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    successMsg: '',
  }),

  validate({ email, password }) {
    const errors = {};

    if (!email || !password) {
      errors.error = 'All fields required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError, setFieldValue }) => {
    setSubmitting(false);

    try {
      const { email, password } = values;
      await axios.post(`${config.apiUrl}/register`, { email, password });
      setFieldValue('successMsg', 'Now all that is left is to confirm your email address and enjoy the ride ;)');
    } catch ({ response: { data } }) {
      setFieldError('error', data.err);
    }
  },
})(InnerSignupForm);
