import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const NOTIFY_KEY = 'udaci:notifications'

// FlatList use. objs => array with key
export const obj2arr = obj => Object.keys(obj).map(k => ({
  key: k,
  ...obj[k]
}));

export const today = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const clearLocalNotification = () =>
  AsyncStorage.removeItem(NOTIFY_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);

const createNotification = () => ({
  title: 'start your quiz test!',
  body: '👋 start your quiz for today!',
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFY_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {

              Notifications.cancelAllScheduledNotificationsAsync();

              let tommorrow = new Date();
              tommorrow.setDate(tommorrow.getDate() + 1)
              tommorrow.setHours(20)
              tommorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tommorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFY_KEY, JSON.stringify(true));
            }
          })
      }
    });
};