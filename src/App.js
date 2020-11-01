import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LiveSearchBooksContainer from './components/LiveSearchBooks/LiveSearchBooksContainer';
import LiveSearchBooksContainerWithHooks from './components/LiveSearchBooks/LiveSearchBooksContainerWithHooks';

const App = () => {
  return (
    <div className="app-wrapper">
      <Route exact path='/' render={() => <LiveSearchBooksContainerWithHooks />} />
      {/*<Route exact path='/' render={() => <LiveSearchBooksContainer />} />*/}
    </div>
  );
}

export default App;
