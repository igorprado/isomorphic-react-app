import React, { Component, PropTypes } from 'react';
import { IntlMixin } from 'react-intl';

class NotificationsKitchen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saveFileNotification: false,
      retryNotification: {
        firstTime: true,
        notification: false,
        text: 'Example text'
      }
    };
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('users.page-title'));
  }

  _saveFileStart() {
    const self = this;
    this.props.flux.getActions('notification').info({
      title: 'Saving file',
      message: 'Please wait until your file is saved...',
      position: 'tc',
      autoDismiss: 0,
      dismissible: false,
      onRemove: function() {
        self.setState({ saveFileNotification: false });
      },
      onAdd: function(notification) {
        self.setState({ saveFileNotification: notification });
      }
    });

    // Add a timeout to simulate the saving file finished
    setTimeout(function() {
      self._saveFileFinish();
    }, 5000);
  }

  _saveFileFinish() {
    this.props.flux.getActions('notification').remove(this.state.saveFileNotification);
    this.props.flux.getActions('notification').success({
      title: 'File saved succesfully',
      message: 'Your file was saved.',
      position: 'tc',
      autoDismiss: 0,
      action: {
        label: 'Open file',
        callback: function() {
          console.log('Opening file...');
        }
      }
    });
  }

  _handleRetryNotificationTextChange(event) {
    const state = this.state;
    state.retryNotification.text = event.target.value;
    this.setState(state);
  }

  _saveRetryNotification() {
    const self = this;
    this.props.flux.getActions('notification').info({
      title: 'Saving information',
      message: 'Please wait until we save: ' + this.state.retryNotification.text,
      autoDismiss: 0,
      dismissible: false,
      onRemove: function() {
        const state = self.state;
        state.retryNotification.notification = false;
        self.setState(state);
      },
      onAdd: function(notification) {
        const state = self.state;
        state.retryNotification.notification = notification;
        self.setState(state);
      }
    });

    // Add a timeout to simulate the saving file finished
    setTimeout(function() {
      self._saveRetryNotificationFinish();
    }, 3000);
  }

  _saveRetryNotificationFinish() {
    const self = this;
    const state = this.state;
    this.props.flux.getActions('notification').remove(this.state.retryNotification.notification);
    if (this.state.retryNotification.firstTime) {
      this.props.flux.getActions('notification').error({
        title: 'We couldn\'t save your information',
        autoDismiss: 0,
        action: {
          label: 'Try again',
          callback: function() {
            self._saveRetryNotification();
          }
        }
      });
      state.retryNotification.firstTime = false;
      this.setState(state);
    } else {
      this.props.flux.getActions('notification').success({
        title: 'Information saved successfully'
      });
    }
  }

  render() {
    let saveFileButtonLabel = 'Click to save a file save';

    if (this.state.saveFileNotification) {
      saveFileButtonLabel = 'Saving...';
    }
    return (
      <div>
        <div>
          <h3>Save file example</h3>
          <button onClick={ this._saveFileStart.bind(this) } disabled={ this.state.saveFileNotification ? 'disabled' : '' }>{ saveFileButtonLabel }</button>
        </div>
        <div>
          <h3>Retry action example</h3>
          <input type='text' onChange={ this._handleRetryNotificationTextChange.bind(this) } value={ this.state.retryNotification.text } />
          <button onClick={ this._saveRetryNotification.bind(this) }>Save this information</button>
        </div>
      </div>
    );
  }
}

export default NotificationsKitchen;
