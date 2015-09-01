class NotificationsStore {
  constructor() {
    this.bindActions(this.alt.getActions('notifications'));

    this.bindListeners({
      handleRequestsError: this.alt.getActions('requests').fail
    });
  }

  handleRequestsError(payload) {
    payload.level = 'error';
    return this.setState({notification: payload});
  }

  onAddNotification(notification) {
    return this.setState({notification: notification});
  }

  onSuccess(notification) {
    return this.setState({notification: notification});
  }
}

export default NotificationsStore;
