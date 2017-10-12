import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { getArchReview, saveReview } from '../actions/action_archreview';
import _ from 'lodash';
import {mapIconNameToObject} from '../helpers/react-icon-loader';
// import { Collapsible, Preloader, CollapsibleItem, Row, Col } from 'react-materialize';
import ArchReviewQuestions from './arch_review_questions';
import { HeaderBanner } from "./header2";
import Icon from 'react-icons-kit';
// import { ic_apps, ic_developer_mode, ic_transform, ic_people_outline, ic_security, ic_storage, ic_view_quilt, ic_location_on, ic_supervisor_account, ic_cloud_circle, ic_device_hub } from 'react-icons-kit/md/ic_apps';
// import sun from '../images/sun.png';
// import cloudy from '../images/cloudy.png';
// import rain from '../images/rain.png';
// import thunder from '../images/thunder.png';
// import $ from 'jquery';

// import * from 'jquery';
// import $ from 'jquery';
// import 'materialize-css/bin/materialize.css'
// import 'materialize-css/bin/materialize.js'
// import 'materialize-css/js/collapsible';

// It installs the JS asset only
// // import 'materialize-css/dist/css/materialize.min.css';

/*eslint-env jquery*/

class ArchReview extends Component {

  constructor(props) {
    super(props);
    this.state = { 'saving' : false };
  }

  componentDidMount() {
    // console.log('componentDidMount ');
    this.props.getArchReview(this.props.match.params.id)
      .then(() => {
        // console.log('back from get');
        // console.log(JSON.stringify(this.props.archReview));

        // let newState = {};
        // _.map(this.props.archReview.categories, category => {
        //   newState['expanded-'+category.name] = "false";
        // })
        // newState.saving = false;
        // this.setState(newState);
      });
    this.saveArchReview = this.saveArchReview.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);

    $(document).ready(function(){
      // console.log('here!! ');
      // console.log('here!! ');
      // console.log('here!! ');
      // console.log('here!! ');
      // console.log('here!! ');
      // console.log($('.collapsible'));
      // debugger;

      // $('.collapsible').collapsible();
      $('.collapsible').collapsible();

    });
  }


  handleStatusClick(workShopId, event) {
    console.log("handleStatusClick workShopId :", workShopId);
    // this.updateWorkshop(workShopId);
  }

  toggleSpinner() {
    this.setState({'saving': !this.state.saving});
  }

  saveArchReview(values, category) {
    this.toggleSpinner();
    this.props.saveReview(this.props.match.params.id, values, category)
      .then(() => {
        this.toggleSpinner();
      });
  }


  renderRandomWeather(category) {
    var rand = Math.random();
    if (rand >= 0 && rand <= 0.25) {
      return 'sun';
    }
    else if (rand >= 0.25 && rand <= 0.5) {
      return 'cloudy';
    }
    else if (rand >= 0.5 && rand <= 0.75) {
      return 'rain';
    }
    else {
      return 'thunder';
    }
  }


  renderRandomStatus(category) {
    var rand = Math.random();
    if (rand >= 0 && rand <= 0.3) {
      return (
        <Icon onClick={this.handleStatusClick.bind(this, category)} icon={mapIconNameToObject("ic_timelapse")} size={24} style={{ color: '#2a9af3' }} />
      );
    }
    else if (rand >= 0.3 && rand <= 0.66) {
      return (
        <Icon onClick={this.handleStatusClick.bind(this, category)} icon={mapIconNameToObject("ic_radio_button_unchecked")} size={24} style={{ color: 'grey' }} />
      );
    }
    else {
      return (
        <Icon onClick={this.handleStatusClick.bind(this, category)} icon={mapIconNameToObject("ic_check_circle")} size={24} style={{ color: 'green' }} />
      );
    }
  }

  renderArchCategories() {

    return _.map(this.props.archReview.categories, (category, index) => {

      let initialValues = {
        initialValues: {}
      }

      _.map(category.questions, question => {
        let key = question.qid;
        initialValues.initialValues[key] = question.answer;
      });

      // console.log('setting initial values');
      // console.log(JSON.stringify(initialValues.initialValues));

      // expanded={this.state['expanded-'+category.name]}

      // expanded={this.state['expanded-'+category.name] || false}
      //icon={category.icon}

      // header={category.name}
      // <CollapsibleItem header={category.name} dangerouslySetInnerHTML="<div>adf</div>" icon={category.icon} key={index+1} className="icon-blue">
        //       <CollapsibleItem dangerouslySetInnerHTML="<div>adf</div>">
        //   { this.state.saving ? <Preloader className="centered" flashing/> : null }
        //   <ArchReviewQuestions
        //     form={`ARQForm_${category.name}`}
        //     review={category}
        //     {...initialValues}
        //     onSave={this.saveArchReview} />
        // </CollapsibleItem>
        // <div dangerouslySetInnerHTML={ {__html: this.highlightQuery()}>hello</div>
        // <CollapsibleItem dangerouslySetInnerHTML={ {__html: this.highlightQuery()} }>
        // </CollapsibleItem>
        // dangerouslySetInnerHTML="<div>adf</div>"

      // return (
      //   <CollapsibleItem header={category.name} icon={category.icon} key={index+1} className="icon-blue">
      //     { this.state.saving ? <Preloader className="centered" flashing/> : null }
      //     <ArchReviewQuestions
      //       form={`ARQForm_${category.name}`}
      //       review={category}
      //       {...initialValues}
      //       onSave={this.saveArchReview} />
      //   </CollapsibleItem>
      // );

      return (
        <li key={index+1}>
          <div className="collapsible-header"><i className="material-icons">{category.icon}</i>{category.name}
            <span className="collapsible-header-right">
              <img alt="" src={ this.renderRandomWeather(category) } />
              <span>{ this.renderRandomStatus(category) }</span>
            </span>
          </div>
          <div className="collapsible-body">
            <ArchReviewQuestions
            form={`ARQForm_${category.name}`}
            review={category}
            {...initialValues}
            onSave={this.saveArchReview} />
          </div>
        </li>
      );

    });
  }

  render() {
    // console.log('rendering arch review');
    // console.log(this.props);

    const curUser={
      email:"user@email.com"
    };

    // <Collapsible popout>
    //   {this.renderArchCategories()}
    // </Collapsible>

    // may need to bootstrap!!
    // $(document).ready(function(){
    //   $('.collapsible').collapsible();
    // });

    return (
      <archReview>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>
          <div>
            <ul className="collapsible popout" data-collapsible="accordion">
              { this.renderArchCategories() }
            </ul>
          </div>
        </div>
      </archReview>
    )
  }
}


function mapStateToProps (state) {
  // console.log(JSON.stringify(state.archReview));
  return { archReview: state.archReview };
}

export default connect(mapStateToProps, { getArchReview, saveReview })(ArchReview);



