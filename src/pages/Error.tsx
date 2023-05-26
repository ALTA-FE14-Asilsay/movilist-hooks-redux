import { Component } from 'react';
import { Layout, Section } from '../components/Layout';
import { withRouter } from '../withRouter';

class Error extends Component {
  render() {
    return (
      <Section id="not-found">
        <div className="w-full min-h-screen bg-base-100 text-base-content flex justify-center items-center">
          <p className="text-5xl tracking-wider font-extrabold">NOT FOUND</p>
        </div>
      </Section>
    );
  }
}

export default withRouter(Error);
