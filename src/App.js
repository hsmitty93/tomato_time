import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { Content } from './components/content';

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#36e7f4',
    },
  },
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#36e7f4',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const theme3 = createMuiTheme({
  palette: {
    primary: {
      main: '#4336F4',
    },
    secondary: {
      main: '#e7f436',
    },
  },
});

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="title">TomoTime</h1>
      </header>
      <div className="content">
        <Content />
      </div>
      <div className="footer">
        <footer className="footer">
          <div style={{ justifySelf: "center" }}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    </div>
  );
}

export { theme1, theme2, theme3 };
