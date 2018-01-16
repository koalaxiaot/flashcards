import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import DeckInfoScreen from './DeckInfo';
import AddDeckScreen from './AddDeck';
import QuizScreen from './Quiz';
import AddCardScreen from './AddCard';
import AgendaScreen from './History';

export default MainNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  DeckInfo: {
    screen: DeckInfoScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Deck - ${navigation.state.params.deck.title}`
    })
  },
  AddDeck: {
    screen: AddDeckScreen,
    navigationOptions: {
      headerTitle: 'AddDeck'
    }
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      headerTitle: 'Quiz'
    }
  },
  AddCard: {
    screen: AddCardScreen,
    navigationOptions: {
      headerTitle: 'Add Card'
    }
  },
  History: {
    screen: AgendaScreen,
    navigationOptions: {
      headerTitle: 'History'
    }
  }
});