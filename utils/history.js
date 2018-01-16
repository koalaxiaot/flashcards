import { AsyncStorage } from 'react-native';

const HISTORY_KEY = 'udaci:history';

const initData = {
  '2018-01-13': [
    {
      title: 'JavaScript',
      correct: 1,
      total: 1,
      time: '10:03:30'
    }
  ],
  '2018-01-15': [
    {
      title: 'JavaScript',
      correct: 0,
      total: 1,
      time: '12:03:30'
    },
    {
      title: 'React',
      correct: 1,
      total: 2,
      time: '11:03:30'
    }
  ]
};

export const initHistory = () => {
  const start = new Date('01/13/2018');
  const end = (new Date()).setDate((new Date()).getDate() + 1);
  let tmp = start;
  let result = {};
  while (tmp <= end) {
    result[tmp.toISOString().split('T')[0]] = [];
    tmp.setDate(tmp.getDate() + 1);
  }
  return result;
};

export const addHistory = (date, item) => fetchHistory().then(history => {
  let new_day_arr = history[date] || [];
  new_day_arr = new_day_arr.filter(i => i.title !== item.title);
  new_day_arr.push(item);
  const new_history = { ...new_history, ...{ [date]: new_day_arr } };
  AsyncStorage.mergeItem(HISTORY_KEY, JSON.stringify(new_history));
});

export const fetchHistory = () => AsyncStorage.getItem(HISTORY_KEY).then(data => data ? JSON.parse(data) : initData);

// init
AsyncStorage.getItem(HISTORY_KEY).then(data => !data && AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(initData)));