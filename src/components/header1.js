import React from 'react';
import userProfile from '../images/user-profile.png';
import rhlogo from '../images/rhlogo.png';

function UserInfo(props){
  if (props.user){
    return (
      <div className="userInfo">
        <div className="email">{props.user.email}</div>
        <div className="profile small">
          <img alt="" src={userProfile}/>
        </div>
        <i className="material-icons">more_vert</i>
      </div>
    )
  }else{
    return <div></div>;
  }
}


export class HeaderLogin extends React.Component {
  render() {
    return (
      <header1>
        <div className="bg">
          <div className="intro">
            <div className="container">
              <div className="title">
                <div className="profile small"></div>
                <div>Openshift Navigate</div>
              </div>
              <div className="content">
                Some blurb about the tool, high level aims, lorem ipsum dolor sit amet, est accusata disputationi ea. Eu ius quidam lucilius pericula, quo fuisset concludaturque id, temporibus appellantur in per. Ex graeco concludaturque qui. Per ut nibh minim constituto, id solet aperiam mea.
            </div>
            </div>
          </div>
          <div className="navLike">
            <div className="container">
              <div className="logo">
                <img alt="" src={rhlogo} />
              </div>
              <span className="flex1"></span>
              <UserInfo user={this.props.user}></UserInfo>
            </div>
          </div>
        </div>
      </header1>
    )
  }
}
