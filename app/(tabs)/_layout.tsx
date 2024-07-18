import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/Expandable/navigation/TabBarIcon';
import { Image, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D5FF5F',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:'#1E1E25',
        tabBarInactiveBackgroundColor:'#1E1E25',
        tabBarStyle: {
          backgroundColor:'#161622',
          borderTopWidth:0,
          height:50
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('../../assets/icons/home.png')} className='w-[25] h-[25]' tintColor={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Two',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('../../assets/icons/meal.png')} className='w-[30] h-[30]' tintColor={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'stats',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('../../assets/icons/stats.png')} className='w-[30] h-[30]' tintColor={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Four',
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('../../assets/icons/chat.png')} className='w-[30] h-[30]' tintColor={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
