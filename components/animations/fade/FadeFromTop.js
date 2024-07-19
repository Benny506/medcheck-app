import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";


export default FadeFromTop = (props) => {
    const { fromValue, toValue, duration, containerStyle, fadeOut, durationOut, delay, animationCallBack } = props

    const fadeFromTopAnim = useRef(new Animated.Value(fromValue ? fromValue : -300)).current;

    useEffect(() => {
        Animated.timing(fadeFromTopAnim, {
          toValue: toValue ? toValue : 0,
          duration: duration ? duration : 2000,
          easing: Easing.bounce,
          useNativeDriver: false,
        }).start(() => {
            if(fadeOut){
                Animated.sequence([
                    Animated.delay(delay ? delay : 1200),
                    Animated.timing(fadeFromTopAnim, {
                        toValue: fromValue,
                        duration: durationOut ? durationOut : 2000,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    })                                     
                ]).start(() => {
                    if(animationCallBack){
                        fadeFromTopAnim.setValue(fromValue ? fromValue : -300)
                        animationCallBack()
                    }
                })
            }
        });
      }, [fadeFromTopAnim]);

    return(
        <Animated.View // Special animatable View
            style={[{
                ...containerStyle,
                top: fadeFromTopAnim, // Bind top to animated value
            }]}>
            {
                props.children
            }
        </Animated.View>        
    )    
}