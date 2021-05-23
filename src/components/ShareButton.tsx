import React from 'react';
import { useSelector } from 'react-redux';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { useUserName } from '../hooks';
import { RootState } from '../store';

export default function ShareButton() {
  const { shortWindow, longWindow } = useSelector(
    (state: RootState) => state.settings
  );
  const [userId] = useUserName();
  const url = `https://atcoder-chart.web.app/user=${userId}&short=${shortWindow}&long=${longWindow}`;

  return (
    <div className='share-button'>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <div>&nbsp;</div>
    </div>
  );
}
