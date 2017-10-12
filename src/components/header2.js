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

export class HeaderBanner extends React.Component {
  render() {
    return (
      <header2>
        <div className="bg">
          <div className="intro">
            <div className="container">
              <div className="title">
                <div className="profile small"></div>
                <div>Openshift Navigate</div>
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
      </header2>
    )
  }
}

export default HeaderBanner;
