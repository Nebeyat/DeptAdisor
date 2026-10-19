```jsx
import { useEffect, useState, useRef } from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { useNetInfo } from '@react-native-community/netinfo';
import { Platform } from 'react-native';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
    ? 'ca-app-pub-8349714207065837/7995790453'
    : TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export function useInterstitialAd() {
  const { isInternetReachable } = useNetInfo();
  const [isInLoaded, setInLoaded] = useState(false);
  const isLoading = useRef(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInLoaded(true);
        isLoading.current = false;
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInLoaded(false);
        isLoading.current = false;
        interstitial.load();
      }
    );

    const unsubscribeFailed = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setInLoaded(false);
        isLoading.current = false;
      }
    );

    if (isInternetReachable !== false && !interstitial.loaded && !isLoading.current) {
      isLoading.current = true;
      interstitial.load();
    }

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [isInternetReachable]);

  const showInAd = (onClose) => {
    if (!isInLoaded) return;

    interstitial.show();
    if (onClose) onClose();
  };

  return { isInLoaded, showInAd };
}
```