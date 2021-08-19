import React from 'react';
import RouterContext from '../react-router/routerContext';


// LinkAnchor只渲染了一个没有默认行为的ａ标签
// 跳转行为由传进来的navigate实现
function LinkAnchor({navigate, ...rest}){
  let props = {
    ...rest,
    onClick: event => {
      event.preventDefault();
      navigate();
    }
  }
  return <a {...props} />
} 

const Link = ({
  component = LinkAnchor,  
  to, ...rest}) => {
  return (
    <RouterContext.Consumer>
      {context => {
        // 从RouterContext获取history对象

        const {history} = context;
        
        const props = {
          ...rest,
          href: to,
          navigate(){
            history.push(to)
          }
        }

        return React.createElement(component, props)
      }}
    </RouterContext.Consumer>
  )
}

export default Link
