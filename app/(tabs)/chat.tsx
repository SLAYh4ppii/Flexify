import { View, Text, FlatList, TextInput, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatCard from '@/components/ChatCard';
import { useStore } from '@/src/store/store';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ChatQuickAccessCard from '@/components/ChatQuickAccessCard';

const chat = memo(() => {

  const { userInfo, messages, getGeminiResponse, geminiLoading } = useStore((state) => ({
    messages: state.messages,
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading,
    userInfo: state.userInfo
  }))

  const [text, setText] = useState<string>("")

  const animation = useRef(null)

  return (
    <SafeAreaView className=' justify-between flex-1 px-4 bg-background'>
      <View className='flex-initial mb-2 '>
        <Text className='mb text-white text-xl font-bold'>Flexify AI !</Text>
        <Text className='text-gray-300 text-base'>Ask my Anything!</Text>
        {(messages?.length !== 0) ? (
          <Animated.FlatList
            entering={FadeIn}
            exiting={FadeOut}
            showsVerticalScrollIndicator={false}
            inverted
            className='mb-2'
            data={messages.toReversed()}
            renderItem={({ item }) => (
              <ChatCard chatItem={item}></ChatCard>
            )}
          />
        ) : null}
      </View>
      {(messages?.length === 0 && !geminiLoading) ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 justify-center'
        >
          <Text className='px-2 text-palelime text-4xl font-extralight text-bold'>Hello {userInfo?.user.givenName}!</Text>
          <Text className='px-2 text-white text-lg'>Need Help or Motivation? Ask me about exercise routines, meal plans, or any fitness questions! </Text>
          <View className='flex-row mt-10'>
            <ChatQuickAccessCard heading={'Workout Plan'} desc={'Get a 7 day Workout Plan!'} index={0} />
            <ChatQuickAccessCard heading={'Diet Plan'} desc={`Get a full day Diet Plan based on today's progress!`} index={1} />
          </View>
          <View className='flex-row'>
            <ChatQuickAccessCard heading={'Progress Review'} desc={'Check and Review your last 10 days of Progress!'} index={2} />
            <ChatQuickAccessCard heading={'Exercise Tips'} desc={`Get tips on how to perform exercises correctly!`} index={3} />
          </View>
        </Animated.View>
      ) : null}
      {(messages?.length === 0 && geminiLoading) ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 justify-center items-center'
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../assets/raw/ailoading.json')}
          />
        </Animated.View>
      ) : null}
      <View className=' mb-2 flex-row items-center justify-between'>
        <View className=' mr-2 py-2.5 flex-auto border-palelime border-2 rounded-full'>
          <TextInput
            className='px-5'
            value={text}
            onChangeText={setText}
            placeholder='Ask Flexify AI!'
            placeholderTextColor={'#CBD5E0'}
            style={{ color: 'white' }}
          />
        </View>
        <Pressable
          onPress={() => {
            useStore.setState({ messages: [...messages, { message: text, ai: false, time: new Date().toLocaleTimeString().slice(0, -3) }] })
            getGeminiResponse(text)
            setText("")
          }}
        >
          {!geminiLoading ? (
            <View className='bg-black p-4 rounded-full items-center justify-center'>
              <Image
                tintColor={'#D5FF5F'}
                className='w-[20] h-[20]'
                source={require('../../assets/icons/sendicon.png')}
              />
            </View>
          ) : (
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 50,
                height: 50,
              }}
              source={require('../../assets/raw/ailoading.json')}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  )
})

export default chat