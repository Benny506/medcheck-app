import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Register from "./screens/Register";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import CustomAlert1 from "../alertModals/CustomAlert1";



const Stack = createNativeStackNavigator();



export default function AuthRouter({
    userDetails, setUserDetails, navigation
}){

    const [customAlert, setCustomAlert] = useState()

    useEffect(() => {
        if(userDetails){
            const { newRoute, details, alertModal } = userDetails

            if(newRoute){
                navigation.navigate(newRoute)
            }

            if(alertModal){
                setCustomAlert(alertModal)
            }
        }
    }, [userDetails])

    return (
        <>    
            <CustomAlert1 alertModal={customAlert} setAlertModal={setCustomAlert} />

            <Stack.Navigator
                initialRouteName="Register"
                screenOptions={({ navigation }) => ({
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#F8F6FB'
                    },
                    title: '',
                    headerBackVisible: false,
                    headerLeft: ({ canGoBack }) => 
                        canGoBack && 
                            <TouchableOpacity 
                                onPress={navigation.goBack}
                                style={{
                                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                                    paddingTop: 30
                                }} 
                            >
                                <EntypoIcon name="chevron-thin-left" size={20} color={'#000'} />
                            </TouchableOpacity>                
                })}                        
            >
                <Stack.Screen
                    name="Register"
                    options={{
                        headerShown: false
                    }}                
                >
                    {
                        props => 
                            <Register 
                                {...props}
                                setUserDetails={setUserDetails} 
                            />
                    }
                </Stack.Screen>

                <Stack.Screen
                    name="Login"               
                >
                    {
                        props => 
                            <Login 
                                {...props} 
                                setUserDetails={setUserDetails}
                            />
                    }
                </Stack.Screen>            
            </Stack.Navigator>
        </>
    )
}