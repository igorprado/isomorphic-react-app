import React, {Component, PropTypes} from 'react/addons';

import Header from 'components/header';
import Footer from 'components/footer';

import Notifications from 'react-notification-system';

if (process.env.BROWSER) {
  require('styles/app.css');
}

class App extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  constructor(props, context) {
    super(props, context);

    this._handleNotificationChange = this._handleNotificationChange.bind(this);

    this.state = {
      i18n: props.flux
        .getStore('locale')
        .getState()
    };
  }

  componentDidMount() {
    this.props.flux
      .getStore('locale')
      .listen(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .listen(this._handlePageTitleChange);

    this.props.flux
      .getStore('notifications')
      .listen(this._handleNotificationChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('locale')
      .unlisten(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .unlisten(this._handlePageTitleChange);

    this.props.flux
      .getStore('notifications')
      .unlisten(this._handleNotificationChange);
  }

  _handleLocaleChange = (i18n) => {
    return this.setState({i18n});
  }

  _handlePageTitleChange({title}) {
    document.title = title;
  }

  _handleNotificationChange(notification) {
    this.refs.notifications.addNotification(notification.notification);
  }

  // If we have children components sent by `react-router`
  // we need to clone them and add them the correct
  // locale and messages sent from the Locale Store
  renderChild = (child) => {
    return React.addons
      .cloneWithProps(child, {...this.state.i18n});
  }

  render() {
    return (
      <div>
        <Header
          {...this.state.i18n}
          flux={this.props.flux} />
        <hr />
        {
          React.Children
            .map(this.props.children, this.renderChild)
        }
        <hr />
        <Footer />
        <Notifications ref="notifications" />
      </div>
    );
  }

}

export default App;
