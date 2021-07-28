import React, { Component } from 'react';
import swal from 'sweetalert2';

import {
  NOT_QUEUED,
  QUEUED,
  BUMPED,
  RENDERING,
  RENDERED,
} from './constants';

import NotQueuedPage from './NotQueuedPage';
import NotQueuedPageNew from './newFlow/NotQueuedPageNew';
import VideoRequestSentNew from './newFlow/VideoRequestSentNew';
import RequestDownloadPageNew from './newFlow/RequestDownloadPageNew';
import RequestDownloadPage from './RequestDownloadPage';
import VideoQueuedPage from './VideoQueuedPage';
import VideoQueuedPageNew from './newFlow/VideoQueuedPageNew';
import VideoRequestSent from './VideoRequestSent';
import RenderingPage from './RenderingPage';
import RenderedPage from './RenderedPage';
import AddEmailForm from './AddEmailForm';
import { requestIntroDownload } from '../api/actions';
import { trackOpenedDownloadModal } from '../api/tracking';

import { registerPaymentEventsHandler, unregisterPaymentEventsHandler } from './paymentEventsHandler';
import UrlHandler from '../extras/UrlHandler';

const INITIAL_PAGE = 0;
const REQUEST_PAGE = 1;
const FINAL_PAGE = 2;
const ADD_EMAIL_PAGE = 3;

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    const { status, openingKey, subpage } = props;

    const isRendered = status.status === RENDERED;

    const subpageState = isRendered ? {} : this.parseSubpage(subpage);

    this.state = {
      status,
      openingKey,
      ...subpageState,
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.urlChangeHandler);
    registerPaymentEventsHandler(this.paymentSuccessCallback);
    trackOpenedDownloadModal();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.urlChangeHandler);
    unregisterPaymentEventsHandler();
  }

  parseSubpage = (subpage) => {
    let page = INITIAL_PAGE;
    let donate = false;

    if ('donate' === subpage) {
      donate = true;
      page = REQUEST_PAGE;
    }

    if ('request' === subpage) {
      donate = false;
      page = REQUEST_PAGE;
    }

    if ('add_email' === subpage) {
      page = ADD_EMAIL_PAGE;
    }

    if ('donated' === subpage) {
      donate = true;
      page = FINAL_PAGE;
    }

    return {
      page,
      donate,
    };
  }

  paymentSuccessCallback = async (payment) => {
    const { email } = payment;

    const requestStatus = await requestIntroDownload(this.state.openingKey, email);
    this.setState({
      page: FINAL_PAGE,
      donate: true,
      requestStatus,
      requestEmail: email,
      paymentData: payment,
    });

    UrlHandler.goToDownloadPage(this.state.openingKey, 'donated');
  }

  urlChangeHandler = () => {
    const { key, subpage } = UrlHandler.getParams();

    if (key !== this.state.openingKey) {
      window.location.reload();
      return;
    }

    if (!subpage) {
      return;
    }

    const subpageState = this.parseSubpage(subpage);
    this.setState(subpageState);
  }

  yesDonateHandle = () => {
    const { paymentFlowAB } = window;
    const { page, openingKey } = this.state;

    if ('new' === paymentFlowAB) {
      if (page === INITIAL_PAGE) {
        swal({
          title: 'donate',
          html: '<p>Fill the payment form above to make your payment first.</p>',
        });
        return;
      }

      this.setState({ page: INITIAL_PAGE });
      UrlHandler.goToDownloadPage(openingKey);
      return;
    }
    UrlHandler.goToDownloadPage(openingKey, 'donate');
  };

  noDonateHandle = () => {
    const { openingKey } = this.state;
    UrlHandler.goToDownloadPage(openingKey, 'request');
  };

  finishRequestHandle = (requestStatus, requestEmail) => {
    const { donate, openingKey } = this.state;
    UrlHandler.goToDownloadPage(openingKey, donate ? 'donated' : '');
    this.setState({
      page: FINAL_PAGE,
      requestStatus,
      requestEmail,
    });
  }

  renderInitialPage() {
    const { status, openingKey } = this.state;
    const statusType = status.status;
    const { paymentFlowAB } = window;

    switch (statusType) {
      default:
      case NOT_QUEUED:
        if ('new' === paymentFlowAB) {
          return (
            <NotQueuedPageNew
              status={status}
              openingKey={openingKey}
              yesDonateHandle={this.yesDonateHandle}
              noDonateHandle={this.noDonateHandle}
            />
          );
        }
        return (
          <NotQueuedPage
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            noDonateHandle={this.noDonateHandle}
          />
        );

      case QUEUED:
        if ('new' === paymentFlowAB) {
          return (
            <VideoQueuedPageNew
              status={status}
              openingKey={openingKey}
              yesDonateHandle={this.yesDonateHandle}
              noDonateHandle={this.noDonateHandle}
            />
          );
        }

        return (
          <VideoQueuedPage
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            noDonateHandle={this.noDonateHandle}
          />
        );

      case RENDERING:
      case BUMPED:
        return (
          <RenderingPage
            statusType={statusType}
            openingKey={openingKey}
            finishRequestHandle={this.finishRequestHandle}
          />
        );

      case RENDERED:
        return (
          <RenderedPage
            status={status}
          />
        );
    }
  }

  renderPageContent = () => {
    const {
      page,
      openingKey,
      donate,
      status,
      requestStatus,
      requestEmail,
      paymentData,
    } = this.state;
    const { paymentFlowAB } = window;

    switch (page) {
      default:
      case INITIAL_PAGE:
        return this.renderInitialPage();

      case REQUEST_PAGE:
        if ('new' === paymentFlowAB) {
          return (
            <RequestDownloadPageNew
              donate={donate}
              status={status}
              openingKey={openingKey}
              yesDonateHandle={this.yesDonateHandle}
              finishRequestHandle={this.finishRequestHandle}
            />
          );
        }

        return (
          <RequestDownloadPage
            donate={donate}
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            finishRequestHandle={this.finishRequestHandle}
          />
        );

      case FINAL_PAGE:
        if ('new' === paymentFlowAB) {
          return (
            <VideoRequestSentNew
              requestStatus={requestStatus}
              requestEmail={requestEmail}
              openingKey={openingKey}
              donate={donate}
              paymentData={paymentData}
            />
          );
        }

        return (
          <VideoRequestSent
            requestStatus={requestStatus}
            requestEmail={requestEmail}
            openingKey={openingKey}
            donate={donate}
          />
        );

      case ADD_EMAIL_PAGE:
        return (
          <AddEmailForm
            openingKey={openingKey}
            finishRequestHandle={this.finishRequestHandle}
          />
        );
    }
  }

  render() {
    const { status } = this.state.status;
    const canDonateToReceiveFaster = status === NOT_QUEUED || status === QUEUED;
    const title = canDonateToReceiveFaster ? 'donate and download' : 'download';
    return (
      <div>
        <h2>{title}</h2>
        {this.renderPageContent()}
      </div>
    );
  }
}

export default DownloadPage;
