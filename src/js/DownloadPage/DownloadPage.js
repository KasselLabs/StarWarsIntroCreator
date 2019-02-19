import { h, Component } from 'preact';
import {
  INITIAL_PAGE,
  REQUEST_PAGE,
  FINAL_PAGE,
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

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    const { status, openingKey } = props;

    this.state = {
      status,
      openingKey,
      page: INITIAL_PAGE,
      donate: false,
    };
  }

  yesDonateHandle = () => {
    this.setState({
      page: REQUEST_PAGE,
      donate: true,
    });
  };

  noDonateHandle = () => {
    this.setState({
      page: REQUEST_PAGE,
      donate: false,
    });
  };

  finishRequestHandle = (requestStatus, requestEmail) => {
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
    }
  }

  render() {
    const { status } = this.state;
    const canDonateToReceiveFaster = status === NOT_QUEUED || status === QUEUED;
    const title = canDonateToReceiveFaster ? 'donate and download' : 'download';
    return (
      <div>
        <h2>{title}</h2>
        {/* <iframe title="atat animation" src={iframeAtat} height="180px" width="100%" /> */}
        <Atat />
        {this.renderPageContent()}
      </div>
    );
  }
}

export default DownloadPage;
