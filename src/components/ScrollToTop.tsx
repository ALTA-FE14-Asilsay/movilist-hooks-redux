import { Component } from 'react';
import { withRouter } from '../withRouter';

interface ScrollType {
  location: any;
}

class ScrollToTop extends Component<ScrollType> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
