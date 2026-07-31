import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import VideoOptions from './VideoOptions';

jest.mock('../../../assets/favicon.png', () => 'deathstar.png');
jest.mock('./HelpButton', () => ({ children }) => children);

describe('VideoOptions', () => {
  it('promises delivery in a couple of minutes on every card', () => {
    const html = renderToStaticMarkup(
      <VideoOptions updatePaymentAmount={() => {}} />,
    );

    expect(html.match(/Ready in a couple of minutes/g) || []).toHaveLength(3);
  });
});
