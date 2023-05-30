import { useDispatch, useSelector } from 'react-redux';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';

import { ThemeState, toChangeTheme } from '../reducer/themeSlice';

interface NavbarProps {
  id: string;
}

const Navbar: FC<NavbarProps> = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  function handleChangeTheme() {
    theme?.DarkMode === 'bumblebee'
      ? (dispatch(toChangeTheme('luxury')),
        localStorage.setItem('theme', 'luxury'))
      : (dispatch(toChangeTheme('bumblebee')),
        localStorage.setItem('theme', 'bumblebee'));

    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur?.();
    }
  }

  const icons = localStorage.getItem('theme') || 'bumblebee';

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
                  onClick={() => handleChangeTheme()}
                  type="checkbox"
                />

                <div className="swap-on fill-current ">
                  {icons === 'luxury' ? (
                    <FaRegSun size="1.1rem" />
                  ) : (
                    <FaRegMoon size="1.1rem" />
                  )}
                </div>

                <div className="swap-off fill-current ">
                  {icons === 'bumblebee' ? (
                    <FaRegMoon size="1.1rem" />
                  ) : (
                    <FaRegSun size="1.1rem" />
                  )}
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
