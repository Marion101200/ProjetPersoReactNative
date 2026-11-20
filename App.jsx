import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgb(231, 85, 11)"
        />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}