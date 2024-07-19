import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fontFamilyStyles, textSizeStyles } from "../../../styleSheets/defaultStyles";
import { colors, textColors } from "../../../colors/colors";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'


const questions = ['cough', 'sore throat', 'chest pain']
const severityOptions = ['mild', 'moderate', 'severe']


export default function Question3({ onAnswerQuestion }){

    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [shouldProceed, setShouldProceed] = useState(true)

    useEffect(() => {
        if(answeredQuestions.length > 0){
            let _shouldProceed = true

            for(let i = 0; i < answeredQuestions.length; i++){
                if(answeredQuestions[i].severity == null){
                    _shouldProceed = false
                }
            }

            setShouldProceed(_shouldProceed)

        } else{
            setShouldProceed(true)
        }
    }, [answeredQuestions])

    const displayQuestions = questions.map((question, i) => {

        const isSelected = answeredQuestions.find(ques => ques.name == question)

        const onSelect = () => {
            if(isSelected){
                const updatedAnsweredQuestions = answeredQuestions.filter(aQues => aQues.name != question)
                setAnsweredQuestions(updatedAnsweredQuestions)
            
            } else{
                setAnsweredQuestions(prev => [
                    ...prev, { name: question, severity: null }
                ])
            }
        }

        const displaySeverityOptions = severityOptions.map((sOpt, i) => {

            const onSelectSeverityOption = () => {
                const updatedAnsweredQuestions = answeredQuestions.map(aQues => {
                    if(aQues.name == question){
                        aQues.severity = sOpt
                    }

                    return aQues
                })
                setAnsweredQuestions(updatedAnsweredQuestions)
            }

            const checkSeverityOption = () => {
                const ques = answeredQuestions.filter(aQues => aQues.name == question)[0]
                if(ques){
                    if(ques.severity == sOpt){
                        return true
                    }
                }

                return false
            }

            const isSeverityOption = checkSeverityOption()

            return (
                <View
                    key={i}
                    style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={onSelectSeverityOption}
                    >
                        {
                            isSeverityOption
                            ?
                                <IonIcon name="radio-button-on-outline" size={20} color={colors._1C2E49} />
                            :
                                <IonIcon name="radio-button-off-outline" size={20} color={colors._1C2E49} />
                        }
                    </TouchableOpacity>
                    
                    <Text style={[
                        textColors.text_1C2E49, fontFamilyStyles.publicSans, textSizeStyles.regularText, 
                        {
                            textTransform: 'capitalize', marginLeft: 10
                        }
                    ]}>
                        { sOpt }
                    </Text>
                </View> 
            )
        })

        return (
            <View
                key={i}
                style={{
                    marginBottom: 10
                }}
            >
                <View
                    style={{
                        display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={onSelect}
                    >
                        {
                            isSelected
                            ?
                                <MaterialCommunityIcon size={20} color={colors._1C2E49} name="checkbox-marked" />
                            :
                                <MaterialCommunityIcon size={20} color={colors._1C2E49} name="checkbox-blank-outline" />
                        }
                    </TouchableOpacity>

                    <Text style={[
                        textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.regularText,
                        { 
                            textTransform: 'capitalize', marginLeft: 10
                        }
                    ]}>
                        { question }
                    </Text>
                </View>

                {
                    isSelected &&
                        <View style={{
                            marginLeft: 20
                        }}>
                            { displaySeverityOptions }
                        </View>
                }
            </View>
        )
    })

    const onProceed = () => onAnswerQuestion && onAnswerQuestion({ question_id: 'question3', answer: answeredQuestions })

    return (
        <View>
            <Text style={[
                fontFamilyStyles.publicSansBold, textSizeStyles.extraLargeText, textColors.text_000,
                {
                    marginBottom: 10
                }
            ]}>
                Do you have any of these other symptoms?
            </Text> 

            <Text style={[
                fontFamilyStyles.publicSans, textSizeStyles.regularText, textColors.text_1C2E49, 
                {
                    marginBottom: 20
                }
            ]}>
                Select all the symptoms you have right now. If you don't have any of these symptoms, then just proceed without selecting anything
            </Text>

            <View style={{
                paddingLeft: 10, marginBottom: 40
            }}>
                { displayQuestions }
            </View>

            <TouchableOpacity
                onPress={onProceed}
                disabled={shouldProceed ? false : true}
                style={{
                    paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'row', backgroundColor: colors._1C2E49, paddingVertical: 10, 
                    borderRadius: 10, marginBottom: 15,
                    opacity: shouldProceed ? 1 : 0.5
                }}
            >
                <Text style={[
                    fontFamilyStyles.publicSansMedium, textColors.text_FFF, textSizeStyles.regularText
                ]}>
                    Proceed 
                </Text>
            </TouchableOpacity>            
        </View>
    )
}