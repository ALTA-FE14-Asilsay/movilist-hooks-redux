import { Component } from 'react';
import { withRouter } from '../withRouter';

interface NavbarProps {
  id: string;
  navigate: any;
}

class Navbar extends Component<NavbarProps> {
  // handleNav(target?: string) {
  //   const navigate = this.props.navigate;
  //   navigate(`${target}`);
  // }

  render() {
    const { id, navigate } = this.props;

    return (
      <div className="navbar bg-primary sticky top-0 px-16 lg:px-24 z-20">
        <div className="flex-1">
          <a
            onClick={() => navigate('/')}
            className="btn btn-ghost normal-case text-xl"
          >
            Movilist
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => navigate('/')}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate('/favorite')}>Favorites</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
