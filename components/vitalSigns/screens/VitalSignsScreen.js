import React, { useEffect, useState } from "react";
import RegularScroll from "../../Scroll/RegularScroll";
import { bgColors, colors, textColors } from "../../colors/colors";
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import CustomErrorMsg from "../../errorMsg/CustomErrorMsg";
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ErrorMessage, Formik } from "formik";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as yup from 'yup'
import { onRequestApi } from "../../apiRequests/requestApi";




export default function VitalSignsScreen({ userDetails, setUserDetails }){

    const { details, vitalSigns } = userDetails
    const { user_id, accessToken } = details
    const { blood_pressure, body_temperature, pulse, respiratory_rate } = vitalSigns

    const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null, data: null })

    const validationSchema = yup.object().shape({
        blood_pressure: yup
            .string()
            .required('Blood pressure required'),
        body_temperature: yup
            .string()
            .required("Body temperature required"),
        pulse: yup
            .string()
            .required("Pulse required"),
        respiratory_rate: yup
            .string()
            .required('Respiratory rate required')
    })


    useEffect(() => {
        const { isLoading, data } = apiReqs

        if(isLoading && data){
            
            const { url, method, requestBody } = data

            onRequestApi({
                requestInfo: {
                    url,
                    method,
                    data: requestBody,
                    token: accessToken
                },
                successCallBack: vitalsUploadSuccessful,
                failureCallback: vitalsUploadFailure
            })

        }

    }, [apiReqs])


    const vitalsUploadSuccessful = ({ result, requestInfo }) => {
        const { data } = result

        setUserDetails(prev => ({
            ...prev,
            vitalSigns: data,
            alertModal: { message: 'Successfully updated vital signs', duration: 1000 }
        }))

        return setApiReqs({ isLoading: false, errorMsg: null, data: null })
    }

    const vitalsUploadFailure = ({ errorMsg, requestInfo }) => {
        setUserDetails(prev => ({
            ...prev,
            alertModal: { message: errorMsg, duration: 1000 }
        }))

        return setApiReqs({ isLoading: false, errorMsg, data: null })
    }


    return (
        <RegularScroll
            withVerticalPadding={true}
            withBottomPadding={true}
            bgColor={colors.F8F6FB}
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
                            <MaterialIcon name="health-and-safety" color={colors._0D0D0D} size={30} />
                        </TouchableOpacity>
                        <View style={{ 
                            marginLeft: 5
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_000, textSizeStyles.smallTxt
                            ]}>
                                Vital Signs
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

            <View style={{
                marginBottom: 50
            }}>
                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        borderBottomWidth: 1, borderBottomColor: colors._1C2E49
                    }}>
                        <View style={{
                            paddingVertical: 20, borderRightWidth: 1,
                            borderRightColor: colors._1C2E49, paddingHorizontal: 20, width: '50%'
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                {
                                    marginBottom: 10, textAlign: 'center'
                                }
                            ]}>
                                { blood_pressure || 'not set' }
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Blood pressure
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                mm Hg
                            </Text>                        
                        </View>

                        <View style={{
                            paddingVertical: 20, paddingHorizontal: 20, width: '50%'                   
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                {
                                    marginBottom: 10, textAlign: 'center'
                                }
                            ]}>
                                { body_temperature || 'not set' }
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Body temperature
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                degree celcius {'(C)'}
                            </Text>                        
                        </View>                    
                        <View></View>
                    </View>
                </View>

                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                    }}>
                        <View style={{
                            paddingVertical: 20, borderRightWidth: 1,
                            borderRightColor: colors._1C2E49, paddingHorizontal: 20, width: '50%'
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                {
                                    marginBottom: 10, textAlign: 'center'
                                }
                            ]}>
                                { pulse || 'not set' }
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Pulse
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                beats per minute
                            </Text>                        
                        </View>

                        <View style={{
                            paddingVertical: 20, paddingHorizontal: 20 , width: '50%'                    
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                {
                                    marginBottom: 10, textAlign: 'center'
                                }
                            ]}>
                                { respiratory_rate || 'not set' }
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Respiratory rate
                            </Text>
                            <Text style={[
                                fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                breaths per minute
                            </Text>                        
                        </View>                    
                        <View></View>
                    </View>
                </View>
            </View>   
            
            <Text style={[
                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                { 
                    marginBottom: 30
                }
            ]}>
                Update vital signs
            </Text>

            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    blood_pressure: '', body_temperature: '', pulse: '', respiratory_rate: ''
                }}
                onSubmit={(values, { resetForm }) => {
                    setApiReqs({
                        isLoading: true, 
                        errorMsg: null,
                        data: {
                            url: '/users/update-vital-signs',
                            method: 'post',
                            requestBody: {
                                ...values,
                                user_id
                            }
                        }
                    })
                    return resetForm()
                }}
            >
                {
                    ({ handleBlur, handleChange, handleSubmit, values, dirty, isValid }) => (
                        <>
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
                                        Blood pressure
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
                                        <FontistoIcon color={'#AAAAAA'} name="blood-drop" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            placeholder="Blood pressure (mm Hg)"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('blood_pressure')}
                                            onBlur={handleBlur('blood_pressure')}
                                            value={values.blood_pressure}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="blood_pressure">
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
                                        Body temperature
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
                                        <FontAwesome5Icon color={'#AAAAAA'} name="temperature-high" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            keyboardType="numeric"
                                            placeholder="Body temperature (degree celcius. C)"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('body_temperature')}
                                            onBlur={handleBlur('body_temperature')}
                                            value={values.body_temperature}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="body_temperature">
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
                                        Pulse
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
                                        <FontistoIcon color={'#AAAAAA'} name="pulse" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            keyboardType="numeric"
                                            placeholder="Pulse. Heart beats per minute"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('pulse')}
                                            onBlur={handleBlur('pulse')}
                                            value={values.pulse}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="pulse">
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
                                        Respiratory rate
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
                                        <FontAwesome5Icon color={'#AAAAAA'} name="diagnoses" style={{ width: '8%' }} size={20} />
                                        <TextInput 
                                            keyboardType="numeric"                                        
                                            placeholder="Breaths per minute"
                                            placeholderTextColor={"#AAAAAA"}
                                            onChangeText={handleChange('respiratory_rate')}
                                            onBlur={handleBlur('respiratory_rate')}
                                            value={values.respiratory_rate}
                                            style={{
                                                width: '90%',
                                                fontFamily: 'Public Sans Medium'  
                                            }}
                                        />                 
                                    </View>
                                    <ErrorMessage name="respiratory_rate">
                                        { error => <CustomErrorMsg errorMsg={error} />}
                                    </ErrorMessage>                                     
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