import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";


export default FadeFromLeft = (props) => {
    const fadeFromLeftAnim = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        Animated.timing(fadeFromLeftAnim, {
          toValue: 0,
          duration: props.duration ? props.duration : 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, [fadeFromLeftAnim]);

    return(
        <Animated.View // Special animatable View
            style={[{
                ...props.containerStyle,
                left: fadeFromLeftAnim, // Bind left to animated value
            }]}>
            {
                props.children
            }
        </Animated.View>        
    )    
}