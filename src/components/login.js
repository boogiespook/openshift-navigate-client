import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions/action_auth';
import { Row, Input } from 'react-materialize';
import {HeaderLogin} from './header1';

class Login extends Component {

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
    this.props.login(values, () => {
      this.props.history.push('/engagements');
    });
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
  connect(null, { login })(Login)
);


