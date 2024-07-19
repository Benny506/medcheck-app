import React, { useEffect, useState } from 'react'
import RegularScroll from '../../Scroll/RegularScroll'
import { colors, textColors } from '../../colors/colors'
import { ActivityIndicator, Text, View } from 'react-native'
import { fontFamilyStyles, textSizeStyles } from '../../styleSheets/defaultStyles'
import { onRequestApi } from '../../apiRequests/requestApi'
import CustomErrorMsg from '../../errorMsg/CustomErrorMsg'


const interpretations = [
    {
        type: 'good',
        text: 'Your all good to go. No trace of the covid-19 virus.'
    },
    {
        type: 'mild',
        text: 'Your symptoms or present, though at a very mild rate.'
    },
    {
        type: 'moderate',
        text: 'Its 50/50. Some cases 60/40. There exists an even chance that you have the covid-19 virus'
    },
    {
        type: 'severe',
        text: 'Its 70/30. Some cases 80/20. There exists a very high chance that you have the covid-19 virus.'
    },
]


const recommendations = [
    {
        type: 'good',
        text: 'Your all good. No medical recommendations. Eat heathly, keep fit, and keep a good hygiene.'
    },
    {
        type: 'mild',
        text: 'Your symptoms quite minimal. Though not severe, we do recommend you go for a checkup at your nearest hospital.'
    },
    {
        type: 'moderate',
        text: 'Your symptoms are moderate. We suggest you see a doctor'
    },
    {
        type: 'severe',
        text: 'Your symptoms require emergency health care. Take the covid-19 test and see a doctor immediately.'
    },
]



export default function ResultStatsScreen({ userDetails }){

    const { details } = userDetails
    const { accessToken } = details

    const [apiReqs, setApiReqs] = useState({ isLoading: true, errorMsg: null })
    const [resultStats, setResultsStats] = useState([
        {
            type: 'moderate',
            count: 0
        },
        {
            type: 'mild',
            count: 0
        },
        {
            type: 'good',
            count: 0
        },
        {
            type: 'severe',
            count: 0
        },
    ])

    useEffect(() => {
        onRequestApi({
            requestInfo: {
                url: '/users/get-all-covid-test-results',
                method: 'get',
                token: accessToken
            },
            successCallBack: onGetStatsSuccess,
            failureCallback: onGetStatsFailure
        })
    }, [])

    const onGetStatsSuccess = ({ requestInfo, result }) => {
        const { data } = result

        const mildCount = data.filter(_result => _result.result_type == 'mild')
        const severeCount = data.filter(_result => _result.result_type == 'severe')
        const moderateCount = data.filter(_result => _result.result_type == 'moderate')
        const goodCount = data.filter(_result => _result.result_type == 'good')

        const allCases = [
            { type: 'mild', count: mildCount.length },
            { type: 'severe', count: severeCount.length },
            { type: 'moderate', count: moderateCount.length },
            { type: 'good', count: goodCount.length },
        ]

        setResultsStats(allCases)

        return setApiReqs({ isLoading: null, errorMsg: null })
    }

    const onGetStatsFailure = ({ requestInfo, errorMsg }) => {
        setApiReqs({ isLoading: false, errorMsg })

        return;
    }


    const displaySection = ({ section }) => section && section.map((interpretation, i) => {
        const { type, text } = interpretation

        return (
            <View 
                key={i}
                style={{
                    marginBottom: 20
                }}
            >
                <View style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',                    
                }}>
                    <Text style={[
                        textColors.text_000, textSizeStyles.regularText, fontFamilyStyles.publicSansBold,
                        {
                            width: '3%'
                        }
                    ]}>
                        {'\u2022'}
                    </Text>
                    <Text style={[
                        textColors.text_1C2E49, fontFamilyStyles.publicSansMedium, textSizeStyles.regularText,
                        {
                            width: '96%', textTransform: 'capitalize'
                        }
                    ]}>
                        { type }
                    </Text>
                </View>
                
                <Text style={[
                    textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.smallTxt,
                    { 
                        marginLeft: 15
                    }
                ]}>
                    { text }
                </Text>
            </View>
        )
    })


    const displayInterpretations = displaySection({ section: interpretations })
    const displayRecommendations = displaySection({ section: recommendations })


    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
            withBottomPadding={true}
        >
            <View>

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
                                    { resultStats.filter(stat => stat.type == 'good')[0].count }
                                </Text>
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.smallTxt,
                                    {
                                        textAlign: 'center'
                                    }
                                ]}>
                                    good cases
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
                                    { resultStats.filter(stat => stat.type == 'mild')[0].count }
                                </Text>
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.smallTxt,
                                    {
                                        textAlign: 'center'
                                    }
                                ]}>
                                    mild cases
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
                                    { resultStats.filter(stat => stat.type == 'moderate')[0].count }
                                </Text> 
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.smallTxt,
                                    {
                                        textAlign: 'center'
                                    }
                                ]}>
                                    moderate cases
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
                                    { resultStats.filter(stat => stat.type == 'severe')[0].count }
                                </Text>
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.smallTxt,
                                    {
                                        textAlign: 'center'
                                    }
                                ]}>
                                    severe cases
                                </Text>                        
                            </View> 
                        </View>
                    </View>
                </View> 

                {
                    apiReqs.isLoading 
                    ?
                        <View style={{
                            display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'
                        }}>
                            <Text style={[
                                fontFamilyStyles.publicSansMedium, textColors.text_1C2E49,
                                textSizeStyles.smallTxt,
                                {
                                    marginRight: 10
                                }
                            ]}>
                                grabbing result statistics...
                            </Text>
                            <ActivityIndicator color={colors._1C2E49} size={15} />
                        </View>                               
                    :
                    apiReqs.errorMsg
                    ?
                        <View style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                        }}>
                            <CustomErrorMsg errorMsg={apiReqs.errorMsg} />
                        </View>   
                    :
                        <View>
                            <View style={{
                                marginBottom: 20
                            }}>
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                    { 
                                        marginBottom: 20
                                    }
                                ]}>
                                    Intepretations
                                </Text>

                                <View>
                                    { displayInterpretations }
                                </View>
                            </View>

                            <View style={{
                                marginBottom: 20
                            }}>
                                <Text style={[
                                    fontFamilyStyles.publicSansBold, textColors.text_1C2E49, textSizeStyles.regularText,
                                    { 
                                        marginBottom: 20
                                    }
                                ]}>
                                    Recommendations
                                </Text>

                                <View>
                                    { displayRecommendations }
                                </View>
                            </View>                              
                        </View>                             
                }                                             

            </View>
        </RegularScroll>
    )
}