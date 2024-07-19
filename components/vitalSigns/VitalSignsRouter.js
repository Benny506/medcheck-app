import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors } from "../colors/colors";
import VitalSignsScreen from "./screens/VitalSignsScreen";



const Stack = createNativeStackNavigator();



export default function VitalSignsRouter({ 
    userDetails, setUserDetails, userLogout
}){
    return (
        <Stack.Navigator
            initialRouteName="VitalSigns"
            screenOptions={({ navigation }) => ({
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.F8F6FB
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
                name="VitalSigns"
                options={{
                    headerShown: false
                }}                
            >
                {
                    props => 
                        <VitalSignsScreen
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                            userLogout={userLogout}
                        />
                }
            </Stack.Screen>                   
        </Stack.Navigator>        
    )
}