class NotificationStore {
  constructor() {
    this.bindActions(this.alt.getActions('notification'));

    this.state = {
      notification: null,
      intent: null
    };
  }

  onAdd(notification) {
    return this._add(notification);
  }

  onRemove(notification) {
    return this._remove(notification);
  }

  onSuccess(notification) {
    return this._add(notification, 'success');
  }

  onError(notification) {
    return this._add(notification, 'error');
  }

  onWarning(notification) {
    return this._add(notification, 'warning');
  }

  onInfo(notification) {
    return this._add(notification, 'info');
  }

  _add(notification, level) {
    if (!notification) return false;
    if (level) notification.level = level;
    notification.onAdd = this._onAddWrapper.bind(this, notification.onAdd);
    notification.onRemove = this._onRemoveWrapper.bind(this, notification.onRemove);
    return this.setState({ notification, intent: 'add' });
  }

  _onAddWrapper(originalCallback, notification) {
    if (typeof originalCallback === 'function') {
      originalCallback(notification);
    }
    this.alt.getActions('notifications').successfullyAdded.defer(notification);
  }

  _onRemoveWrapper(originalCallback, notification) {
    if (typeof originalCallback === 'function') {
      originalCallback(notification);
    }
    this.alt.getActions('notifications').successfullyRemoved.defer(notification);
  }

  _remove(notification) {
    return this.setState({ notification, intent: 'remove' });
  }
}

export default NotificationStore;
