import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularScroll from "../../Scroll/RegularScroll";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors, textColors } from "../../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import { isLoading } from "expo-font";
import { requestApi } from "../../apiRequests/requestApi";
import CustomErrorMsg from "../../errorMsg/CustomErrorMsg";
import dayjs from "dayjs";
import { shifts } from "../auxiliary/doctorsAux";


export default function SingleDoctor({ singleDoctor, setUserDetails, userDetails, mainRouter_fullNavigateTo }){

    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).add(1, 'day').toDate())
    const [selectedTime, setSelectedTime] = useState()
    const [avaliableTimes, setAvailableTimes] = useState()
    const [showDate, setShowDate] = useState(false)
    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            const { data } = apiReqs
            const { type, requestInfo } = data
            apiCall({ type, requestInfo })
        }
    }, [apiReqs])

    useEffect(() => {
        if(selectedDate && singleDoctor && userDetails && userDetails.details){
            setSelectedTime()
            setApiReqs({
                isLoading: true,
                errorMsg: null, 
                data: {
                    type: 'doctorAppointments',
                    requestInfo: {
                        url: '/users/get-doctor-appointments',
                        method: 'post',
                        data: {
                            date: new Date(selectedDate).toDateString(),
                            doctor_id: singleDoctor.doctor_id
                        },
                        token: userDetails.details.accessToken
                    }
                }
            })
        }
    }, [selectedDate])

    const apiCall = async ({ type, requestInfo }) => {
        try {

            const request = await requestApi(requestInfo)

            const { responseStatus, result, errorMsg } = request

            if(responseStatus){
                const { data } = result

                if(type == 'doctorAppointments'){
                    docAppointmentsApiResponse({ data, requestBody: requestInfo.data })
                }

                if(type == 'bookAppointment'){
                    bookAppointmentsApiResponse({ data, requestBody: requestInfo.data })
                }

                return setApiReqs({ isLoading: false, data: null, errorMsg: null })
            
            } else{
                if(errorMsg.error){
                    return setApiReqs({ isLoading: false, data: null, errorMsg: errorMsg.error })
                }
            } 

            throw new Error()
            
        } catch (error) {
            console.log(error)
            setUserDetails(prev => ({
                ...prev,
                alertModal: { message: 'Something went wrong. Functionalities may glitch', duration: 1000 }
            }))

            setApiReqs({ isLoading: false, data: null, errorMsg: 'Something went wrong. Functionalities may glitch' })
        }
    }

    const docAppointmentsApiResponse = ({ data, requestBody }) => {
        const takenShifts = data.map(appt => appt.shift_id)
        const updatedTimes = shifts.map(time => {
            if(takenShifts.includes(time.shift_id)){
                time.taken = true
            
            } else{
                time.taken = false
            }

            return time
        })

        return setAvailableTimes(updatedTimes)
    }

    const bookAppointmentsApiResponse = ({ data, requestBody }) => {
        //FULL NAVIGATE TO HOME SCREEN

        const updatedDoctorAppointments = [
            ...userDetails.doctorAppointments, { ...data, ...singleDoctor }
        ]

        setUserDetails(prev => ({
            ...prev,
            alertModal: { message: 'Successfully booked appointment', duration: 1000 },
            doctorAppointments: updatedDoctorAppointments
        }))

        return mainRouter_fullNavigateTo("HomeStack")
    }

    const onChangeSelectedDate = (event, chosenDate) => {
        const today = new Date()

        if(dayjs(today).isAfter(dayjs(chosenDate), 'date') || dayjs(today).isSame(dayjs(chosenDate), 'date')){
            setShowDate(false)
            return setApiReqs({ isLoading: false, data: null, errorMsg: 'Must be a future date' })
        }

        setShowDate(false)
        setSelectedDate(chosenDate);
      };

    const openDatePicker = () => setShowDate(true)

    if(singleDoctor){

        const { doctor_name, doctor_title, doctor_profile, doctor_id } = singleDoctor

        const intiateAppointmentBooking = () => {
            if(selectedDate && selectedTime){

                const { shift_id } = selectedTime

                setApiReqs({ 
                    isLoading: true,
                    errorMsg: null,
                    data: {
                        type: 'bookAppointment',
                        requestInfo: {
                            url: '/users/book-appointment',
                            method: 'post',
                            data: {
                                doctor_id, 
                                shift_id, 
                                user_id: userDetails.details.user_id, 
                                date: new Date(selectedDate).toDateString()
                            },
                            token: userDetails.details.accessToken
                        }
                    }
                })
            }

            return;
        }

        const displayTimes = avaliableTimes && avaliableTimes.map((time, i) => {
            const { end_time, start_time, shift_id, taken } = time

            const generateTimeStr = (_time) => {
                let _timeStr = String(_time)

                if(_time > 12){
                    _timeStr = `${_timeStr}pm`
                
                } else{
                    _timeStr = `${_timeStr}am`
                }

                return _timeStr
            }

            const selectTime = () => setSelectedTime(time)

            const start = generateTimeStr(start_time)
            const end = generateTimeStr(end_time)
            const isSelectedTime = 
                selectedTime 
                ?
                    selectedTime.shift_id == shift_id
                    ?
                        true
                    :
                        false
                :
                    false

            return (
                <TouchableOpacity
                    key={i}
                    onPress={selectTime}
                    disabled={taken ? true : false}
                    style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                        padding: 10, borderRadius: 10, 
                        borderWidth: isSelectedTime || taken ? 0 : 1, 
                        borderStyle: 'dotted', width: '48%', 
                        marginBottom: 10,
                        opacity: taken ? 0.5 : 1,
                        backgroundColor: 
                            isSelectedTime 
                            ? 
                                colors._1C2E49 
                            : 
                            taken
                            ?
                                'rgba(128, 128, 128, 0.5)'
                            :
                                'transparent'
                    }}
                >
                    <Text style={[
                        isSelectedTime ? textColors.text_FFF : textColors.text_000, 
                        fontFamilyStyles.publicSans, textSizeStyles.smallTxt
                    ]}>
                        { start }
                    </Text>
                    <Text style={[
                        isSelectedTime ? textColors.text_FFF : textColors.text_1C2E49, 
                        fontFamilyStyles.publicSansBold, textSizeStyles.regularText
                    ]}>
                        to
                    </Text>
                    <Text style={[
                        isSelectedTime ? textColors.text_FFF : textColors.text_000, 
                        fontFamilyStyles.publicSans, textSizeStyles.smallTxt
                    ]}>
                        { end }
                    </Text>
                </TouchableOpacity>
            )
        })

        const bookAppointmentBtnDisabled = () => {
            if(!selectedDate || !selectedTime){
                return true
            }

            if(apiReqs.isLoading){
                return true
            }

            return false
        }
        
        return (
            <>
                <RegularScroll
                    bgColor={colors.F8F6FB}
                    scrollToTopCondition={apiReqs.errorMsg}
                >
                    <View style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'flex-end', 
                        paddingHorizontal: 20, flexDirection: 'row', marginBottom: 40
                    }}>
                        <Image 
                            source={{ uri: doctor_profile }}
                            style={{
                                width: '50%', borderRadius: 10, marginRight: 5, height: 200
                            }} 
                        />
                        <View style={{
                            marginLeft: 5, width: '48%'
                        }}>
                            <Text style={[
                                textColors.text_1C2E49, textSizeStyles.mediumText, fontFamilyStyles.publicSansBold, 
                                {
                                    marginBottom: 2
                                }
                            ]}>
                                { doctor_name }
                            </Text>
                            <Text style={[
                                textColors.text_000, textSizeStyles.regularText, fontFamilyStyles.publicSans
                            ]}>
                                { doctor_title }
                            </Text>
                        </View>
                    </View>

                    {
                        apiReqs.errorMsg &&
                            <CustomErrorMsg errorMsg={apiReqs.errorMsg} centered={true} />
                    }

                    <View style={{ marginBottom: 40 }}>
                        <Text 
                            style={[ 
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                    { 
                                        marginBottom: 10
                                    }
                            ]}
                        >
                            Date
                        </Text>

                        {
                            selectedDate &&
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_000, textSizeStyles.mediumText,
                                    {
                                        marginBottom: 10
                                    }
                                ]}>
                                    { new Date(selectedDate).toDateString() }
                                </Text>
                        } 

                        <TouchableOpacity 
                            onPress={openDatePicker}
                            style={{
                                borderWidth: 1, borderStyle: 'dashed', padding: 15, borderRadius: 10
                            }}
                        >
                            <Text style={[
                                textColors.text_1C2E49, fontFamilyStyles.publicSans, textSizeStyles.smallTxt,
                                {
                                    textAlign: 'center'
                                }
                            ]}>
                                Tap to select date
                            </Text>
                        </TouchableOpacity>                                           
                    </View>

                    <View style={{ marginBottom: 40 }}>
                        <Text 
                            style={[ 
                                fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                    { 
                                        marginBottom: 10
                                    }
                            ]}
                        >
                            Available times
                        </Text>

                        <View style={{
                            display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                            justifyContent: 'space-between', flexDirection: 'row'
                        }}>
                            {
                                apiReqs.isLoading && apiReqs.data && apiReqs.data.type == 'doctorAppointments'
                                ?
                                    <View style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        flexDirection: 'row', width: '100%', paddingVertical: 20
                                    }}>
                                        <Text style={[
                                            textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.smallTxt,
                                            { marginRight: 5 }
                                        ]}>
                                            retrieving available times...
                                        </Text>
                                        <ActivityIndicator color={colors._1C2E49} size={'small'} />
                                    </View>
                                :
                                    displayTimes
                            }
                        </View>
                    </View>  

                    <TouchableOpacity
                        onPress={intiateAppointmentBooking} 
                        disabled={bookAppointmentBtnDisabled()}
                        style={{
                            padding: 15, backgroundColor: colors._1C2E49, borderRadius: 10, marginBottom: 20,
                            opacity: bookAppointmentBtnDisabled() ? 0.5 : 1
                        }}
                    >
                        {
                            apiReqs.isLoading 
                            ?
                                <ActivityIndicator color="#fff" size="small" />
                            :
                                <Text style={[
                                    textColors.text_FFF, textSizeStyles.regularText, fontFamilyStyles.publicSansBold,
                                    {
                                        textAlign: 'center'
                                    }
                                ]}>
                                    Boot a Test/Appointment
                                </Text>                            
                        }    
                    </TouchableOpacity>                  
                </RegularScroll>
                {
                    showDate &&
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChangeSelectedDate}
                        />
                } 
            </>           
        )
    }



    return <></>
}