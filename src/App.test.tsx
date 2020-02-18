import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReusableProvider } from 'reusable';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReusableProvider><App /></ReusableProvider>, div);
});
