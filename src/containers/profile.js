import { Container } from 'unstated';
import axios from '../shared/axios';
import config from '../../config';

const initialState = {
  user: null,
  errorGettingProfile: false,
  errorUpdatingProfile: false,
};

export default class ProfileContainer extends Container {
  state = initialState;

  getProfile = async () => {
    this.setState({ errorGettingProfile: false });
    try {
      const { data: user } = await axios.get(`${config.apiUrl}/me`);
      this.setState({ user });
    } catch (error) {
      this.setState({ errorGettingProfile: true });
    }
  }

  updateProfile = async (payload) => {
    this.setState({ errorUpdatingProfile: false });
    try {
      await axios.put(`${config.apiUrl}/me/${payload._id}`, payload);
    } catch (error) {
      this.setState({ errorUpdatingProfile: true });
    }
  }
}
