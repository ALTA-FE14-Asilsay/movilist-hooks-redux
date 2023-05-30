import { createContext } from 'react';

const defaultValue = {
  currentTheme: 'bumblebee',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeCurrentTheme: (newTheme: string) => {},
};

const DarkThemeContext = createContext(defaultValue);

export default DarkThemeContext;

// https://razinj.dev/how-to-add-dark-mode-in-react-context/
