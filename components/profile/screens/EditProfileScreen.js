import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Formik, ErrorMessage } from "formik";
import RegularScroll from "../../Scroll/RegularScroll";
import { bgColors, colors, textColors } from "../../colors/colors";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import FeatherIcon from 'react-native-vector-icons/Feather'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import CustomErrorMsg from "../../errorMsg/CustomErrorMsg";
import * as yup from 'yup'
import { ONLY_NUMBERS_REGEX } from "../../helpers/regex/regex";
import { onRequestApi } from "../../apiRequests/requestApi";



export default function EditProfileScreen({ userDetails, setUserDetails }){

    const { details } = userDetails
    const { username, email, phone_number, accessToken, user_id } = details

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })


    const validationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email"),
        username: yup
          .string()
          .max(20, 'Maximum of 20 characters'),
        phone_number: yup
          .string()
          .matches(ONLY_NUMBERS_REGEX, "Please enter a valid phone number")
      })


    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading && data){
        
            const { url, method, requestBody } = data

            onRequestApi({
                requestInfo: {
                    url, method, data: requestBody, token: accessToken
                },
                successCallBack: onProfileEditSuccess,
                failureCallback: onProfileEditFailure
            })

        }
    }, [apiReqs])


    const onProfileEditSuccess = ({ requestBody, result }) => {
        const { data } = result

        setApiReqs({ isLoading: false, data: null, errorMsg: null})

        return setUserDetails(prev => ({
            ...prev,
            alertModal: { message: 'Successfully updated user profile', duration: 1000 },
            details: {
                ...prev.details,
                ...data
            }
        }))
    }

    const onProfileEditFailure = ({ requestBody, errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg })

        return setUserDetails(prev => ({
            ...prev,
            alertModal: { message: errorMsg, duration: 1000 }
        }))
    }
  

    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
        >
            <View style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40
            }}>
                <View style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center'
                }}>
                    <EntypoIcon name="user" color={colors._1C2E49} size={60} />
                    <View>
                        <Text style={[
                            fontFamilyStyles.publicSansMedium, textColors.text_000, textSizeStyles.regularText,
                            {
                                marginBottom: 3
                            }
                        ]}>
                            {username}
                        </Text>
                        <View style={{
                            display: 'flex', alignItems: 'center', flexDirection: 'row',
                            marginBottom: 3
                        }}>
                            <FeatherIcon name="mail" color={colors._1C2E49} size={15} />
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.extraSmallTxt,
                                { 
                                    marginLeft: 5
                                }
                            ]}>
                                { email ? email : 'not set' }
                            </Text>                            
                        </View>
                        <View style={{
                            display: 'flex', alignItems: 'center', flexDirection: 'row',
                            marginBottom: 3
                        }}>
                            <FeatherIcon name="phone" color={colors._1C2E49} size={15} />
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.extraSmallTxt,
                                { 
                                    marginLeft: 5
                                }
                            ]}>
                                { phone_number ? phone_number : 'not set' }
                            </Text>                            
                        </View>                        
                    </View>
                </View>
            </View>
            
            {
                apiReqs.errorMsg && 
                    <View style={{
                        marginBottom: 20
                    }}>
                        <CustomErrorMsg errorMsg={apiReqs.errorMsg} centered={true} />
                    </View>
            }

            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email: '', username: '', phone_number: ''
                }}
                onSubmit={(values, { resetForm }) => {

                    const update = {}

                    if(values.email){
                        values.email.replaceAll(" ", "")
                        update.email = values.email
                    }

                    if(values.username){
                        values.username.replaceAll(" ", "")
                        update.username = values.username
                    }

                    if(values.phone_number){
                        values.phone_number.replaceAll(" ", "")
                        update.phone_number = values.phone_number
                    }

                    setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            url: '/users/update-profile',
                            method: 'post',
                            requestBody: {
                                user_id,
                                update
                            }
                        }
                    })

                    return resetForm()
                }}
            >
                {
                    ({ handleBlur, handleChange, handleSubmit, values, dirty, isValid }) => (
                        <>
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
                                        <EvilIcon color={'#AAAAAA'} name="user" style={{ width: '10%' }} size={30} />
                                        <TextInput 
                                            placeholder="Username"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                            style={{
                                                width: '88%',
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
                                            placeholder="Email address"
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
                                        Phone number
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
                                        <FeatherIcon color={'#AAAAAA'} name="phone" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            keyboardType="numeric"
                                            placeholder="Phone number"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('phone_number')}
                                            onBlur={handleBlur('phone_number')}
                                            value={values.phone_number}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="phone_number">
                                        { error => <CustomErrorMsg errorMsg={error} />}
                                    </ErrorMessage>                                     
                                </View>                                   

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                                    style={[
                                        bgColors.bg_5A3593, 
                                        {
                                            marginTop: 30,
                                            padding: 12, borderRadius: 10, elevation: 5, shadowColor: '#5A3593',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                                            opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                                        }
                                    ]}
                                >
                                    <Text style={[
                                        fontFamilyStyles.publicSansBold, textSizeStyles.regularText, textColors.text_FFF
                                    ]}>
                                        {
                                            apiReqs.isLoading 
                                            ? 
                                                <ActivityIndicator size={20} color={colors.FFF} />
                                            :
                                                'Save'
                                        }
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