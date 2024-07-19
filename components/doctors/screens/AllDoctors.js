import React, { useEffect, useState } from "react";
import RegularScroll from "../../Scroll/RegularScroll";
import { colors, textColors } from "../../colors/colors";
import { View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native'
import { fontFamilyStyles, textSizeStyles } from "../../styleSheets/defaultStyles";
import FeatherIcon from 'react-native-vector-icons/Feather'
import { LinearGradient } from "expo-linear-gradient";
import EntypoIcon from 'react-native-vector-icons/Entypo'


export default function AllDoctors({ setSingleDoctor, allDoctors }){

    const [filter, setFilter] = useState('')
    const [filteredDoctors, setFilteredDoctors] = useState(allDoctors)

    useEffect(() => {
        if(filter){

            const _filteredDoctors = allDoctors.filter(doc => 
                doc.name.toLowerCase().includes(filter.toLowerCase())
                ||
                filter.toLowerCase().includes(doc.name.toLowerCase())
                ||
                doc.title.toLowerCase().includes(filter.toLowerCase())
                ||
                filter.toLowerCase().includes(doc.title.toLowerCase())
            )

            setFilteredDoctors(_filteredDoctors)

        } else{
            setFilteredDoctors(allDoctors)
        }

    }, [filter])

    const onFilterChange = (filter) => setFilter(filter)

    const displayDoctors = filteredDoctors.map((doctor, i) => {
        const { doctor_id, doctor_profile, doctor_name, doctor_title } = doctor

        const selectDoctor = () => setSingleDoctor(doctor)

        return (
            <TouchableOpacity
                key={i}
                onPress={selectDoctor}
                style={{
                    marginBottom: 5, width: '49%', borderRadius: 5
                }}
            >
                <ImageBackground
                    source={{ uri: doctor_profile }}
                    imageStyle={{
                        borderRadius: 10, 
                    }}
                >
                    <LinearGradient 
                        locations={[0.2, 0.8]}
                        colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)"]}
                        style={{
                            borderRadius: 10
                        }}
                    >
                        <View style={{
                            paddingTop: 200, paddingHorizontal: 10, paddingBottom: 10
                        }}>
                            <Text style={[
                                textColors.text_FFF, fontFamilyStyles.publicSansMedium, textSizeStyles.regularText,
                                {
                                    marginBottom: 5
                                }
                            ]}>
                                { doctor_name }
                            </Text>
                            <Text style={[
                                textColors.text_FFF, fontFamilyStyles.publicSans, textSizeStyles.smallTxt,
                                {
                                    marginBottom: 5
                                }
                            ]}>
                                { doctor_title }
                            </Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        )
    })

    return (
        <View
            style={{
                flex: 1, backgroundColor: colors.F8F6FB, paddingHorizontal: 0, paddingTop: 20
            }}
        >
            <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
                <View
                    style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexDirection: 'row', paddingVertical: 8,
                        shadowColor: '#AAAAAA',
                        elevation: 5,
                        backgroundColor: '#FFF',
                        borderRadius: 10,
                        paddingHorizontal: 15,                          
                    }}
                >
                    <FeatherIcon color={'#AAAAAA'} name="search" style={{ width: '8%' }} size={20} />
                    <TextInput 
                        placeholder="Find your doctor"
                        placeholderTextColor={"#AAAAAA"}
                        value={filter}
                        onChangeText={onFilterChange}
                        style={{
                            width: '90%',
                            fontFamily: 'Public Sans Medium'  
                        }}
                    />                 
                </View>                                     
            </View> 

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, paddingHorizontal: 3
                }}
            >
                {
                    filteredDoctors.length > 0
                    ?
                        <View style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexDirection: 'row', flexWrap: 'wrap'
                        }}>
                            { displayDoctors }
                        </View>
                    :
                        <View style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            paddingTop: 80
                        }}>
                            <EntypoIcon name="trash" color={colors._1C2E49} size={30} style={{ marginBottom: 10 }} />
                            <Text style={[
                                textColors.text_1C2E49, fontFamilyStyles.publicSans, textSizeStyles.regularText, {
                                    textAlign: 'center'
                                }
                            ]}>
                                No doctors found. Try another search filter
                            </Text>
                        </View>                    
                }
            </ScrollView>           
        </View>
    )
}