import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Actions from 'actions';
import FormInput from './form-input';
import FormGroup from './form-group';
import { shell } from 'electron';

class MongoDBAuthentication extends React.Component {
  static displayName = 'MongoDBAuthentication';

  static propTypes = {
    currentConnection: PropTypes.object.isRequired,
    isValid: PropTypes.bool
  };

  /**
   * Handles username change.
   *
   * @param {Object} evt - evt.
   */
  onUsernameChanged(evt) {
    Actions.onUsernameChanged(evt.target.value.trim());
  }

  /**
   * Handles password change.
   *
   * @param {Object} evt - evt.
   */
  onPasswordChanged(evt) {
    Actions.onPasswordChanged(evt.target.value);
  }

  /**
   * Handles authSource change.
   *
   * @param {Object} evt - evt.
   */
  onAuthSourceChanged(evt) {
    Actions.onAuthSourceChanged(evt.target.value);
  }

  /**
   * Opens "Authentication Database" documentation.
   */
  onSourceHelp() {
    shell.openExternal(
      'https://docs.mongodb.com/manual/core/security-users/#user-authentication-database'
    );
  }

  /**
   * Checks if there is MongoDB username error.
   *
   * @returns {String} In case of error returns an error message.
   */
  getUsernameError() {
    const connection = this.props.currentConnection;

    if (!this.props.isValid && isEmpty(connection.mongodbUsername)) {
      return true;
    }
  }

  /**
   * Checks if there is MongoDB password error.
   *
   * @returns {String} In case of error returns an error message.
   */
  getPasswordError() {
    const connection = this.props.currentConnection;

    if (!this.props.isValid && isEmpty(connection.mongodbPassword)) {
      return true;
    }
  }

  render() {
    return (
      <FormGroup id="mongodb-authenticatio">
        <FormInput
          label="Username"
          name="username"
          error={this.getUsernameError()}
          changeHandler={this.onUsernameChanged.bind(this)}
          value={this.props.currentConnection.mongodbUsername || ''}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          error={this.getPasswordError()}
          changeHandler={this.onPasswordChanged.bind(this)}
          value={this.props.currentConnection.mongodbPassword || ''}
        />
        <FormInput
          label="Authentication Database"
          placeholder="admin"
          name="auth-source"
          changeHandler={this.onAuthSourceChanged.bind(this)}
          value={this.props.currentConnection.mongodbDatabaseName || ''}
          linkHandler={this.onSourceHelp.bind(this)}
        />
      </FormGroup>
    );
  }
}

export default MongoDBAuthentication;
