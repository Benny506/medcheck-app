import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomAlert1 from '../alertModals/CustomAlert1';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import HomeRouter from '../home/HomeRouter';
import ProfileRouter from '../profile/ProfileRouter';
import VitalSignsRouter from '../vitalSigns/VitalSignsRouter';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import DoctorsRouter from '../doctors/DoctorsRouter';
import { useNavigation, useNavigationState } from '@react-navigation/native';




const Tab = createBottomTabNavigator();


export default function MainRouter({
    userDetails, setUserDetails, userLogout
}){

    const fullNavigation = useNavigation()

    const mainRouter_fullNavigateTo = (path, data) => fullNavigation.reset({
        index: 0,
        routes: [{name: path, params: data}]
    })

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
            {
                customAlert
                    &&
                    <CustomAlert1 alertModal={customAlert} setAlertModal={setCustomAlert} />                
            }
            
            <Tab.Navigator
                initialRouteName='HomeStack'
                screenOptions={({ route, navigation }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => navigation.navigate(route.name)} 
                                style={{
                                    flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',                      
                                }}
                            >
                                {
                                    route.name == 'HomeStack'
                                    ?
                                        <FontAwesome5Icon size={20} name='clinic-medical' color={focused ? "#1C2E49" : '#0D0D0D'} />
                                    :
                                    route.name == "ProfileStack"
                                    ?
                                        <EvilIcon size={30} name="user" color={focused ? "#1C2E49" : '#0D0D0D'} />
                                    :
                                    route.name == 'VitalSignsStack'
                                    ?   
                                        <MaterialIcon size={28} name="health-and-safety" color={focused ? "#1C2E49" : '#0D0D0D'} />
                                    :
                                    route.name == 'DoctorsStack'
                                    ?   
                                        <FontistoIcon size={22} name="doctor" color={focused ? "#1C2E49" : '#0D0D0D'} />
                                    :
                                        <></>

                                }
                            </TouchableOpacity>
                        )
                    },
                    tabBarStyle: {
                        backgroundColor: '#F8F8F8',
                        elevation: 500,
                        shadowColor: '#AAAAAA',
                        borderTopWidth: 0,
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                })}
            >
                <Tab.Screen 
                    name="HomeStack"
                >
                    {
                        props => 
                            <HomeRouter 
                                {...props}  
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}                                                                                 
                            />
                    }
                </Tab.Screen>
                <Tab.Screen 
                    name="ProfileStack"
                >
                    {
                        props => 
                            <ProfileRouter 
                                {...props}  
                                userDetails={userDetails}
                                setUserDetails={setUserDetails} 
                                userLogout={userLogout}                                                                                
                            />
                    }
                </Tab.Screen> 
                <Tab.Screen 
                    name="VitalSignsStack"
                >
                    {
                        props => 
                            <VitalSignsRouter 
                                {...props}  
                                userDetails={userDetails}
                                setUserDetails={setUserDetails} 
                                userLogout={userLogout}                                                                                
                            />
                    }
                </Tab.Screen>
                <Tab.Screen 
                    name="DoctorsStack"
                >
                    {
                        props => 
                            <DoctorsRouter 
                                {...props}  
                                userDetails={userDetails}
                                setUserDetails={setUserDetails} 
                                userLogout={userLogout}  
                                mainRouter_fullNavigateTo={mainRouter_fullNavigateTo}                                                                              
                            />
                    }
                </Tab.Screen>                                                
            </Tab.Navigator>
        </>
    )
}