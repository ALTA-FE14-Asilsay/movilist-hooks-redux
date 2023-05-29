import { Link, NavLink } from 'react-router-dom';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import React, { FC } from 'react';
import DarkThemeContext from '../context/darkModeContext';

interface NavbarProps {
  id: string;
}

const Navbar: FC<NavbarProps> = ({ id }) => {
  const { currentTheme, changeCurrentTheme } =
    React.useContext(DarkThemeContext);

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
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'active text-primary-content font-semibold tracking-wide'
                  : ''
              }
              to={'/'}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to={'/favorite'}>CATEGORY</NavLink>
          </li>
          <li>
            <NavLink to={'/favorite'}>FAVORITE</NavLink>
          </li>

          <div className="divider divider-horizontal mx-1 py-3 lg:flex hidden"></div>

          <li>
            <div className="flex justify-center">
              <label className="swap swap-rotate">
                <input
                  onClick={() =>
                    changeCurrentTheme(
                      currentTheme === 'bumblebee' ? 'luxury' : 'bumblebee'
                    )
                  }
                  type="checkbox"
                />

                <div className="swap-on fill-current ">
                  <FaRegSun size="1.1rem" />
                </div>

                <div className="swap-off fill-current ">
                  <FaRegMoon size="1.1rem" />
                </div>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
