import { h, Component } from 'preact';
import getGravatarUrl from 'gravatar-url';

export default class Gravatar extends Component {
  componentDidMount() {
    this.getGrvatarImage(this.props);
  }

  componentWillReceiveProps(props) {
    this.getGrvatarImage(props);
  }

  getGrvatarImage = async ({ email, size = 200 }) => {
    const gravatarUrl = await getGravatarUrl('sindresorhus@gmail.com', {size: 200});
    this.setState({ gravatarUrl });
  }

  render() {
    const { gravatarUrl } = this.state;
    return (
      <img src={gravatarUrl} />
    )
  }
}
