/* global window document */
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _economistComponentIcon = require('@economist/component-icon');

var _economistComponentIcon2 = _interopRequireDefault(_economistComponentIcon);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _economistComponentLinkButton = require('@economist/component-link-button');

var _economistComponentLinkButton2 = _interopRequireDefault(_economistComponentLinkButton);

var _economistComponentBarWrapper = require('@economist/component-bar-wrapper');

var _economistComponentBarWrapper2 = _interopRequireDefault(_economistComponentBarWrapper);

var googleForm = 'https://docs.google.com/forms/d/1ZCdwituoyhHAPKjCKvDvzRp66zwOv23GrCPH4rGINrE/viewform';

var BetaBar = (function (_React$Component) {
  _inherits(BetaBar, _React$Component);

  _createClass(BetaBar, null, [{
    key: 'propTypes',
    value: {
      className: _react2['default'].PropTypes.string,
      cookieName: _react2['default'].PropTypes.string,
      cookieValue: _react2['default'].PropTypes.string,
      closeCookieName: _react2['default'].PropTypes.string,
      closeCookieValue: _react2['default'].PropTypes.string,
      reactCookieInstance: _react2['default'].PropTypes.shape({
        save: _react2['default'].PropTypes.func
      }),
      onFallback: _react2['default'].PropTypes.func,
      alwaysHideCloseButton: _react2['default'].PropTypes.bool,
      stillRenderWhenClosed: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      cookieName: 'ec_blogsab',
      cookieValue: 'a',
      closeCookieName: 'ec_rvmp_beta_close',
      closeCookieValue: 'x',
      reactCookieInstance: _reactCookie2['default']
    },
    enumerable: true
  }]);

  function BetaBar() {
    _classCallCheck(this, BetaBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _React$Component.call.apply(_React$Component, [this].concat(args));
    this.handleFallback = this.handleFallback.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    if (!this.state) {
      this.state = {};
    }
  }

  BetaBar.prototype.handleFallback = function handleFallback(event) {
    if (typeof window === 'undefined') {
      return;
    }
    var _props = this.props;
    var cookieName = _props.cookieName;
    var cookieValue = _props.cookieValue;
    var reactCookieInstance = _props.reactCookieInstance;

    if (cookieName && cookieValue && reactCookieInstance) {
      reactCookieInstance.save(cookieName, cookieValue, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      if (this.props.onFallback) {
        this.props.onFallback();
      }
    }

    if (event) {
      event.preventDefault();
    }
  };

  BetaBar.prototype.handleDismiss = function handleDismiss(event) {
    var _props2 = this.props;
    var closeCookieName = _props2.closeCookieName;
    var closeCookieValue = _props2.closeCookieValue;
    var reactCookieInstance = _props2.reactCookieInstance;

    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      reactCookieInstance.save(closeCookieName, closeCookieValue);
    }

    this.setState({ wasDismissed: true });

    if (event) {
      event.preventDefault();
    }
  };

  BetaBar.prototype.componentWillMount = function componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }
    var _props3 = this.props;
    var closeCookieName = _props3.closeCookieName;
    var closeCookieValue = _props3.closeCookieValue;
    var reactCookieInstance = _props3.reactCookieInstance;

    if (closeCookieName && closeCookieValue && reactCookieInstance) {
      this.setState({
        wasDismissed: reactCookieInstance.load(this.props.closeCookieName) === this.props.closeCookieValue
      });
    }
  };

  BetaBar.prototype.render = function render() {
    var classNames = ['beta-bar'];
    if (this.state && this.state.wasDismissed) {
      classNames = classNames.concat(['beta-bar--dismissed']);
    }

    if (this.props.className) {
      classNames = classNames.concat([this.props.className]);
    }

    var feedbackButtonProps = { className: "beta-bar--feedback", href: googleForm, target: "_blank", children: 'Leave feedback' };
    var feedbackButton = this.props.renderFeedbackLink ? this.props.renderFeedbackLink(feedbackButtonProps) : _react2['default'].createElement(_economistComponentLinkButton2['default'], feedbackButtonProps);

    var fallbackButtonProps = { className: "beta-bar--old-version", href: "#", onClick: this.handleFallback, children: 'Back to old version' };
    var fallbackButton = this.props.renderFallbackLink ? this.props.renderFallbackLink(fallbackButtonProps) : _react2['default'].createElement('a', fallbackButtonProps);

    var displayCloseButton = !(this.state && this.state.wasDismissed) && this.props.alwaysHideCloseButton !== true;

    return _react2['default'].createElement(
      _economistComponentBarWrapper2['default'],
      { className: classNames.join(' '), classNamePrefix: 'beta-bar', onClose: this.handleDismiss, close: displayCloseButton, stillRenderWhenClosed: this.props.stillRenderWhenClosed },
      'You are viewing a beta release of',
      _react2['default'].createElement(
        'span',
        { className: 'beta-bar--message-economist' },
        " The Economist "
      ),
      'website. Please tell us what you think.',
      _react2['default'].createElement(
        'div',
        { className: 'beta-bar--buttons-wrapper' },
        feedbackButton,
        fallbackButton
      )
    );
  };

  return BetaBar;
})(_react2['default'].Component);

exports['default'] = BetaBar;
module.exports = exports['default'];