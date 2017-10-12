import React, { Component } from 'react';

class HeaderTitle extends Component {

  logout() {
    // this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        HeaderTitle!
        <div className="right-float"
          onClick={this.logout.bind(this)}>
          Logout
        </div>
      </div>
    )
  }
}

export default HeaderTitle;