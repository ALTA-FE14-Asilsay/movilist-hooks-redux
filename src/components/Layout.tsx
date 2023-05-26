import { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children?: React.ReactNode;
  id?: string;
  addClass?: string;
}

export class Layout extends Component<Props> {
  render() {
    const { children } = this.props;

    return (
      <div className="w-full min-h-screen flex flex-col">
        <Navbar id="Naviugation bar" />
        <div className="h-full w-full flex flex-col items-center justify-center">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export class Section extends Component<Props> {
  render() {
    const { children, id, addClass } = this.props;

    return (
      <section
        id={id}
        className={`w-full min-h-screen ${addClass}`}
      >
        {children}
      </section>
    );
  }
}
