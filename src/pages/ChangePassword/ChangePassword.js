import React from 'react';
import PropTypes from 'prop-types';
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
import axios from '../../shared/axios';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ChangePassword.scss';

InnerChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

function InnerChangePasswordForm({ errors, handleSubmit, isSubmitting }) {
  const hasError = !!Object.keys(errors).length;

  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="Change Password">
          <Form className={styles.form} onSubmit={handleSubmit}>
            <FormControl>
              <Input
                thickLines
                type="password"
                name="password"
                placeholder="New password"
              />
            </FormControl>
            <FormControl>
              <Button disabled={hasError || isSubmitting} kind="success" type="submit">
                Change password
              </Button>
            </FormControl>
            <FormInputError>{errors.error}</FormInputError>
          </Form>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}

export default withFormik({
  mapPropsToValues: ({ history, location }) => ({
    password: '',
    history,
    location,
  }),

  validate({ password }) {
    const errors = {};

    if (!password) {
      errors.error = 'All fields required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(false);

    try {
      const { password, history, location } = values;
      const { token } = parse(location.search.substr(1));
      const { data: { email } } = await axios.post(`${config.apiUrl}/change-password`, { password, token });
      history.push(`/login?email=${email}`);
    } catch ({ response: { data } }) {
      values.password = '';
      setFieldError('error', data.err);
    }
  },
})(InnerChangePasswordForm);
