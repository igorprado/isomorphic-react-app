class NotificationsActions {

  constructor() {
    this.generateActions('addNotification');
  }

  // Creating aliases: success, error, warning and info
  success(notification) {
    notification.level = 'success';
    this.dispatch(notification);
  }

  error(notification) {
    notification.level = 'error';
    this.dispatch(notification);
  }

  warning(notification) {
    notification.level = 'warning';
    this.dispatch(notification);
  }

  info(notification) {
    notification.level = 'info';
    this.dispatch(notification);
  }
}

export default NotificationsActions;
