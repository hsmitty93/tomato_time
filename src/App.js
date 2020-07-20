import React from 'react';
import logo from './logo.svg';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <footer>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </footer>
    </div>
  );
}

export { App, theme1, theme2, theme3 };
