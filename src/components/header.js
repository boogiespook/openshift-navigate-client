import React, { Component } from 'react';
import HeaderNavigation from './header_navigation';

class Header extends Component {

  render() {

    console.log('Rendering Header, id: %s', this.props.id);

    return (
      <div>
        <HeaderNavigation history={this.props.history} id={this.props.id}/>
      </div>
    )
  }
}

export default Header;

// <HeaderTitle history={this.props.history} />