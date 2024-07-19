import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RegularScroll from "../../Scroll/RegularScroll";
import { colors, textColors } from "../../colors/colors";
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { fontFamilyStyles, fontWeightStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import dayjs from "dayjs";
import { shifts } from "../../doctors/auxiliary/doctorsAux";
import DocAppt from "../auxiliary/DocAppt";


const services = [
    {
        title: 'Covid Test',
        bgImg: require('../../../assets/images/virus_bg_2.jpg'),
        path: 'CovidTestWelcomeScreen'
    },
    {
        title: 'Support',
        bgImg: require('../../../assets/images/community_bg.jpg'),
        path: 'Support'
    },
    {
        title: 'Result stats',
        bgImg: require('../../../assets/images/stats_bg.jpg'),
        path: 'ResultStatsScreen'
    },
    {
        title: 'Help',
        bgImg: require('../../../assets/images/help_bg.jpg'),
        path: 'Help'
    },    
]



export default function Home({ 
    userDetails, setUserDetails, navigation, tabRouterNavigate
}) {

    const { details, doctorAppointments } = userDetails
    const { username } = details

    const navigateTo = (path) => navigation.navigate(path)
    const goToAppointmentsScreen = () => navigateTo('Appointments')
    const goToProfileTab = () => tabRouterNavigate && tabRouterNavigate('ProfileStack')
    const goToVitalSignsTab = () => tabRouterNavigate && tabRouterNavigate('VitalSignsStack')

    const [topAppointments, setTopAppointments] = useState()

    useEffect(() => {
        if(userDetails.doctorAppointments){
            const after_or_today = doctorAppointments.filter(appt => {
                const { date } = appt

                const today = new Date()

                return dayjs(date).isAfter(dayjs(today), 'date') || dayjs(date).isSame(dayjs(today), 'date')
            })

            const orderByDate = after_or_today.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            });

            setTopAppointments(orderByDate.slice(0, 2))
        }
    }, [userDetails])

    
    const displayDoctorAppointments = topAppointments && topAppointments.map((docAppt, i) => ( 
        <View key={i}>
            <DocAppt docAppt={docAppt} />
        </View>
    ))


    const displayServices = services.map((service, i) => {
        const { title, bgImg, path } = service

        const goToPath = () => {
            if(path){
                if(path == 'Support' || path == 'Help'){

                    return setUserDetails(prev => ({
                        ...prev,
                        alertModal: { 
                            message: 'Feature not available. This would available once we have stand-by medical personnels to assist you', 
                            duration: 1000 
                        }
                    }))

                } else{
                    return navigateTo(path)
                }
            }
 
            return
        }

        return (
            <TouchableOpacity 
                key={i}
                onPress={goToPath}
                style={{
                    width: '48%',
                    marginBottom: 10
                }}
            >
                <ImageBackground 
                    style={{
                        height: 150, elevation: 10, shadowColor: colors.F8F6FB,
                    }}
                    imageStyle={{
                        borderRadius: 10,
                    }}
                    source={bgImg}
                >
                    <LinearGradient 
                        colors={["rgba(28, 46, 73, 0.5)", "rgba(28, 46, 73, 0.5)"]}
                        style={{
                            padding: 20, height: 150, borderRadius: 10, flex: 1
                        }}
                    >
                        <Text style={[
                            fontFamilyStyles.publicSansBold, textColors.text_FFF, textSizeStyles.mediumText,
                            {
                                textAlign: 'center'
                            }
                        ]}>
                            { title }
                        </Text>
                    </LinearGradient>
                </ImageBackground>            
            </TouchableOpacity>
        )
    })


    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
            withVerticalPadding={true}
        >
            <View style={{
                marginBottom: 30
            }}>
                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
                    zIndex: 100, shadowColor: colors.AAAAAA, elevation: 10
                }}>
                    <View style={{
                        display: 'flex', alignItems: 'center', flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={goToProfileTab}
                        >
                            <EvilIcon name="user" color={colors._0D0D0D} size={30} />
                        </TouchableOpacity>
                        <View style={{ 
                            marginLeft: 5
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt
                            ]}>
                                Hi
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_1C2E49, textSizeStyles.regularText,
                            ]}>
                                { username }
                            </Text>                
                        </View>                    
                    </View>

                    <Image 
                        source={require('../../../assets/images/logo.png')}
                        style={{
                            width: 50, height: 50
                        }}
                    />
                </View>
            </View>

            <ImageBackground 
                style={{
                    height: 150, elevation: 10, shadowColor: colors.F8F6FB,
                    marginBottom: 40
                }}
                imageStyle={{
                    borderRadius: 10,
                }}
                source={require('../../../assets/images/virus_bg.jpg')}
            >
                <LinearGradient 
                    colors={["rgba(28, 46, 73, 0.5)", "rgba(28, 46, 73, 0.5)"]}
                    style={{
                        padding: 20, height: 150, borderRadius: 10,
                    }}
                >
                    <Text style={[
                        fontFamilyStyles.publicSansBold, textColors.text_FFF, textSizeStyles.mediumText
                    ]}>
                        Med-Check
                    </Text>

                    <Text style={[
                        fontFamilyStyles.publicSans, textColors.text_FFF, textSizeStyles.mediumText,
                        {
                            marginBottom: 25
                        }
                    ]}>
                        Submit your vitals
                    </Text>

                    <TouchableOpacity
                        onPress={goToVitalSignsTab}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'
                        }}
                    >
                        <View style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: colors._1C2E49, borderRadius: 5, flexDirection: 'row',
                            paddingHorizontal: 30, paddingVertical: 10
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_FFF, textSizeStyles.smallTxt,
                                {
                                    marginRight: 5
                                }
                            ]}>
                                Begin
                            </Text>
                            <AntDesignIcon name="arrowright" color={colors.FFF} size={15} />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>

            {
                topAppointments && topAppointments.length > 0 &&
                    <View style={{
                        marginHorizontal: 5, marginBottom: 40
                    }}>
                        <View style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexDirection: 'row', marginBottom: 20
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.mediumText,
                            ]}>
                                Appointments
                            </Text>
                            <TouchableOpacity 
                                onPress={goToAppointmentsScreen}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row'
                                }}
                            >
                                <Text style={[
                                    textColors.text_1C2E49, fontFamilyStyles.publicSansMedium, textSizeStyles.smallTxt, 
                                    {
                                        marginRight: 3
                                    }
                                ]}>
                                    see all
                                </Text>
                                <AntDesignIcon name="arrowright" color={colors._1C2E49} size={15} />
                            </TouchableOpacity>
                        </View>

                        <View>
                            { displayDoctorAppointments }
                        </View>
                    </View>
            }

            <View style={{
                marginHorizontal: 5
            }}>
                <Text style={[
                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.mediumText,
                    { 
                        marginBottom: 20
                    }
                ]}>
                    Services
                </Text>

                <View style={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    { displayServices }
                </View>
            </View>            
        </RegularScroll>
    )
}