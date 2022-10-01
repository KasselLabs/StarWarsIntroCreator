import React, { Component } from 'react';
import swal from 'sweetalert2';

import {
  NOT_QUEUED,
  QUEUED,
  BUMPED,
  RENDERING,
  RENDERED,
} from './constants';

import NotQueuedPageNew from './newFlow/NotQueuedPageNew';
import VideoRequestSentNew from './newFlow/VideoRequestSentNew';
import RequestDownloadPageNew from './newFlow/RequestDownloadPageNew';
import VideoQueuedPageNew from './newFlow/VideoQueuedPageNew';
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

    if (subpage === 'pay') {
      donate = true;
      page = REQUEST_PAGE;
    }

    if (subpage === 'request') {
      donate = false;
      page = REQUEST_PAGE;
    }

    if (subpage === 'add_email') {
      page = ADD_EMAIL_PAGE;
    }

    if (subpage === 'paid') {
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

    UrlHandler.goToDownloadPage(this.state.openingKey, 'paid');
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
    const { page, openingKey } = this.state;

    if (page === INITIAL_PAGE) {
      swal({
        title: 'pay',
        html: '<p>Fill the payment form above to make your payment first.</p>',
      });
      return;
    }

    this.setState({ page: INITIAL_PAGE });
    UrlHandler.goToDownloadPage(openingKey);
  };

  noDonateHandle = () => {
    const { openingKey } = this.state;
    UrlHandler.goToDownloadPage(openingKey, 'request');
  };

  finishRequestHandle = (requestStatus, requestEmail) => {
    const { donate, openingKey } = this.state;
    UrlHandler.goToDownloadPage(openingKey, donate ? 'paid' : '');
    this.setState({
      page: FINAL_PAGE,
      requestStatus,
      requestEmail,
    });
  }

  addEmailNextPage = (requestStatus, requestEmail) => {
    this.setState({
      status: requestStatus,
      requestStatus,
      requestEmail,
    });
  }

  renderInitialPage() {
    const { status, openingKey, requestEmail } = this.state;
    const statusType = status.status;

    switch (statusType) {
      default:
      case NOT_QUEUED:
        return (
          <NotQueuedPageNew
            openingKey={openingKey}
            finishRequestHandle={this.addEmailNextPage}
          />
        );

      case QUEUED:
        return (
          <VideoQueuedPageNew
            status={status}
            requestEmail={requestEmail}
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

    switch (page) {
      default:
      case INITIAL_PAGE:
        return this.renderInitialPage();

      case REQUEST_PAGE:
        return (
          <RequestDownloadPageNew
            donate={donate}
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            finishRequestHandle={this.finishRequestHandle}
          />
        );

      case FINAL_PAGE:
        return (
          <VideoRequestSentNew
            requestStatus={requestStatus}
            requestEmail={requestEmail}
            openingKey={openingKey}
            donate={donate}
            paymentData={paymentData}
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
    const canDonateToReceiveFaster = status === QUEUED;
    const title = canDonateToReceiveFaster ? 'payment and download' : 'download';
    return (
      <div>
        <h2>{title}</h2>
        {this.renderPageContent()}
      </div>
    );
  }
}

export default DownloadPage;
