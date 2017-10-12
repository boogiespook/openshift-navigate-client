import React, { Component } from 'react';
import { Navbar } from 'react-materialize';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import ReactRouter from 'react-router';
// import { withRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom';

class HeaderNavigation extends Component {

  goTo(route) {


    console.log('this.props');
    console.log(this.props);

    console.log('this.props.location.query:: ');
    // console.log(this.props.location.query);

    // console.log(this.props.location.query);
    this.props.history.push(route);

    // window.location.href = "http://localhost:8080/"+route;
  }



  render() {

    const engagementId = this.props.id || this.props.engagementId;

    console.log('In header navigation');

    return (
      <div>
        <Navbar>
          <div className="headerNavOuter">
            <div className="headerNavInner">
              <span className="headerNavItem" onClick={this.goTo.bind(this, '/engagements')  }>HOME</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/dashboard/${engagementId}`)}>DASHBOARD</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/procharter/${engagementId}`)}>PRO CHARTER</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/rti/${engagementId}`)}>RTI</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/mindmap/${engagementId}`)}>MIND MAP</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/archreview/${engagementId}`)}>ARCH REVIEW</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/businessreview/${engagementId}`)}>BIZ REVIEW</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/workshops/${engagementId}`)}>WORKSHOPS</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/hlarch/${engagementId}`)}>HL ARCH</span>
              <span className="headerNavItem" onClick={this.goTo.bind(this, `/nextsteps/${engagementId}`)}>NEXT STEPS</span>
            </div>
          </div>
        </Navbar>
      </div>
    )
  }
}

export default HeaderNavigation;

// export default connect(null, null)(HeaderNavigation);
// <NavItem onClick={this.goTo.bind(this, '/engagements')  }>HOME</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/dashboard/${engagementId}`)}>DASHBOARD</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/procharter/${engagementId}`)}>PRO CHARTER</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/rti/${engagementId}`)}>RTI</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/mindmap/${engagementId}`)}>MIND MAP</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/archreview/${engagementId}`)}>ARCH REVIEW</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/workshops/${engagementId}`)}>WORKSHOPS</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/hlarch/${engagementId}`)}>HL ARCH</NavItem>
// <NavItem onClick={this.goTo.bind(this, `/nextsteps/${engagementId}`)}>NEXT STEPS</NavItem>
