import { Container } from 'unstated';
import { requestAuth } from '../api/auth';

const initialState = {
  user: null,
  authToken,
};

export default class AuthContainer extends Container {
  state = initialState;

  getAuthToken = async (paylaod) => {
    try {
      const authData = await requestAuth(paylaod);
      this.setState({ authData });
    } catch ({ response: { data } }) {
      this.setState({ ...initialState, error: data });
    }
  }

  clearAuthData() {
    this.setState({ ...initialState });
  }
}
