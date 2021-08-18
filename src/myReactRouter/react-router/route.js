import React from 'react';

import RouterContext from './routerContext';
import matchPath from './matchPath';

/**
 * The public API for matching a single path and rendering
 */

 class Route extends React.Component{
   render(){
     return(
       <RouterContext.Consumer>
        {
          context => {
          console.log('context', context)

            // 从RouterContext获取location
            const location = context.location;
            // 调用matchPath检测当前路由是否匹配
            // const match = matchPath(location.pathname, this.props)
            const match = this.props.computeMatch ? this.props.computeMatch : matchPath(location.pathname, this.props)
            
            const props = {...context, location, match}

            let {component} = this.props;

            // render对应的compoent之前采用的最新参数match更新下RouterContext
            // 这样下层嵌套的Route可以拿到对应的值
            return(
              <RouterContext.Provider value={props}>
                {
                  props.match ? React.createElement(component, props) : null
                }
              </RouterContext.Provider>
            )
          }
        }
       </RouterContext.Consumer>
     )
   }
 }

 export default Route;