import React, { Component } from 'react';
import Header from './header';
import { render } from 'react-dom';
// import MindMap from 'react-mindmap';
import {HeaderBanner} from "./header2";
import { MindMapMain } from 'mind-map';
import { getMapDetails } from '../actions/action_mindmap';
import { connect } from 'react-redux';

class MindMap2 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var that = this;

    this.props.getMapDetails(this.props.match.params.id)
      .then((data) => {
        // hack
        data.payload.data.option.hierarchyRule.ROOT.getChildren = function () { return []; }
        MindMapMain.show(data.payload.data.option, data.payload.data.mind);
      });
  }

  render() {
    if (!this.props.mapDetails) {
      return (
        <rhmindmap>
          <div className="container">
            Loading...
          </div>
        </rhmindmap>
      )
    }

    const curUser={
      email:"user@email.com"
    };

    return (
      <rhmindmap>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>
          <div className="show_mind_map" id="jsmind_container2"></div>
        </div>
      </rhmindmap>
    )
  }
}

function mapStateToProps (state) {
  return { mapDetails: state.mapDetails };
}

export default connect(mapStateToProps, { getMapDetails })(MindMap2);


