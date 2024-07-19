import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";


export default FadeFromBottom = (props) => {
    const fadeFromBottomAnim = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        Animated.timing(fadeFromBottomAnim, {
          toValue: 0,
          duration: props.duration ? props.duration : 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, [fadeFromBottomAnim]);

    return(
        <Animated.View // Special animatable View
            style={[{
                ...props.containerStyle,
                bottom: fadeFromBottomAnim, // Bind bottom to animated value
            }]}>
            {
                props.children
            }
        </Animated.View>        
    )    
}