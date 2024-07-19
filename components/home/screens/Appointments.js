import React, { useEffect, useState } from "react";
import RegularScroll from "../../Scroll/RegularScroll";
import { colors, textColors } from "../../colors/colors";
import { TouchableOpacity, View, Text, ActivityIndicator, Image } from "react-native";
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import { shifts } from "../../doctors/auxiliary/doctorsAux";
import SplashLoad from "../../loaders/SplashLoad";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NoData from "../../errorMsg/NoData";
import dayjs from "dayjs";
import DocAppt from "../auxiliary/DocAppt";


const filters = ['today', 'upcoming', 'past']


export default function Appointments({ userDetails, tabRouterNavigate }){

    const goToDoctorsStack = () => tabRouterNavigate('DoctorsStack')

    const { details, doctorAppointments } = userDetails

    const [filter, setFilter] = useState('')
    const [filteredDocAppts, setFilteredDocAppts] = useState()

    useEffect(() => {
        setFilteredDocAppts(doctorAppointments)
        setFilter('today')
    }, [userDetails])

    useEffect(() => {
        if(filter){
            if(filter == 'today'){
                const _filteredDocAppts = doctorAppointments.filter(docAppt => {
                    const { date } = docAppt

                    const today = new Date()

                    return dayjs(date).isSame(dayjs(today))
                })

                setFilteredDocAppts(_filteredDocAppts)
            
            } 
            
            if(filter == 'past'){
                const _filteredDocAppts = doctorAppointments.filter(docAppt => {
                    const { date } = docAppt

                    const today = new Date()

                    return dayjs(date).isBefore(dayjs(today))
                })

                setFilteredDocAppts(_filteredDocAppts)
            }

            if(filter == 'upcoming'){
                const _filteredDocAppts = doctorAppointments.filter(docAppt => {
                    const { date } = docAppt

                    const today = new Date()

                    return dayjs(date).isAfter(dayjs(today))
                })

                setFilteredDocAppts(_filteredDocAppts)
            }
        }
    }, [filter])

    const displayFilters = filters.map((_filter, i) => {

        const isActiveFilter = filter == _filter

        const selectFilter = () => setFilter(_filter)

        return (
            <TouchableOpacity
                key={i}
                disabled={isActiveFilter ? true : false}
                onPress={selectFilter}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10,
                    borderBottomWidth: 2, borderColor: colors._1C2E49, marginRight: 15, paddingBottom: 5,
                    opacity: isActiveFilter ? 1 : 0.3
                }}
            >
                <Text style={[
                    textColors.text_000, fontFamilyStyles.publicSansMedium, textSizeStyles.smallTxt, 
                    {
                        textTransform: 'capitalize', textAlign: 'center'
                    }
                ]}>
                    { _filter }
                </Text>
            </TouchableOpacity>
        )
    })

    const displayDoctorAppointments = filteredDocAppts && filteredDocAppts.map((docAppt, i) => (
        <View key={i}>
            <DocAppt docAppt={docAppt} />
        </View>
    ))  
    
    if(!filteredDocAppts){
        return <SplashLoad loadTxt={'retrieving appointments'} />
    }

    return (
        <View
            style={{
                flex: 1, backgroundColor: colors.F8F6FB
            }}
        >
            <View style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10, marginBottom: 20,
                paddingHorizontal: 20
            }}>
                { displayFilters }
            </View>

            <RegularScroll 
                bgColor={colors.F8F6FB}
                withBottomPadding={true}
            >
                <View>
                    {
                        filteredDocAppts && filteredDocAppts.length > 0
                        ?
                            displayDoctorAppointments
                        :
                            <View style={{ marginTop: 10 }}>
                                <NoData 
                                    onPressFunc={goToDoctorsStack} 
                                    text={'Book a new appointment'} 
                                    btnTxt={'Schedule'} 
                                    BtnIcon={() => <MaterialIcons size={20} name='schedule' color={colors._1C2E49} />}
                                /> 
                            </View> 
                    }
                </View>
            </RegularScroll>
        </View>
    )
}