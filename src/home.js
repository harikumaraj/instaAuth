import React from 'react';

export default class Home extends React.Component{


componentDidMount(){
  // console.log(window.location.href);
  // console.log(this.props);
}


  render(){
    return(
      <div style={divStyle}>
        <a href="https://api.instagram.com/oauth/authorize/?client_id=afd44edd11744ee991cd759e6b528d67&redirect_uri=http://localhost:3000/after&response_type=token">instagram access </a>
      </div>
    )
  }
}


const divStyle={
  display:"flex",
  position: "absolute",
   top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
alignItems: 'center'
}
