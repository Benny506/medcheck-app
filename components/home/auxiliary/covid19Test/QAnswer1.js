import React, { useState } from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons'
import { colors, textColors } from "../../../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../../../styleSheets/defaultStyles";




const questionAnswers = ['yes', 'no']



export default function QAnswer1({ onAnswerQuestion, question_id }){

    const [answer, setAnswer] = useState(null)

    const onProceed = () => answer && onAnswerQuestion({ question_id, answer })

    const displayQuestionAnswers = questionAnswers.map((qAns, i) => {

        const isAnswer = answer == qAns ? true : false

        const onSelectAnswer = () => setAnswer(qAns)

        return (
            <View
                key={i}
                style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10
                }}
            >
                <TouchableOpacity
                    onPress={onSelectAnswer}
                >
                    {
                        isAnswer
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
                    { qAns }
                </Text>
            </View>            
        )
    })

    return (
        <View>
            <View style={{
                marginBottom: 40
            }}>
                { displayQuestionAnswers }
            </View>

            <TouchableOpacity
                onPress={onProceed}
                disabled={answer ? false : true}
                style={{
                    paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'row', backgroundColor: colors._1C2E49, paddingVertical: 10, 
                    borderRadius: 10, marginBottom: 15,
                    opacity: answer ? 1 : 0.5
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