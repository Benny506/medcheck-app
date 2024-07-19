import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik, ErrorMessage } from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import RegularScroll from "../../Scroll/RegularScroll";
import { bgColors, colors, textColors } from "../../colors/colors";
import { SvgXml, SvgUri } from "react-native-svg";
import { fontFamilyStyles, fontWeightStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import * as yup from 'yup'
import CustomErrorMsg from "../../errorMsg/CustomErrorMsg";
import { onRequestApi } from "../../apiRequests/requestApi";




export default function Register({ navigation, setUserDetails }){

    const navigateTo = (path, data) => navigation.navigate(path, data)
    const goToLogin = () => navigateTo('Login')

    const validationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
        password: yup
          .string()
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .required('Confirm Password is required'),          
        username: yup
          .string()
          .required('Username is required')
          .max(20, 'Maximum of 20 characters')
    })    

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })


    useEffect(() => {
        const { isLoading, data } = apiReqs
        if(isLoading && data){

            const { url, method, requestBody } = data

            onRequestApi({
                requestInfo: {
                    url, method, data: requestBody
                },
                successCallBack: registerUserSuccessful, 
                failureCallback: registerUserFailure
            })
        }
    }, [apiReqs])


    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prev => !prev)


    const registerUserSuccessful = ({ requestInfo, result }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: {
                message: 'Registration successful', duration: 1000
            }
        }))
        setApiReqs({ isLoading: false, data: null, errorMsg: null })
        return goToLogin()
    }

    const registerUserFailure = ({ requestInfo, errorMsg }) => {
        return setApiReqs({ data: null, isLoading: false, errorMsg })
    }


    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
            scrollToTopCondition={apiReqs.errorMsg}
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email: '', password: '', username: '', confirmPassword: ''
                }}
                onSubmit={(values) => {
                    const { confirmPassword, password, email, username } = values

                    if(confirmPassword === password){
                        setApiReqs({
                            isLoading: true,
                            data: {
                                url: '/users/register',
                                method: 'post',
                                requestBody: {
                                    password: password.replaceAll(" ", ""),
                                    email: email.replaceAll(" ", ""),
                                    username: username.replaceAll(" ", ""),
                                }
                            },
                            errorMsg: null
                        })

                    } else{
                        setApiReqs({ isLoading: false, data: null, errorMsg: 'Passwords must be the same' })
                    }
                }}
            >
                {
                    ({ handleBlur, handleChange, handleSubmit, values, dirty, isValid }) => (
                        <>
                            <View style={{ marginBottom: 40, paddingTop: 80 }}>
                                <Text style={[
                                    textColors.text_1C2E49, fontFamilyStyles.publicSansBold,
                                    textSizeStyles.extraLargeText
                                ]}>
                                    Sign Up
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
                                        Username
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
                                        <AntDesignIcon color={'#AAAAAA'} name="user" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            placeholder="Enter your Username"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="username">
                                        { error => <CustomErrorMsg errorMsg={error} />}
                                    </ErrorMessage>                                     
                                </View>  

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

                                <View style={{ marginBottom: 20 }}>
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
                                </View> 

                                <View style={{ marginBottom: 40 }}>
                                    <Text style={[
                                        textColors.text_1C2E49, fontFamilyStyles.publicSansMedium,
                                        textSizeStyles.smallTxt, {
                                            marginBottom: 8
                                        }
                                    ]}>
                                        Confirm Password
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
                                                secureTextEntry={confirmPasswordVisible ? false : true}
                                                placeholder="Enter your Password Again"
                                                placeholderTextColor={"#AAAAAA"}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                value={values.confirmPassword}                                            
                                                style={{
                                                    width: '80%',
                                                    fontFamily: 'Public Sans Medium',
                                                }}
                                            /> 
                                            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={{ width: '8%' }}>
                                                {
                                                    confirmPasswordVisible
                                                    ?
                                                        <EntypoIcon color={'#AAAAAA'} name="eye-with-line" size={22} />                      
                                                    :
                                                        <EntypoIcon color={'#AAAAAA'} name="eye" size={22} />                      
                                                }
                                            </TouchableOpacity> 
                                        </View>
                                        <ErrorMessage name="confirmPassword">
                                            { error => <CustomErrorMsg errorMsg={error} />}
                                        </ErrorMessage>                                         
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={(!(isValid && dirty)) || apiReqs.isLoading ? true : false}
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
                                                'Register'
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
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={goToLogin} style={{ marginHorizontal: 2 }}>
                                    <Text style={[
                                        textColors.text_1C2E49, fontFamilyStyles.publicSansBold, textSizeStyles.smallTxt
                                    ]}>
                                        Login
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


