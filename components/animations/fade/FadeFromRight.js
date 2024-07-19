import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";


export default FadeFromRight = (props) => {
    const fadeFromRightAnim = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        Animated.timing(fadeFromRightAnim, {
          toValue: 0,
          duration: props.duration ? props.duration : 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, [fadeFromRightAnim]);

    return(
        <Animated.View // Special animatable View
            style={[{
                ...props.containerStyle,
                right: fadeFromRightAnim, // Bind right to animated value
            }]}>
            {
                props.children
            }
        </Animated.View>        
    )    
}