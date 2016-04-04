import 'babel-polyfill';
import BetaBar from '../src';
import React from 'react';
import chai from 'chai';
chai.should();
import { stub } from 'sinon';
import BarWrapper from '@economist/component-bar-wrapper';

describe('BetaBar component', () => {
  /* eslint-disable init-declarations */
  let reactCookieInstance;
  beforeEach(() => {
    reactCookieInstance = {
      save: stub(),
      load: stub(),
    };
  });
  /* eslint-enable init-declarations */
  it('is compatible with React.Component', () => {
    BetaBar.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(
      <BetaBar/>
    ).should.equal(true);
  });
  describe('handleFallback', () => {
    it('sets a cookie', () => {
      const component = new BetaBar({
        cookieName: 'foo',
        cookieValue: 'bar',
        reactCookieInstance,
      }, {});
      component.handleFallback();
      reactCookieInstance.save.calledOnce.should.equal(true);
      reactCookieInstance.save.lastCall.args.should.eql([
        'foo',
        'bar',
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        },
      ]);
    });
    it('calls props.onFallback', () => {
      const onFallback = stub();
      const component = new BetaBar({
        cookieName: 'foo-close',
        cookieValue: 'bar-close',
        reactCookieInstance,
        onFallback,
      }, { });
      component.handleFallback();
      onFallback.calledOnce.should.equal(true);
    });
  });
  describe('handleDismiss', () => {
    it('sets a cookie', () => {
      const component = new BetaBar({
        closeCookieName: 'foo-close',
        closeCookieValue: 'bar-close',
        reactCookieInstance,
      }, {});
      stub(component, 'setState');
      component.handleDismiss();
      reactCookieInstance.save.calledOnce.should.equal(true);
      reactCookieInstance.save.lastCall.args.should.eql([
        'foo-close',
        'bar-close',
      ]);
      component.setState.lastCall.args[0].should.eql({
        wasDismissed: true,
      });
    });
    it('this cookie sets state.wasDismissed', () => {
      reactCookieInstance.load = stub().withArgs('foo-close').returns('bar-close');
      const component = new BetaBar({
        closeCookieName: 'foo-close',
        closeCookieValue: 'bar-close',
        reactCookieInstance,
      }, { });
      stub(component, 'setState');
      component.componentWillMount();
      component.setState.calledOnce.should.eql(true);
      component.setState.lastCall.args[0].should.eql({
        wasDismissed: true,
      });
    });
    it('when state.wasDismissed, nothing is rendered', () => {
      const component = new BetaBar({ });
      component.state.wasDismissed = true;
      const element = component.render();
      element.props.className.should.equal('beta-bar beta-bar--dismissed');
      element.type.should.equal(BarWrapper);
    });
  });
});
