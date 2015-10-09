class NotificationsStore {
  constructor() {
    this.bindActions(this.alt.getActions('notifications'));

    this.bindListeners({
      onError: this.alt.getActions('requests').fail,
      onSuccess: this.alt.getActions('requests').success
    });
  }

  onAddNotification(notification) {
    this._setNotification(notification);
  }

  onSuccess(notification) {
    this._setNotification(notification, 'success');
  }

  onError(notification) {
    this._setNotification(notification, 'error');
  }

  onWarning(notification) {
    this._setNotification(notification, 'warning');
  }

  onInfo(notification) {
    this._setNotification(notification, 'info');
  }

  _setNotification(notification, level) {
    if (!notification) return this.setState();
    if (level) notification.level = level;
    return this.setState({ notification: notification });
  }
}

export default NotificationsStore;
