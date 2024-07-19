import { StyleSheet } from "react-native";

export const textSizeStyles = StyleSheet.create({
    extraSmallTxt: {
        fontSize: 12
    },
    smallTxt: {    
        fontSize: 14
    },
    regularText: {    
        fontSize: 16
    },
    mediumText: {    
        fontSize: 20
    },
    largeText: {    
        fontSize: 24
    },
    extraLargeText: {
        fontSize: 26
    }
})


export const fontWeightStyles = StyleSheet.create({
    weight_500: {
        fontWeight: '500'
    },
    weight_600: {
        fontWeight: '600'
    },
    weight_700: {
        fontWeight: '700'
    },
    weight_800: {
        fontWeight: '800'
    },
    weight_900: {
        fontWeight: '900'
    }
})


export const fontFamilyStyles = StyleSheet.create({
    publicSans: {
        fontFamily: 'Public Sans'
    },
    publicSansMedium: {
        fontFamily: 'Public Sans Medium'
    },
    publicSansBold: {
        fontFamily: 'Public Sans Bold'
    }    
})