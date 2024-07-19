import React from "react";
import RegularScroll from "../../../Scroll/RegularScroll";
import { Text, View } from "react-native";
import { fontFamilyStyles, textSizeStyles } from "../../../styleSheets/defaultStyles";
import { textColors } from "../../../colors/colors";
import QAnswer1 from "./QAnswer1";




export default function QFormat1({ question, questionOptions, onAnswerQuestion, question_id }){

    const displayQuestionOptions = questionOptions && questionOptions.map((qOpt, i) => (
        <View
            key={i}
            style={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
                marginBottom: 10
            }}
        >
            <Text style={[
                textColors.text_000, textSizeStyles.regularText, fontFamilyStyles.publicSansBold,
                {
                    width: '5%'
                }
            ]}>
                {'\u2022'}
            </Text>
            <Text style={[
                textColors.text_000, fontFamilyStyles.publicSans, textSizeStyles.regularText,
                {
                    width: '94%'
                }
            ]}>
                { qOpt }
            </Text>
        </View>
    ))

    return (
        <View>
            <Text style={[
                fontFamilyStyles.publicSansBold, textSizeStyles.extraLargeText, textColors.text_000,
                {
                    marginBottom: 20
                }
            ]}>
                { question }
            </Text>
            <View style={{
                paddingLeft: 10, marginBottom: 40
            }}>
                { displayQuestionOptions }
            </View>

            <View style={{}}>
                <QAnswer1 
                    onAnswerQuestion={onAnswerQuestion} 
                    question_id={question_id}
                />
            </View>
        </View>
    )
}