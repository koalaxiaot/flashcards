import { AsyncStorage, Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';

const NOTIFY_KEY = 'udaci:notifications';
const NOTIFY_CUSTOM_KEY = 'udaci:notifications_custom';

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

/** custom notify */
export const customNotification = (afterMinutes) => {
  AsyncStorage.getItem(NOTIFY_CUSTOM_KEY).then(JSON.parse).then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let day = new Date();
            day.setMinutes(day.getMinutes() + afterMinutes);
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: day,
                repeat: 'minute'
              }
            ).then(id => {
              AsyncStorage.setItem(NOTIFY_CUSTOM_KEY, JSON.stringify(id));
              Alert.alert('OK', `custom notification(${id}) at ${day.toLocaleString()}`);
            });
          }
        })
    } else {
      AsyncStorage.getItem(NOTIFY_CUSTOM_KEY).then(JSON.parse).then(id => {
        id != null && AsyncStorage.removeItem(NOTIFY_CUSTOM_KEY).then(Notifications.cancelScheduledNotificationAsync(id));
        Alert.alert('OK', `custom notification(${id}) cancelled.`);
      });
    }
  });
};