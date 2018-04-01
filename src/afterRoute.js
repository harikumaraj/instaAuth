import React from 'react';

export default class AfterRoute extends React.Component{

constructor(){
  super();
  this.state={
    access_token:"",
    data:{},
    tagList:[],
    sortedImagesDependingOnTags:[]
  }
}

componentDidMount(){
  if(window.location.hash.length===65)
  {
  this.setState({access_token:window.location.hash.substr(14,51)});
  setTimeout(()=>{
    this.getData();
  })
}
  else
  console.log(window.location.hash);
}

getData(){
  fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.state.access_token}`)
  .then((response) => response.json())
  .then((response)=>{
    if(response.meta.code===200){
    console.log(response);
    this.setState({data:response.data});
    setTimeout(()=>{
      this.getAllTags();
    })
  }
  else{
    console.log("Something went wrong");
  }
  })
}
getAllTags(){
  let flag=0;
  this.state.data.map((data)=>{
    let tempTagList=this.state.tagList;
    data.tags.map((dataTag)=>{
      // console.log(dataTag)
      if(this.state.tagList.length!==0){
      this.state.tagList.map((tag)=>{
        // console.log(dataTag,tag,flag)
        if(dataTag===tag)
        flag=1;
      })
    }
    if(flag===0)
    tempTagList.push(dataTag);
    this.setState({tagList:tempTagList});
    flag=0;
    })
  })
  console.log(this.state.tagList);
  setTimeout(()=>{
    this.sortImagesDependingOnTags();
  })
}

sortImagesDependingOnTags(){
  this.state.tagList.map((tag)=>{
    let tempTagData={
      [tag]:[]
    }
    this.state.data.map((data)=>{
      data.tags.map((dataTag)=>{
        if(tag===dataTag){
          tempTagData[tag].push(data.images.thumbnail.url);
          // console.log(tempTagData);
        }
      })
    })
    console.log(tempTagData)
    let tempSortedImagesDependingOnTags=this.state.sortedImagesDependingOnTags;
    tempSortedImagesDependingOnTags.push(tempTagData);
    this.setState({sortedImagesDependingOnTags:tempSortedImagesDependingOnTags});
  })
  setTimeout(()=>{console.log(this.state.sortedImagesDependingOnTags)},1000)
}

displayingImages(){
  if(this.state.sortedImagesDependingOnTags.length===0)
  return null;
  else{
    return this.state.sortedImagesDependingOnTags.map((data,index)=>{
      // console.log(data);
      return(
        <div>
          <h2>#{Object.keys(data)[0]}</h2>
            {
              data[Object.keys(data)[0]].map((imageSource)=>{
                return <img src={imageSource} alt="poop"/>
              })
            }
          </div>
        )
      })
    }
  }

  render(){
    return(
      <div style={divStyle}>
      <div style={minContainer}>
      {this.displayingImages()}
      </div>
      </div>
    )
  }
}


const divStyle={
  position: "absolute",
   top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft:50
//     justifyContent: 'center',
// alignItems: 'center'
}
const buttonStyle={
  height:"30px",
  width:"150px"
}
const minContainer={
  height: "80%",
  width:"100%"
}
