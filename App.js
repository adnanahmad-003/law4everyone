import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import AuthStackNavigator from './Navigators/Main/AuthNavigation'
import { Provider } from 'react-redux';
import store from './Redux/Store';
export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
    <AuthStackNavigator/>
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
