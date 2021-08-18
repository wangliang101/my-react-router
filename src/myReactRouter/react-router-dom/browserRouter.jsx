import React from 'react';
// import { Router } from 'react-router';
import Router from '../react-router/router'
// import { createBrowserHistory as createrHistory } from 'history';
import createBrowserHistory from "../history";

class BrowserRouter extends React.Component{
  history = createBrowserHistory(this.props);
  render(){
    console.log(this.props)
    return <Router history={this.history} children={this.props.children} />
  }
}

export default BrowserRouter;
