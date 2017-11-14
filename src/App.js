import React, { Component } from 'react';
import './styles/index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import promise from 'redux-promise';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Engagements from './components/engagements';
import ProCharter from './components/pro_charter';
import RTI from './components/rti';
import ArchReview from './components/arch_review';
import BusinessReview from './components/business_review';
import MindMap from './components/mind_map';
import WorkShops from './components/workshops';
import UserStories from './components/userStories';
import UserStory from './components/userStory';
import HlArch from './components/hlarch';
import NextSteps from './components/next_steps';
import DragulaDemo from './components/DragulaDemo';
import { getInitConfig } from './actions/action_init';
import thunk from 'redux-thunk';

// const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      // store:createStoreWithMiddleware(reducers)
    }
  }


  componentDidMount() {
    console.log('Component did mount');
    debugger;
    this.props.getInitConfig();
  }

  render() {

    return (
      <BrowserRouter>
          <Switch>
            <Route path="/dragula" component={DragulaDemo} />
            <Route path="/engagements" component={Engagements} />
            <Route path="/dashboard/:id" component={Dashboard} />
            <Route path="/procharter/:engagementId" component={ProCharter} />
            <Route path="/rti/:id" component={RTI} />
            <Route path="/mindmap/:id" component={MindMap} />
            <Route path="/archreview/:id" component={ArchReview} />
            <Route path="/businessreview/:id" component={BusinessReview} />
            <Route path="/workshops/:engagementId" component={WorkShops} />
            <Route path="/userStories/:engagementId/:workshopName" component={UserStories} />
            <Route path="/userStory/:configId/:usId" component={UserStory} />
            <Route path="/hlarch/:id" component={HlArch} />
            <Route path="/nextsteps/:id" component={NextSteps} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
      </BrowserRouter>
    );

  }
}

function mapStateToProps (state) {
  return { config: state.config };
}

export default connect(mapStateToProps, { getInitConfig })(App);

// export default App;