import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, Touchable, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik, ErrorMessage } from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import RegularScroll from "../../Scroll/RegularScroll";
import { bgColors, colors, textColors } from "../../colors/colors";
import { SvgXml, SvgUri } from "react-native-svg";
import { fontFamilyStyles, fontWeightStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import * as yup from 'yup'
import CustomErrorMsg from "../../errorMsg/CustomErrorMsg";
import { onRequestApi } from "../../apiRequests/requestApi";
import { setValue } from "../../secureStore/secureStore";




export default function Login({ setUserDetails }){

    const validationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
        password: yup
          .string()
          .required('Password is required'),
      })    

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        const { data, isLoading } = apiReqs

        if(apiReqs.data && apiReqs.isLoading){

            const { url, method, requestBody } = data

            onRequestApi({
                requestInfo: {
                    url, method, data: requestBody
                },
                successCallBack: loginSuccessful, 
                failureCallback: loginFailure
            })
        }
    }, [apiReqs])

    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)

    const loginSuccessful = async ({ requestInfo, result }) => {
        try {
            const { data } = result
            const { userDetails, accessToken } = data

            if(userDetails){
                const { user_id } = userDetails

                if(user_id && accessToken){
                    const set_userId = await setValue({ key: 'user_id', value: user_id })
                    const set_accessToken = await setValue({ key: 'accessToken', value: accessToken }) 

                    if(set_userId.set && set_accessToken.set){
                        setUserDetails(prev => ({
                            ...prev, 
                            alertModal: null,
                            details: { ...userDetails, accessToken }
                        }))
                
                        return setApiReqs({ isLoading: false, data: null, errorMsg: null })
                    }
                }
            }

            throw new Error()

        } catch (error) {
            return loginFailure({ errorMsg: 'Unexpected Uncaught Error!' })
        }
    }

    const loginFailure = ({ errorMsg }) => {
        return setApiReqs({ isLoading: false, data: null, errorMsg })
    }

    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
            scrollToTopCondition={apiReqs.errorMsg}
            withBottomPadding={true}
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email: '', password: ''
                }}
                onSubmit={(values) => {
                    return setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            url: '/users/login',
                            method: 'post',
                            requestBody: values
                        }
                    })
                }}
            >
                {
                    ({ handleBlur, handleChange, handleSubmit, values, dirty, isValid }) => (
                        <>
                            <View style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 40,
                            }}>
                                <Image 
                                    style={{ width: 150, height: 150 }}
                                    source={require('../../../assets/images/logo.png')}
                                />
                            </View>

                            <View style={{ marginBottom: 40 }}>
                                <Text style={[
                                    textColors.text_1C2E49, fontFamilyStyles.publicSansMedium,
                                    textSizeStyles.regularText,
                                    {
                                        marginBottom: 5
                                    }
                                ]}>
                                    Welcome
                                </Text>
                                <Text style={[
                                    textColors.text_1C2E49, fontFamilyStyles.publicSansBold,
                                    textSizeStyles.largeText
                                ]}>
                                    Sign In
                                </Text>
                            </View>

                            {
                                apiReqs.errorMsg &&
                                    <View style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                                    }}>
                                        <CustomErrorMsg errorMsg={apiReqs.errorMsg} />
                                    </View>                                
                            }


                            <View style={{marginBottom: 50}}>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[
                                        textColors.text_1C2E49, fontFamilyStyles.publicSansMedium,
                                        textSizeStyles.smallTxt, {
                                            marginBottom: 8
                                        }
                                    ]}>
                                        Email
                                    </Text>
                                    <View
                                        style={{ 
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            flexDirection: 'row', paddingVertical: 12,
                                            shadowColor: '#AAAAAA',
                                            elevation: 5,
                                            backgroundColor: '#FFF',
                                            borderRadius: 10,
                                            paddingHorizontal: 15,                          
                                        }}
                                    >
                                        <FeatherIcon color={'#AAAAAA'} name="mail" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            placeholder="Enter your Email"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="email">
                                        { error => <CustomErrorMsg errorMsg={error} />}
                                    </ErrorMessage>                                     
                                </View>   
                                <View style={{ marginBottom: 40 }}>
                                    <Text style={[
                                        textColors.text_1C2E49, fontFamilyStyles.publicSansMedium,
                                        textSizeStyles.smallTxt, {
                                            marginBottom: 8
                                        }
                                    ]}>
                                        Password
                                    </Text>
                                    <View style={{ marginBottom: 10 }}>
                                        <View
                                            style={{ 
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                flexDirection: 'row', paddingVertical: 12,
                                                shadowColor: '#AAAAAA',
                                                elevation: 5,
                                                backgroundColor: '#FFF',
                                                borderRadius: 10,
                                                paddingHorizontal: 15,                       
                                            }}
                                        >
                                            <FontAwesome5Icon color={'#AAAAAA'} name="lock" style={{ width: '8%' }} size={20} />
                                            <TextInput 
                                                secureTextEntry={passwordVisible ? false : true}
                                                placeholder="Enter your Password"
                                                placeholderTextColor={"#AAAAAA"}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}                                            
                                                style={{
                                                    width: '80%',
                                                    fontFamily: 'Public Sans Medium',
                                                }}
                                            /> 
                                            <TouchableOpacity onPress={togglePasswordVisibility} style={{ width: '8%' }}>
                                                {
                                                    passwordVisible
                                                    ?
                                                        <EntypoIcon color={'#AAAAAA'} name="eye-with-line" size={22} />                      
                                                    :
                                                        <EntypoIcon color={'#AAAAAA'} name="eye" size={22} />                      
                                                }
                                            </TouchableOpacity> 
                                        </View>
                                        <ErrorMessage name="password">
                                            { error => <CustomErrorMsg errorMsg={error} />}
                                        </ErrorMessage>                                         
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
                                        }}
                                    >
                                        <Text
                                            style={[
                                                textColors.text_1C2E49, fontFamilyStyles.publicSansMedium,
                                                textSizeStyles.smallTxt, {
                                                    textAlign: "right",
                                                }
                                            ]}
                                        >
                                            forgot password?
                                        </Text>
                                    </TouchableOpacity>
                                </View> 

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                                    style={[
                                        bgColors.bg_5A3593, 
                                        {
                                            padding: 12, borderRadius: 10, elevation: 5, shadowColor: '#5A3593',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                                            opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                                        }
                                    ]}
                                >
                                    <Text style={[
                                        fontFamilyStyles.publicSansBold, textSizeStyles.regularText, textColors.text_FFF,
                                        {
                                            textAlign: 'center'
                                        }
                                    ]}>
                                        {
                                            apiReqs.isLoading
                                            ?
                                                <ActivityIndicator size={20} color={"#FFF"} />
                                            :
                                                'Sign In'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={[
                                    textColors.text_1C2E49, fontFamilyStyles.publicSans, textSizeStyles.smallTxt,
                                    {
                                        marginHorizontal: 2
                                    }
                                ]}>
                                    Don’t have an account?
                                </Text>
                                <TouchableOpacity style={{ marginHorizontal: 2 }}>
                                    <Text style={[
                                        textColors.text_1C2E49, fontFamilyStyles.publicSansBold, textSizeStyles.smallTxt
                                    ]}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>                        
                        </>
                    )
                }
            </Formik>
        </RegularScroll>
    )
}


