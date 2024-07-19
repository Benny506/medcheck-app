import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native'
import RegularScroll from "../../../Scroll/RegularScroll";
import { colors } from "../../../colors/colors";
import QFormat1 from "../../auxiliary/covid19Test/QFormat1";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Question3 from "../../auxiliary/covid19Test/Question3";



const questions = [
    {
        qIndex: 1,
        question_id: 'question1',
        format: 'format1',
        question: 'Do you have any of these symptoms?',
        questionOptions: [
            'Severe difficulty breathing (struggling to breathe or speak)',
            'Severe chest pain',
        ]
    },
    {
        qIndex: 2,
        question_id: 'question2',
        format: 'format1',
        question: 'Do you have any of these symptoms?',
        questionOptions: [
            'Extreme fatigue (having a hard time waking up or staying awake)',
            'Confusion or disorientation',
            'Loss of consciousness'
        ]
    },
    {
        qIndex: 4,
        question_id: 'question4',
        format: 'format1',
        question: 'Are any of these true',
        questionOptions: [
            'You are currently on medications treating any illness',
            'You have been admitted in the hospital in the last 2 months',
            'You have been diagnosed of any illness withing the last 2 weeks'
        ]
    },    
]



export default function CovidTest(){

    const fullNavigation = useNavigation()

    const fullNavigateTo = (path, data) => fullNavigation.reset({
        index: 0,
        routes: [{name: path, params: data}]
    })

    const [questionIndex, setQuestionIndex] = useState(1)
    const [answers, setAnswers] = useState([
        {
            question_id: 'question1',
            answer: null
        },
        {
            question_id: 'question2',
            answer: null
        },
        {
            question_id: 'question3',
            answer: []
        },
        {
            question_id: 'question4',
            answer: null
        }        
    ])

    useEffect(() => {
        if(answers){
            checkAnswers({ answers })
        }
    }, [answers])


    const checkAnswers = ({ answers }) => {
        if(answers && answers.length > 0){

            if(answers.map(ans => ans.answer).filter(ans => ans == null).length > 0){
                return;
            }

            const onlyAnswers = answers.map(qAns => qAns.answer)
            const onlyAnswers_3 = answers.filter(qAns => qAns.question_id == 'question3')[0].answer

            //Both 1 and 2 are yes
            if(onlyAnswers[0] == 'yes' && onlyAnswers[1] == 'yes'){
                return fullNavigateTo('TestEndScreen', { result_type: 'severe' })
            }

            //Either 1 and 2 are yes
            if(onlyAnswers[0] == 'yes' || onlyAnswers[1] == 'yes'){

                //4 is yes
                if(onlyAnswers[3] == 'yes'){
                    //One of Cough, Sore throat or chest pain is severe
                    if(onlyAnswers_3.filter(ans => ans == 'severe').length == 1){
                        return fullNavigateTo('TestEndScreen', { result_type: 'moderate' })
                    }

                    //More than one of cough, sore throat and chest pain are severe
                    if(onlyAnswers_3.filter(ans => ans == 'severe').length > 1){
                        return fullNavigateTo('TestEndScreen', { result_type: 'severe' })
                    }
                }

                //4 is no
                if(onlyAnswers[3] == 'no'){
                    //One of Cough, Sore throat or chest pain is severe
                    if(onlyAnswers_3.filter(ans => ans == 'severe').length == 1){
                        return fullNavigateTo('TestEndScreen', { result_type: 'severe' })
                    
                    } else {
                        return fullNavigateTo('TestEndScreen', { result_type: 'moderate' })
                    }
                }
            }

            //Neither 1 nor 2 are yes
            if(onlyAnswers[0] == 'no' && onlyAnswers[1] == 'no'){
                //4 is no
                if(onlyAnswers[3] == 'no'){
                    //None of Cough, sore throat or chest pain is neither severe, moderate nor mild
                    if(onlyAnswers_3.length == 0){
                        return fullNavigateTo('TestEndScreen', { result_type: 'good' })
                    
                    } 
                }

                //4 is yes or no
                if(onlyAnswers[3] == 'yes' || onlyAnswers[3] == 'no'){
                    //All of Cough, sore throat or chest pain is severe
                    if(onlyAnswers_3.filter(ans => ans == 'severe').length >= 2){
                        return fullNavigateTo('TestEndScreen', { result_type: 'moderate' })
                    
                    } else {
                        return fullNavigateTo('TestEndScreen', { result_type: 'mild' })
                    }
                }
            }

            return fullNavigateTo('TestEndScreen', { result_type: 'moderate' })
        }

        return
    }

    
    const onAnswerQuestion = ({ question_id, answer }) => {
        const updatedAnswers = answers.map(ans => {
            if(ans.question_id == question_id){
                ans.answer = answer
            }

            return ans
        })

        setAnswers(updatedAnswers)

        if(questionIndex == 4){
            console.log(updatedAnswers)
        
        } else{
            return setQuestionIndex(prev => prev+1)
        }
    }

    const displayQuestions = ({ _questions }) => _questions && _questions.map((ques, i) => {
        const { format, question, questionOptions, question_id, qIndex } = ques

        return (
            <View
                key={i}
                style={{
                    display: questionIndex == qIndex ? 'flex' : 'none'
                }}
            >
                {
                    format == 'format1'
                    ?
                        <QFormat1 
                            question={question}
                            questionOptions={questionOptions}
                            onAnswerQuestion={onAnswerQuestion}
                            question_id={question_id}
                        />
                    :
                        <></>                    
                }
            </View>
        )
    })

    const firstTwoQuestions = displayQuestions({ _questions: questions.slice(0, questions.length) })
    const lastTwoQuestions = displayQuestions({ _questions: questions.slice(2, questions.length) })

    return (
        <RegularScroll
            bgColor={colors.F8F6FB}
            withBottomPadding={true}
            withVerticalPadding={true}
        >
            <View>
                {
                    questionIndex <= 2
                    ?
                        firstTwoQuestions
                    :
                    questionIndex == 3
                    ?
                        <View>
                            <Question3 
                                onAnswerQuestion={onAnswerQuestion}
                            />
                        </View>
                    :
                        lastTwoQuestions
                }
            </View>
        </RegularScroll>
    )
}