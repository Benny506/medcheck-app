import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors, textColors } from "../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";
import AllDoctors from "./screens/AllDoctors";
import SingleDoctor from "./screens/SingleDoctor";
import { requestApi } from "../apiRequests/requestApi";
import SplashLoad from "../loaders/SplashLoad";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import NoData from "../errorMsg/NoData";


const Stack = createNativeStackNavigator();



export default function DoctorsRouter({ 
    userDetails, setUserDetails, userLogout, navigation, mainRouter_fullNavigateTo
}){

    const navigateTo = (path) => navigation.navigate(path)
    const goToHome = () => navigateTo('HomeStack')

    const [allDoctors, setAllDoctors] = useState()
    const [singleDoctor, setSingleDoctor] = useState()
    const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null })

    useEffect(() => {
        getAllDoctors()
    }, [])

    useEffect(() => {
        if(singleDoctor){
            navigateTo('SingleDoctor')
        }
    }, [singleDoctor])

    const getAllDoctors = async () => {
        try {

            const { accessToken } = userDetails.details

            const allDocs = await requestApi({ url: '/users/all-doctors', method: 'get', token: accessToken })

            const { responseStatus, result, errorMsg } = allDocs

            if(responseStatus){
                const { data } = result

                setAllDoctors(data)
                setApiReqs({ isLoading: false, errorMsg: null })

                return;
            } 


            throw new Error()

        } catch (error) {

            setUserDetails(prev => ({
                ...prev,
                alertModal: { message: 'Error fetching doctors', duration: 1000 }
            }))

            setApiReqs({ isLoading: false, errorMsg: 'Error fetching doctors' })
        }
    }

    return (
        <>
            {
                apiReqs.isLoading
                ?
                    <SplashLoad loadTxt={'Retrieving doctors...'} />
                :
                apiReqs.errorMsg
                ?
                    <NoData 
                        onPressFunc={goToHome} 
                        text={apiReqs.errorMsg} 
                        btnTxt={'Go Home'} 
                        BtnIcon={() => <FontAwesome5Icon size={20} name='clinic-medical' color={colors._1C2E49} />}
                    />
                :
                    <Stack.Navigator
                        initialRouteName="Doctors"
                        screenOptions={({ navigation }) => ({
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: colors.F8F6FB
                            },
                            title: '',
                            headerTitleStyle: [textColors.text_1C2E49, textSizeStyles.regularText, fontFamilyStyles.publicSansMedium],
                            headerBackVisible: false,
                            headerLeft: ({ canGoBack }) => 
                                canGoBack && 
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setSingleDoctor()
                                            navigation.goBack()
                                        }}
                                        style={{
                                            display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 20
                                        }} 
                                    >
                                        <EntypoIcon name="chevron-thin-left" size={20} color={'#000'} />
                                    </TouchableOpacity>                
                        })}                        
                    >
                        <Stack.Screen
                            name="AllDoctors"
                            options={{
                                headerShown: false
                            }}                
                        >
                            {
                                props => 
                                    <AllDoctors 
                                        {...props}
                                        setUserDetails={setUserDetails} 
                                        userDetails={userDetails}
                                        allDoctors={allDoctors}
                                        setSingleDoctor={setSingleDoctor}
                                        tabRouterNavigate={navigateTo}
                                    />
                            }
                        </Stack.Screen> 
                        <Stack.Screen
                            name="SingleDoctor"             
                        >
                            {
                                props => 
                                    <SingleDoctor 
                                        {...props}
                                        setUserDetails={setUserDetails} 
                                        userDetails={userDetails}
                                        userLogout={userLogout}
                                        singleDoctor={singleDoctor}
                                        tabRouterNavigate={navigateTo}
                                        mainRouter_fullNavigateTo={mainRouter_fullNavigateTo}
                                    />
                            }
                        </Stack.Screen>                                           
                    </Stack.Navigator>        
            }
        </>
    )
}