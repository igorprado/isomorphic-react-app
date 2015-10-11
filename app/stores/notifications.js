class NotificationsStore {
  constructor() {
    this.bindActions(this.alt.getActions('notifications'));

    this.state = {
      notifications: []
    };
  }

  onSuccessfullyAdded(notification) {
    const notifications = this.state.notifications.slice();
    notifications.push(notification);
    return this.setState({ notifications });
  }

  onSuccessfullyRemoved(notification) {
    const notifications = this.state.notifications.slice();
    notifications.splice(notifications.indexOf(notification), 1);
    return this.setState({ notifications: notifications });
  }
}

export default NotificationsStore;
