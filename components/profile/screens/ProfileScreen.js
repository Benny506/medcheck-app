import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import RegularScroll from "../../Scroll/RegularScroll";
import { colors, textColors } from "../../colors/colors";
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'



const profileNavs = [
    {
        Icon: () => <FontAwesome5Icon name="user-edit" size={20} color={colors._1C2E49} />,
        title: 'Edit profile',
        path: 'EditProfile'
    },
    {
        Icon: () => <MaterialIcon name="health-and-safety" size={20} color={colors._1C2E49} />,
        title: 'My vitals',
        path: 'vitalSigns'
    },
    {
        Icon: () => <FoundationIcon name="results-demographics" size={20} color={colors._1C2E49} />,
        title: 'Test results',
        path: 'ResultStatsScreen'
    },
    {
        Icon: () => <AntDesignIcon name="logout" size={20} color={colors._1C2E49} />,
        title: 'Logout',
        path: 'logout'
    },
]



export default function ProfileScreen({ navigation, userLogout, tabRouterNavigate }){

    const navigateTo = (path) => navigation.navigate(path)
    const goToVitalSignsTab = () => tabRouterNavigate && tabRouterNavigate('VitalSignsStack')

    const displayProfileNavs = profileNavs.map((pNav, i) => {
        const { Icon, title, path } = pNav

        const onNavClick = () => 
            path
            ?
                path == 'logout'
                ?
                    userLogout && userLogout()
                :
                path == 'vitalSigns'
                ?
                    goToVitalSignsTab()
                :
                    navigateTo(path)
            :
                null

        return (
            <TouchableOpacity
                key={i}
                onPress={onNavClick}
                style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    paddingBottom: 30, paddingHorizontal: 10, paddingTop: 10, borderBottomColor: colors._1C2E49,
                    borderBottomWidth: 1, marginBottom: 60, shadowColor: colors._1C2E49, borderRadius: 10
                }}
            >
                <View style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center'
                }}>
                    <Icon />
                    <Text style={[
                        fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.regularText,
                        { 
                            marginLeft: 10 
                        }
                    ]}>
                        { title }
                    </Text>
                </View>
                <View>
                    <FeatherIcon name="chevron-right" color={colors._1C2E49} size={20} />
                </View>
            </TouchableOpacity>
        )
    })
    
    return (
        <RegularScroll
            withVerticalPadding={true}
            bgColor={colors.F8F6FB}
            withBottomPadding={true}
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
                        <TouchableOpacity>
                            <EvilIcon name="user" color={colors._0D0D0D} size={30} />
                        </TouchableOpacity>
                        <View style={{ 
                            marginLeft: 5
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_000, textSizeStyles.smallTxt
                            ]}>
                                Profile
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

            { displayProfileNavs }
        </RegularScroll>
    )
}