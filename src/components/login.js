import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, isAuthenticated, initLogin } from '../actions/action_auth';
import { Row, Input } from 'react-materialize';
import { HeaderLogin } from './header1';

class Login extends Component {

  componentDidMount() {

    console.log('checking if user authenticated');
    // this.props.isAuthenticated()
    //   .then(() => {
    //     console.log('redirecting to landing page');
    //     this.props.history.push('/engagements');
    //   });

    this.props.isAuthenticated((authenticated) => {
      if (authenticated) {
        console.log('redirecting to landing page');
        this.props.history.push('/engagements');
      }
    });

  }

  renderField(field) {
    return (
      <Row>
          <Input
            s={12}
            type="text"
            label={field.label}
            {...field.input} />
      </Row>
    );
  }

  onSubmit(values) {
    // TODO: should go through an action creator
    // window.location = 'https://localhost:8001/auth/login';
    this.props.initLogin();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      // Redux form checks all the validation then calls our custom callback i.e. onSubmit
      <login className="parentSize">
        <HeaderLogin></HeaderLogin>
        <div className='loginForm'>
          <div className="loginHead">
            <div className="profile"></div>
          </div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } >
          <Field
            label="Username"
            name="username"
            component={ this.renderField } />
          <Field
            label="Password"
            name="password"
            component={ this.renderField } />
          <button type="submit" className="waves waves-light btn">Login</button>
          <div className="forgetPwd">Forgotton Password?</div>
        </form>
        </div>
      </login>
    )
  }
}

function validate (values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Enter a username";
  }
  if (!values.password) {
    errors.password = "Enter a password";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(null, { login, isAuthenticated, initLogin })(Login)
);


