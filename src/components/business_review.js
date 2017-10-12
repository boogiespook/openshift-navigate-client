import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { getReview, saveReview } from '../actions/action_business_review';
import _ from 'lodash';
import { mapIconNameToObject } from '../helpers/react-icon-loader';
import BusinessReviewQuestions from './business_review_questions';
import { HeaderBanner } from "./header2";
import Icon from 'react-icons-kit';
// import { ic_apps, ic_developer_mode, ic_transform, ic_people_outline, ic_security, ic_storage, ic_view_quilt, ic_location_on, ic_supervisor_account, ic_cloud_circle, ic_device_hub } from 'react-icons-kit/md/ic_apps';
// import sun from '../images/sun.png';
// import cloudy from '../images/cloudy.png';
// import rain from '../images/rain.png';
// import thunder from '../images/thunder.png';
// import $ from 'jquery';
// import 'jquery';


/*eslint-env jquery*/

class BusinessReview extends Component {

  constructor(props) {
    super(props);
    this.state = { 'saving' : false };
  }

  componentDidMount() {
    console.log('componentDidMount ');
    this.props.getReview(this.props.match.params.id)
      // .then(() => {
      //
      // });
    this.saveBusReview = this.saveBusReview.bind(this);
    this.toggleSpinner = this.toggleSpinner.bind(this);

    $('.collapsible').collapsible();
  }


  handleStatusClick(workShopId, event) {
    console.log("handleStatusClick workShopId :", workShopId);
    // this.updateWorkshop(workShopId);
  }

  toggleSpinner() {
    this.setState({'saving': !this.state.saving});
  }

  saveBusReview(values, category) {
    // this.toggleSpinner();
    // let a = this.props.saveReview(this.props.match.params.id, values, category)
    //   .then(() => {
    //     this.toggleSpinner();
    //   });
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

  renderBusinessReviewCategories() {
    return _.map(this.props.businessReview.categories, (category, index) => {

      let initialValues = {
        initialValues: {}
      }

      _.map(category.questions, question => {
        let key = question.qid;
        initialValues.initialValues[key] = question.answer;
      });

      return (
        <li key={index+1}>
          <div className="collapsible-header"><i className="material-icons">{category.icon}</i>{category.name}
            <span className="collapsible-header-right">
              <img alt="" src={ this.renderRandomWeather(category) } />
              <span>{ this.renderRandomStatus(category) }</span>
            </span>
          </div>
          <div className="collapsible-body">
            <BusinessReviewQuestions
            form={`BRQForm_${category.name}`}
            review={category}
            {...initialValues}
            onSave={this.saveBusReview} />
          </div>
        </li>
      );

    });
  }

  render() {

    const curUser={
      email:"user@email.com"
    };



    if (!this.props.businessReview) {
      return (
        <businessReview>
          <div className="container">
            <div>
              <HeaderBanner user={curUser}></HeaderBanner>
              <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
            </div>
            <div>
              Loading Business Review...
            </div>
          </div>
        </businessReview>
      )
    }

    return (
      <businessReview>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>
          <div>
            <ul className="collapsible popout" data-collapsible="accordion">
              { this.renderBusinessReviewCategories() }
            </ul>
          </div>
        </div>
      </businessReview>
    )
  }
}

function mapStateToProps (state) {
  return { businessReview: state.businessReview };
}

export default connect(mapStateToProps, { getReview, saveReview })(BusinessReview);

