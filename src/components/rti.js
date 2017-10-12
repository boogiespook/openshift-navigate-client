import React, { Component } from 'react';
import {Preloader, Input, Collection, CollectionItem, Button} from "react-materialize";
import { getRti, createRti } from '../actions/action_rti';
import Header from './header';
import { HeaderBanner } from "./header2";
import { connect } from 'react-redux';  // Makes the link between react and redux

class RTI extends Component {
  constructor(props) {
    super(props);
    console.log('constructor for rti');
    this.state = {
      inputValue: 'RZQ98',
      engagementId: props.match.params.engagementId || props.match.params.id,
      saving: false
    }
    this.getRti = this.getRti.bind(this);
  }

  componentDidMount() {
    this.toggleSpinnerOn = this.toggleSpinnerOn.bind(this);
    this.toggleSpinnerOff = this.toggleSpinnerOff.bind(this);
  }

  toggleSpinnerOn() {
    this.setState({'saving': true});
  }
  toggleSpinnerOff() {
    this.setState({'saving': false});
  }

  getRti() {
    this.toggleSpinnerOn();
    this.props.createRti(this.state.engagementId, this.state.inputValue, (response) => {
      this.toggleSpinnerOff();
    });
  }

  renderRtiImage() {

    const curUser={
      email:"user@email.com"
    };

    return (
      <rti>
        <div className="container">
          <HeaderBanner user={curUser}></HeaderBanner>
          <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          <div className="container">
            <div className="header">
              <div>Ready to Innovate Output</div>
              <span className="flex1"></span>
            </div>
            <div>
               <img alt="" src={this.props.rti.image} />
            </div>
          </div>
        </div>
      </rti>
    )
  }

  render() {

    const curUser={
      email:"user@email.com"
    };

    if (this.props.rti.image) {
      return this.renderRtiImage();
    }

    // defaultValue='RZQ98'
    return (
      <rti>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>

          <div className="header">
            <div>Ready to Innovate Output</div>
            <span className="flex1"></span>
          </div>

          <Collection>
            <CollectionItem>
              <div>
                <Input label="Path to RTI Output" value={this.state.inputValue} onChange={(evt)=>this.setState({inputValue:evt.target.value})}>
                </Input>
                <Button onClick={()=>this.getRti()} large className='newBtn' waves='light'>
                  Get RTI Ouput
                </Button>
              </div>
            </CollectionItem>
          </Collection>
        </div>
        { this.state.saving ? <Preloader className="preloadspinner centered big" flashing/> : null }
      </rti>
    )
  }
}

// export default RTI;

function mapStateToProps (state) {
  return { rti: state.rti };
}

export default connect(mapStateToProps, { getRti, createRti })(RTI);
