import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Appearance, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import AuthRouter from './components/auth/AuthRouter';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import MainRouter from './components/main/MainRouter';
import SplashLoad from './components/loaders/SplashLoad';
import { onRequestApi } from './components/apiRequests/requestApi';
import { getValue, setValue } from './components/secureStore/secureStore';
import { colors } from './components/colors/colors';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Public Sans': require('./assets/fonts/PublicSans.ttf'),
    'Public Sans Medium': require('./assets/fonts/PublicSans-Medium.ttf'),
    'Public Sans Bold': require('./assets/fonts/PublicSans-Bold.ttf')
  });

  const [userDetails, setUserDetails] = useState()
  const [apiReqs, setApiReqs] = useState({ isLoading: true, error: null })

  useEffect(() => {
    initialFetch()
  }, [])


  const initialFetch = async () => {
    try {
      
      const accessToken = await getValue({ key: 'accessToken' })
      const user_id = await getValue({ key: 'user_id' })

      if(accessToken.value && user_id.value){

        return await onRequestApi({
          requestInfo: {
            url: `users/single-user/${user_id.value}`, 
            method: 'get', 
            token: accessToken.value
          },
          successCallBack: initialFetchSuccess,
          failureCallback: initialFetchFailure
        })

      } else{
        throw new Error()
      }


    } catch (error) {
      return initialFetchFailure({ errorMsg: 'Automatic login failed! Login manually.' })
    }
  }


  const initialFetchSuccess = ({ requestInfo, result }) => {
    const { data } = result
    const { userDetails, accessToken, vitalSigns, covidTestResults, doctorAppointments } = data

    setUserDetails(prev => ({
      ...prev,
      alertModal: null,
      vitalSigns,
      covidTestResults,
      doctorAppointments,
      details: {
        ...userDetails,
        accessToken
      }
    }))

    return setApiReqs({ isLoading: false, errorMsg: null })
  }

  const initialFetchFailure = ({ errorMsg }) => {
    setUserDetails(prev => ({
      ...prev,
      alertModal: {
        message: errorMsg,
        duration: 1000
      }
    }))

    return setApiReqs({ isLoading: false, error: errorMsg })
  }


  const userLogout = async () => {
    setUserDetails()
    await setValue({ key: 'user_id', value: null })
    await setValue({ key: 'accessToken', value: null })

    return;
  }

  if (!fontsLoaded) {
    return <></>
  }


  if(apiReqs.isLoading){
    return <SplashLoad />
  }


  if(userDetails && userDetails.details){

    const theme = Appearance.getColorScheme()

    return (
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
              backgroundColor={theme == 'light' ? colors.F8F6FB : '#000'}
              barStyle={theme == 'light' ? 'dark-content' : 'light-content'}
          />
          <MainRouter 
            userDetails={userDetails}
            userLogout={userLogout}
            setUserDetails={setUserDetails}
          />
        </SafeAreaView>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthRouter 
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}