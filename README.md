### NOTICE

`Android` only
> As i have no Macbook. My development envrionment is Ubuntu ^_^

Quiz screen, click the card to toggle answer/question.

##### Highlight

1. In order to facilitate `Notification` test, I add a custom notification (`toggle notification (1 minute)`) which repeat every 1 minute(5 minutes on my physical device[Samsung S8+]).
> You can click the button at `Home` route. It will add(cancel) the custom notification.
> All notifications(including custom) will be cancelled If you finish a quiz.

2. History route. You can get your quiz score in history list.
> react-native-calendars

### start

development mode
```
$ yarn install
$ yarn start
```

I also build a apk in expo.io
```
https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/android%2F%40lyra%2Fudacicards-b178ca55-fa85-11e7-8ea1-0a580a782406-signed.apk
```

### data schema

There are 4 sets of data storaged in `AsyncStorage`.

initial data:

1. `udaci:decks` in `utils/api.js`

```
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
```

2. `udaci:notification` in `utils/helpers.js`

```
'true'
```

3. `udaci:notification_custom` in `utils/helpers.js`

```
unique notification id
```

4. `udaci:history` in `utils/history.js`

```
  '2018-01-13': [
    {
      title: 'JavaScript',
      correct: 1,
      total: 1,
      time: '10:03:30'
    }
  ],
  '2018-01-14': [
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
```