import { h, Component } from 'preact';
import {
  NOT_QUEUED,
  QUEUED,
  BUMPED,
  RENDERING,
  RENDERED,
} from './constants';

import Atat from './Atat';

import NotQueuedPage from './NotQueuedPage';
import RequestDownloadPage from './RequestDownloadPage';
import VideoQueuedPage from './VideoQueuedPage';
import VideoRequestSent from './VideoRequestSent';
import RenderingPage from './RenderingPage';
import RenderedPage from './RenderedPage';
import AddEmailForm from './AddEmailForm';

import UrlHandler from '../extras/UrlHandler';

const INITIAL_PAGE = 0;
const REQUEST_PAGE = 1;
const FINAL_PAGE = 2;
const ADD_EMAIL_PAGE = 3;

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    const { status, openingKey, subpage } = props;

    const subpageState = this.parseSubpage(subpage);

    this.state = {
      status,
      openingKey,
      ...subpageState,
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.urlChangeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.urlChangeHandler);
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

    return {
      page,
      donate,
    };
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
    UrlHandler.goToDownloadPage(this.state.openingKey, 'donate');
  };

  noDonateHandle = () => {
    UrlHandler.goToDownloadPage(this.state.openingKey, 'request');
  };

  finishRequestHandle = (requestStatus, requestEmail) => {
    UrlHandler.goToDownloadPage(this.state.openingKey);
    this.setState({
      page: FINAL_PAGE,
      requestStatus,
      requestEmail,
    });
  }

  renderInitialPage() {
    const { status, openingKey } = this.state;
    const statusType = status.status;
    switch (statusType) {
      default:
      case NOT_QUEUED:
        return (
          <NotQueuedPage
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            noDonateHandle={this.noDonateHandle}
          />
        );

      case QUEUED:
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
    } = this.state;

    switch (page) {
      default:
      case INITIAL_PAGE:
        return this.renderInitialPage();

      case REQUEST_PAGE:
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
        <Atat />
        {this.renderPageContent()}
      </div>
    );
  }
}

export default DownloadPage;
