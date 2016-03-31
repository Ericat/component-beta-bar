'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _economistComponentLinkButton = require('@economist/component-link-button');

var _economistComponentLinkButton2 = _interopRequireDefault(_economistComponentLinkButton);

/* eslint-disable id-match */
/* eslint-disable  react/display-name */

var _reactI13n = require('react-i13n');

var I13nFeedbackLink = _reactI13n.createI13nNode(_economistComponentLinkButton2['default'], {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true
});

var I13nFallbackLink = _reactI13n.createI13nNode('a', {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true
});

// this ensures the cookie is never written
var fakeCookie = {
  load: function load() {},
  save: function save() {}
};
exports['default'] = _react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_2['default'], { reactCookieInstance: fakeCookie }),
  _react2['default'].createElement(
    'p',
    null,
    'Tracked version'
  ),
  _react2['default'].createElement(_2['default'], { reactCookieInstance: fakeCookie,
    renderFeedbackLink: function (props) {
      return _react2['default'].createElement(I13nFeedbackLink, _extends({
        i13nModel: {
          action: 'click',
          element: 'Feedback link'
        }
      }, props));
    },
    renderFallbackLink: function (props) {
      return _react2['default'].createElement(I13nFallbackLink, _extends({ i13nModel: {
          action: 'click',
          element: 'Fallback version link'
        }
      }, props));
    }
  })
);
module.exports = exports['default'];