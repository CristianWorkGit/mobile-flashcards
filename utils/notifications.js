import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import moment from 'moment';

export const MOBILE_FLASHCARD_NOTIFICATIONS = 'mobile-flashcards:notifications';

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(MOBILE_FLASHCARD_NOTIFICATIONS).then(() =>
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

export function createNotification() {
  return {
    title: 'You need to study!',
    body: 'Complete at least one quiz today.',
    ios: {
      sound: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(MOBILE_FLASHCARD_NOTIFICATIONS)
    .then(JSON.parse)
    .then(data => {
      if (!data) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            const tomorrow = moment()
              .add(1, 'days')
              .set('hour', 20)
              .toDate();

            Notifications.cancelAllScheduledNotificationsAsync();
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(
              MOBILE_FLASHCARD_NOTIFICATIONS,
              JSON.stringify(true)
            );
          }
        });
      }
    });
}
