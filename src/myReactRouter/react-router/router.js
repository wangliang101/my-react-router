import React from 'react';

import HistoryContext from './historyContext';
import RouterContext from './routerContext';

/**
 * The publci Api for putting history on context
 */

 class Router extends React.Component{

  // 静态方法，检测当前路由是否匹配
  static computeRootMatch(pathname){
    return {path: '/', url: '/', params: {}, isExact: pathname === '/'}
  }

  constructor(props){
    super(props)

    this.state = {
      // 将history的location挂在到state上
      location: props.history.location
    }

    // 下边两个变量是防御性代码，防止跟组件还没渲染location就变化了
    // 如果location变化时，当前根组件还没渲染出来，就先记下他，等当前组件mount了再设置到state
    this._isMounted = false;
    this._pendingLocation = null;

    // 通过history监听路由变化，变化的时候，改变state上的location
    this.unlisten = props.history.listen(location => {
      if(this._isMounted){
        this.setState({location})
      }else{
        this._pendingLocation = location;
      }
    })

  }
  componentDidMount(){
    this._isMounted = true;

    if(this._pendingLocation){
      this.setState({location: this._pendingLocation});
    }
  }

  componentWillUnmount(){
    if(this.unlisten){
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  }

  render(){
    // render的内容很简单，就是两个context
    // 一个是路由相关属性，包括history和location等
    // 一个只包含history信息，同时将子组件通过children渲染出来

    return (
      <RouterContext.Provider value={{
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname)
      }}>
        <HistoryContext.Provider children={this.props.children || null} value={this.props.history} />

      </RouterContext.Provider>
    )
  }

 }

 export default Router;