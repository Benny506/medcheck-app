import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";


export default FadeNormal = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: props.duration ? props.duration : 2000,
          useNativeDriver: true,
        }).start();
      }, [fadeAnim]);

    return(
        <Animated.View // Special animatable View
            style={{
                ...props.containerStyle,
                opacity: fadeAnim, // Bind opacity to animated value
            }}
        >
            {
                props.children
            }
        </Animated.View>        
    )    
}