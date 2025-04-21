'use client';

import { useEffect, useState } from 'react';
import ShowcaseText from '../Showcase/ShowcaseText';
import styles from './featuresmobile.module.scss';
import ShowcaseAlbumMobile from './ShowcaseAlbumMobile/ShowcaseAlbumMobile';
import ShowcasePortsMobile from './ShowcasePortsMobile/ShowcasePortsMobile';
import ShowcaseSocailMobile from './ShowcaseSocialMobile/ShowcaseSocailMobile';

function isMobileUserAgent() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|android|mobile/.test(ua);
}

export default function FeaturesMobile() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 724 || isMobileUserAgent();
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 724 || isMobileUserAgent()) {
        setShouldRender(true);
      } else {
        setShouldRender(false);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={styles.wrapper}>
      <ShowcaseText inline={true} />
      <ShowcaseAlbumMobile />
      <ShowcaseSocailMobile />
      <ShowcasePortsMobile />
    </div>
  );
}
