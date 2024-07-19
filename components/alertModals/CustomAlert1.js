import React from "react";
import { View, Text, SafeAreaView, Dimensions, Platform } from "react-native";
import FadeFromTop from "../animations/fade/FadeFromTop";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const screenWidth = Dimensions.get('screen').width

export default function CustomAlert1({ alertModal, setAlertModal }){
    if(alertModal){
        const { message, duration } = alertModal

        const callBack = () => setAlertModal()

        return (
            <View 
                style={{
                    backgroundColor: 'transparent',
                    zIndex: 1000,
                    elevation: Platform.OS == 'android' ? 50 : 0,
                    position: 'absolute',
                    flex: 1, 
                    width: '100%',
                    display: 'flex', alignItems: 'center'
                }}
            >
                <FadeFromTop
                    fromValue={-100}
                    toValue={80} 
                    duration={duration ? duration : 1000}
                    fadeOut={true}
                    durationOut={300}   
                    animationCallBack={callBack}
                >
                    <View style={{
                        backgroundColor: '#000113',
                        borderRadius: 10,
                        paddingHorizontal: 25,
                        paddingVertical: 15,
                        width: screenWidth-40,
                        elevation: 2,
                        shadowColor: 'gray',                
                    }}>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center', alignItems: 'flex-end', marginBottom: 10
                            }}
                        >
                            <FontAwesome5 name="lightbulb" size={20} color={'#FFF'} />
                        </View>
                        <Text
                            style={{
                                color: '#FFF',
                                textAlign: 'left'
                            }}
                        >
                            {message}
                        </Text>
                    </View>
                </FadeFromTop>
            </View>            
        )
    }
}