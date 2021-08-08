import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory as createrHistory } from 'history';

class BrowserRouter extends React.Component{
  history = createrHistory(this.props);
  render(){
    return <Router history={this.history} children={this.props.children} />
  }
}

export default BrowserRouter;
