import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import StackNavigator from './StackNavigator';
import { Provider } from 'react-redux';
import store from './Redux/Store';
export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
    <StackNavigator/>
    <StatusBar style="auto" />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
