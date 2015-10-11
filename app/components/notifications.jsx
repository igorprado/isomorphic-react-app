import React, { Component, PropTypes } from 'react';
import ReactNotificationSystem from 'react-notification-system';

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      notifications: null
    };
  }

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { flux } = this.props;
    flux.getStore('notification').listen(this._handleNotificationChange);
    flux.getStore('notifications').listen(this._handleNotificationsChange);
  }

  componentWillUnmount() {
    const { flux } = this.props;
    flux.getStore('notification').unlisten(this._handleNotificationChange);
    flux.getStore('notifications').unlisten(this._handleNotificationsChange);
  }

  _handleNotificationsChange = ({ notifications }) => {
    this.setState({ notifications });
  }

  _handleNotificationChange = ({ notification, intent }) => {
    if (intent === 'add') {
      this.refs.notifications.addNotification(notification);
    } else if (intent === 'remove') {
      this.refs.notifications.removeNotification(notification);
    }
  };

  _removeNotification(notification) {
    let _notification = notification;
    // Check if the notification has UID, if not, try to find inside the store
    if (!notification.uid) {
      const notifications = this.state.notifications.slice();
      notifications.forEach(function(item) {
        if (item.uid === notification) {
          _notification = item;
        }
      });
    }

    this.props.flux.getActions('notification').remove(_notification);
  }

  render() {
    return <ReactNotificationSystem ref='notifications' />;
  }
}

export default Notifications;
