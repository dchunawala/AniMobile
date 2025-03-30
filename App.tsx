import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import GuideScreen from './screens/GuideScreen';
import ProfileScreen from './screens/ProfileScreen';
import SightingsScreen from './screens/SightingsScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Map':
              iconName = 'map';
              break;
            case 'Sightings':
              iconName = 'paw';
              break;
            case 'Guide':
              iconName = 'book-open-variant';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#27ae60',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Sightings" component={SightingsScreen} />
      <Tab.Screen name="Guide" component={GuideScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Auth" 
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}