import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ProfileScreen from "./screens/ProfileScreen";
import { colors, textColors } from "../colors/colors";
import EditProfileScreen from "./screens/EditProfileScreen";
import ResultStatsScreen from "../home/screens/ResultStatsScreen";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";



const Stack = createNativeStackNavigator();



export default function ProfileRouter({ 
    userDetails, setUserDetails, userLogout, navigation
}){

    const navigateTo = (path) => navigation.navigate(path)

    return (
        <Stack.Navigator
            initialRouteName="Profile"
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
                            onPress={navigation.goBack}
                            style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 20
                            }} 
                        >
                            <EntypoIcon name="chevron-thin-left" size={20} color={'#000'} />
                        </TouchableOpacity>                
            })}                        
        >
            <Stack.Screen
                name="Profile"
                options={{
                    headerShown: false
                }}                
            >
                {
                    props => 
                        <ProfileScreen 
                            {...props}
                            setUserDetails={setUserDetails} 
                            userDetails={userDetails}
                            userLogout={userLogout}
                            tabRouterNavigate={navigateTo}
                        />
                }
            </Stack.Screen>
            <Stack.Screen
                name="EditProfile"                
            >
                {
                    props => 
                        <EditProfileScreen 
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
        </Stack.Navigator>        
    )
}