import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { shifts } from "../../doctors/auxiliary/doctorsAux";
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import { textColors } from "../../colors/colors";



export default function DocAppt({ docAppt }){

    if(!docAppt){
        return <></>
    }

    const { date, doctor_id, doctor_profile, shift_id, doctor_name, doctor_title } = docAppt

    const shift = shifts.filter(shift => shift.shift_id == shift_id)[0]

    const { start_time, end_time } = shift
    
    const generateTimeStr = (_time) => {
        let _timeStr = String(_time)

        if(_time > 12){
            _timeStr = `${_timeStr}pm`
        
        } else{
            _timeStr = `${_timeStr}am`
        }

        return _timeStr
    }

    const start = generateTimeStr(start_time)
    const end = generateTimeStr(end_time)
    const dateStr = new Date(date).toDateString()

    return (
        <View
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', 
                marginBottom: 30
            }}
        >
            <Image 
                source={{ uri: doctor_profile }}
                style={{
                    width: '45%', marginRight: 5, height: '100%', borderRadius: 10
                }}
            />
            <View style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column',
                marginLeft: 5, width: '53%',
            }}>
                <View style={{ marginBottom: 40 }}>
                    <Text style={[
                        fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.mediumText, 
                        {
                            marginBottom: 4
                        }
                    ]}>
                        { doctor_name }
                    </Text>
                    <Text style={[
                        fontFamilyStyles.publicSans, textColors.text_000, textSizeStyles.regularText, 
                    ]}>
                        { doctor_title }
                    </Text>
                </View>
                
                <View>
                    <Text style={[
                        textColors.text_1C2E49, fontFamilyStyles.publicSansMedium, textSizeStyles.regularText, 
                        {
                            marginBottom: 10
                        }
                    ]}>
                        { dateStr }
                    </Text>
                    <View
                        style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', 
                            justifyContent: 'space-between', padding: 10, borderRadius: 10, 
                            borderWidth: 1, borderStyle: 'dotted', width: '90%', 
                        }}
                    >
                        <Text style={[
                            textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.smallTxt
                        ]}>
                            { start }
                        </Text>
                        <Text style={[
                            textColors.text_1C2E49, fontFamilyStyles.publicSansBold, textSizeStyles.regularText
                        ]}>
                            to
                        </Text>
                        <Text style={[
                            textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.smallTxt
                        ]}>
                            { end }
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}