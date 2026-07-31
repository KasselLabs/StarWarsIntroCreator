import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import NotQueuedPage from './NotQueuedPageNew';
import RequestDownloadPage from './RequestDownloadPageNew';
import VideoQueuedPage from './VideoQueuedPageNew';

jest.mock('./DonateOrNotDonateNew', () => () => null);
jest.mock('../TermsOfServiceAcceptance', () => () => null);
jest.mock('../ContactButton', () => () => null);
jest.mock('../EmailRequestField', () => () => null);
jest.mock('../PaymentModule', () => () => null);
jest.mock('../Atat', () => () => null);
jest.mock('../../extras/auxiliar', () => ({
  calculateTimeToRender: () => ' 30 minutes',
}));

const watermarkDisclosure = /include a Kassel Labs watermark unless you pay/i;

describe('free-tier download copy', () => {
  it('discloses the watermark before the user requests a video', () => {
    const html = renderToStaticMarkup(
      <NotQueuedPage openingKey="ABC123" finishRequestHandle={() => {}} />,
    );
    expect(html).toMatch(watermarkDisclosure);
  });

  it('discloses the watermark on the request screen', () => {
    const html = renderToStaticMarkup(
      <RequestDownloadPage
        status={{ status: 'not_queued', queueSize: 10 }}
        openingKey="ABC123"
        finishRequestHandle={() => {}}
      />,
    );
    expect(html).toMatch(watermarkDisclosure);
  });

  it('discloses the watermark while the video is queued', () => {
    const html = renderToStaticMarkup(
      <VideoQueuedPage status={{ queuePosition: 10 }} openingKey="ABC123" />,
    );
    expect(html).toMatch(watermarkDisclosure);
  });
});
