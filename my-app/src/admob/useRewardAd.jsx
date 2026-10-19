```jsx
import { useEffect, useState, useRef } from 'react';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { useNetInfo } from '@react-native-community/netinfo';
import { Platform } from 'react-native';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'android'
    ? 'ca-app-pub-8349714207065837/4200015671'
    : TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId);

export function useRewardedAd() {
  const [loaded, setLoaded] = useState(false);
  const isLoading = useRef(false);
  const { isInternetReachable } = useNetInfo();

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        isLoading.current = false;
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        isLoading.current = false;
        rewarded.load();
      }
    );

    const unsubscribeFailed = rewarded.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setLoaded(false);
        isLoading.current = false;
      }
    );

    if (isInternetReachable !== false && !rewarded.loaded && !isLoading.current) {
      isLoading.current = true;
      rewarded.load();
    }

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [isInternetReachable]);

  const showAd = (onEarned, onClose) => {
    if (!loaded) return;

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        if (onEarned) onEarned(reward);
        unsubscribeEarned();
      }
    );

    const unsubscribeShowClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        unsubscribeShowClosed();
        if (onClose) onClose();
      }
    );

    rewarded.show();
  };

  return { loaded, showAd };
}
```