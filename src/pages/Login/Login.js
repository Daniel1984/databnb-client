import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { parse } from 'qs';
import { Form, withFormik } from 'formik';
import {
  Input,
  Button,
  Card,
  SettingsPageContainer,
  FormControl,
  FormInputError,
} from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';
import axios from '../../shared/axios';
import config from '../../../config';
import styles from './Login.scss';

InnerLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

function InnerLoginForm({ errors, handleSubmit, isSubmitting }) {
  const hasError = !!Object.keys(errors).length;
  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="Login">
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
              <Button disabled={hasError || isSubmitting} type="submit" kind="success">Log In</Button>
            </FormControl>
            <FormInputError>{errors.loginError}</FormInputError>
            <FormControl>
              <Link className={styles.forgotPassLink} to="/reset-password">
                Forgot password?
              </Link>
            </FormControl>
          </Form>
        </Card>
      </div>
      <div className={styles.signupHelper}>
        Don`t have an account? <Link className={styles.signupLink} to="/signup">Sign Up</Link>
      </div>
    </SettingsPageContainer>
  );
}

export default withFormik({
  mapPropsToValues: ({ location, history }) => ({
    email: parse(location.search.substr(1)).email || '',
    password: '',
    history,
  }),

  validate({ email, password }) {
    const errors = {};

    if (!email || !password) {
      errors.loginError = 'All fields required';
    }

    return {};
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(false);

    try {
      const { email, password, history } = values;
      const { data: { token } } = await axios.post(`${config.apiUrl}/login`, { email, password });
      sessionStorage.setItem('auth-token', token);
      history.push('/');
    } catch ({ response: { data } }) {
      values.password = '';
      setFieldError('loginError', data.err);
    }
  },
})(InnerLoginForm);
