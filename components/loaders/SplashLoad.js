import React from "react";
import { ActivityIndicator, Image, View, Text } from "react-native";
import { colors, textColors } from "../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";


export default function SplashLoad({ loadTxt }){
    return (
        <View
            style={{
                flex: 1, alignItems: 'center', justifyContent: 'center',
                backgroundColor: colors.F8F6FB
            }}
        >
            <Image 
                source={require('../../assets/images/logo.png')}
                style={{
                    width: 150, height: 150, marginBottom: 20
                }}
            />

            <View style={{
                display: 'flex', alignItems: 'center', flexDirection: 'row'
            }}>
                <Text style={[
                    fontFamilyStyles.publicSansMedium, textColors.text_1C2E49,
                    textSizeStyles.smallTxt,
                    {
                        marginRight: 10
                    }
                ]}>
                    {
                        loadTxt ? loadTxt : 'getting your affairs in order...'
                    }
                </Text>
                <ActivityIndicator color={colors._1C2E49} size={15} />
            </View>
        </View>
    )
}