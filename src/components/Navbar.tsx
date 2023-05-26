import { Link } from 'react-router-dom';
import { FC } from 'react';

interface NavbarProps {
  id: string;
}

const Navbar: FC<NavbarProps> = ({ id }) => {
  return (
    <div
      id={id}
      className="navbar bg-primary sticky top-0 px-16 lg:px-24 z-20"
    >
      <div className="flex-1">
        <Link
          to={'/'}
          className="btn btn-ghost normal-case text-xl"
        >
          Movilist
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/favorite'}>Favorites</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
