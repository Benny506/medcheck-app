import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors, textColors } from "../../../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../../../styleSheets/defaultStyles";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { onRequestApi } from "../../../apiRequests/requestApi";
import CustomErrorMsg from "../../../errorMsg/CustomErrorMsg";


const feedbacks = [
    {
        Icon: () => <FontAwesomeIcon name="ambulance" size={60} color={colors._1C2E49} />,
        type: 'severe',
        text: 'Your symptoms require emergency health care. Take the covid-19 test and see a doctor immediately.'
    },
    {
        Icon: () => <FontistoIcon name="first-aid-alt" size={60} color={colors._1C2E49} />,
        type: 'moderate',
        text: 'Your symptoms are moderate. We suggest you see a doctor.'
    },
    {
        Icon: () => <FontAwesome5Icon name="band-aid" size={60} color={colors._1C2E49} />,
        type: 'mild',
        text: 'Your symptoms quite minimal. Though not severe, we do recommend you go for a checkup at your nearest hospital.'
    },
    {
        Icon: () => <FeatherIcon name="check-circle" size={60} color={colors._1C2E49} />,
        type: 'good',
        text: 'Your all good. No medical recommendations. Eat heathly, keep fit, and keep a good hygiene.'
    }    
]


export default function TestEnd({ userDetails, setUserDetails }){

    const { details } = userDetails
    const { accessToken, user_id } = details




    const data = useNavigationState(state => {
        const data = state.routes.filter(route => route.name == 'TestEndScreen')
        return data[0]
    })
    
    const { result_type } = data.params

    const fullNavigation = useNavigation()

    const fullNavigateTo = (path, data) => fullNavigation.reset({
        index: 0,
        routes: [{name: path, params: data}]
    })  
    const goHome = () => fullNavigateTo('HomeScreen')  



    const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null })

    useEffect(() => {
        if(result_type){
            onRequestApi({
                requestInfo: {
                    url: '/users/update-covid-test-results', 
                    method: 'post', 
                    data: {
                        user_id, 
                        result_type
                    }, 
                    token: accessToken
                },
                successCallBack: covidResultUploadSuccess,
                failureCallback: covidResultUploadFailure
            })
        }
    }, [])



    const covidResultUploadSuccess = ({ requestInfo, result }) => {
        const { data } = result

        setUserDetails(prev => ({
            ...prev,
            alertModal: { message: 'Successfully updated test results', duration: 1000 },
            covidTestResults: data
        }))

        return setApiReqs({ isLoading: false, errorMsg: null })
    }

    const covidResultUploadFailure = ({ requestInfo, errorMsg }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { message: errorMsg, duration: 1000 }
        }))

        return setApiReqs({ isLoading: false, errorMsg })
    }

    const displayFeedback = feedbacks.map((feedback, i) => {
        const { Icon, type, text } = feedback

        const showFeedback = type == result_type ? true : false

        return (
            <View
                key={i}
                style={{
                    display: showFeedback ? 'flex' : 'none',
                    alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Icon />
                <Text style={[
                    textColors.text_1C2E49, fontFamilyStyles.publicSans, textSizeStyles.regularText, 
                    {
                        paddingTop: 20
                    }
                ]}>
                    {text}
                </Text> 
            </View>
        )
    })

    return (
        <View style={{
            flex: 1, justifyContent: 'space-between',
            backgroundColor: colors.F8F6FB, paddingVertical: 20, paddingHorizontal: 20
        }}>
            {
                apiReqs.errorMsg &&
                    <View style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                    }}>
                        <CustomErrorMsg errorMsg={apiReqs.errorMsg} />
                    </View>                                
            }
            <View style={{
                display: 'flex', alignItems: 'center', paddingTop: 130
            }}>
                { displayFeedback }
            </View>
            {
                apiReqs.isLoading
                ?
                    <View style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Text style={[
                            fontFamilyStyles.publicSansMedium, textColors.text_1C2E49,
                            textSizeStyles.smallTxt,
                            {
                                marginRight: 10
                            }
                        ]}>
                            Uploading test results...
                        </Text>
                        <ActivityIndicator color={colors._1C2E49} size={15} />
                    </View>
                :
                    <View>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                flexDirection: 'row', backgroundColor: colors._1C2E49, paddingVertical: 10, 
                                borderRadius: 10, marginBottom: 15
                            }}
                        >
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_FFF, textSizeStyles.regularText
                            ]}>
                                Online test centers
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={goHome}
                            style={{
                                paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                flexDirection: 'row', backgroundColor: colors.transparent, paddingVertical: 10, 
                                borderRadius: 10, borderColor: colors._1C2E49, borderWidth: 1
                            }}
                        >
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_000, textSizeStyles.regularText
                            ]}>
                                Go Home
                            </Text>
                        </TouchableOpacity>                        
                    </View>           
            }
        </View>
    )
}