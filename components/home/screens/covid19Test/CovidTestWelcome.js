import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { colors, textColors } from "../../../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../../../styleSheets/defaultStyles";


const listItems = [
    'Submit vitals (recommended)',
    'Answer all questions',
    'Review test results',
    'Proceed to nearest hospital if advised to take the covid-19 test'
]


export default function CovidTestWelcome({ navigation }){

    const navigateTo = (path) => navigation.navigate(path)
    const goToCovidTestScreen = () => navigateTo('CovidTestScreen')

    const displayListItems = listItems.map((item, i) => (
        <View 
            key={i}
            style={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
                marginBottom: 20
            }}
        >
            <Text style={[
                textColors.text_FFF, textSizeStyles.regularText, fontFamilyStyles.publicSansBold,
                {
                    width: '5%'
                }
            ]}>
                {'\u2022'}
            </Text>
            <Text style={[
                textColors.text_FFF, fontFamilyStyles.publicSans, textSizeStyles.regularText,
                {
                    width: '94%'
                }
            ]}>
                { item }
            </Text>
        </View>
    ))


    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                source={require('../../../../assets/images/virus_bg_3.jpg')}
                style={{
                    flex: 1,
                }}
            >
                <LinearGradient
                    colors={["rgba(28, 46, 73, 0.6)", "rgba(28, 46, 73, 0.6)"]}
                    style={{
                        flex: 1, justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20
                    }}
                >
                    <View style={{
                        paddingTop: 100
                    }}>
                        <View style={{
                            marginBottom: 40
                        }}>
                            <Text style={[
                                textColors.text_FFF, fontFamilyStyles.publicSansBold, textSizeStyles.extraLargeText,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Covid-19
                            </Text>
                            <Text style={[
                                textColors.text_FFF, fontFamilyStyles.publicSansBold, textSizeStyles.extraLargeText,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Test questionare
                            </Text>
                        </View>

                        <View>
                            { displayListItems }
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={goToCovidTestScreen}
                            style={{
                                paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                flexDirection: 'row', backgroundColor: colors._1C2E49, paddingVertical: 10, 
                                borderRadius: 10, marginBottom: 15
                            }}
                        >
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_FFF, textSizeStyles.regularText
                            ]}>
                                Begin test 
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                flexDirection: 'row', backgroundColor: colors.transparent, paddingVertical: 10, 
                                borderRadius: 10, borderColor: colors._1C2E49, borderWidth: 1
                            }}
                        >
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_FFF, textSizeStyles.regularText
                            ]}>
                                Submit vital signs 
                            </Text>
                        </TouchableOpacity>                        
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}