### NOTICE

`Android` only
>> As i have no Macbook. My development envrionment is Ubuntu ^_^

### start

development mode
```
$ yarn install
$ yarn start
```

OR

download the `.apk` i have build by `$ exp build:android`

```
```

### data schema

There are 3 sets of data storaged in `AsyncStorage`.

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

3. `udaci:history` in `utils/history.js`

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