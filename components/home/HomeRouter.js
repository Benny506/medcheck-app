import React from "react";
import Home from "./screens/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import CovidTest from "./screens/covid19Test/CovidTest";
import CovidTestWelcome from "./screens/covid19Test/CovidTestWelcome";
import TestEnd from "./auxiliary/covid19Test/TestEnd";
import ResultStatsScreen from "./screens/ResultStatsScreen";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";
import { colors, textColors } from "../colors/colors";
import Appointments from "./screens/Appointments";



const Stack = createNativeStackNavigator();



export default function HomeRouter({ 
    userDetails, setUserDetails, navigation
}){

    const navigateTo = (path) => navigation.navigate(path)

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#F8F6FB'
                },
                headerTitleStyle: [textColors.text_1C2E49, textSizeStyles.regularText, fontFamilyStyles.publicSansMedium],
                title: '',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => 
                    canGoBack && 
                        <TouchableOpacity 
                            onPress={navigation.goBack}
                            style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                                marginRight: 20
                            }} 
                        >
                            <EntypoIcon name="chevron-thin-left" size={20} color={'#000'} />
                        </TouchableOpacity>                
            })}                        
        >
            <Stack.Screen
                name="HomeScreen"
                options={{
                    headerShown: false
                }}                
            >
                {
                    props => 
                        <Home 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                            tabRouterNavigate={navigateTo}
                        />
                }
            </Stack.Screen> 

            <Stack.Screen
                name="CovidTestWelcomeScreen"
                options={{
                    headerShown: false
                }}                
            >
                {
                    props => 
                        <CovidTestWelcome
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                        />
                }
            </Stack.Screen> 

            <Stack.Screen
                name="CovidTestScreen"
                options={{
                }}                
            >
                {
                    props => 
                        <CovidTest 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                        />
                }
            </Stack.Screen>

            <Stack.Screen
                name="TestEndScreen"
                options={{
                    headerShown: false
                }}                
            >
                {
                    props => 
                        <TestEnd 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                        />
                }
            </Stack.Screen> 

            <Stack.Screen
                name="ResultStatsScreen"    
                options={{
                    title: 'Result statistics'
                }}
            >
                {
                    props => 
                        <ResultStatsScreen 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                        />
                }
            </Stack.Screen>

            <Stack.Screen
                name="Appointments"    
                options={{
                    title: 'Appointments'
                }}
            >
                {
                    props => 
                        <Appointments 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                            tabRouterNavigate={navigateTo}
                        />
                }
            </Stack.Screen>                                                           
        </Stack.Navigator>        
    )
}