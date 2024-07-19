import React from "react";
import { Text, View } from "react-native";
import { textColors } from "../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";


export default function CustomErrorMsg({ errorMsg, centered }){
    if(!errorMsg){
        return <></>
    }

    return (
        <View style={{ marginVertical: 5 }}>
           <Text style={[
                textColors.text_FF0000, fontFamilyStyles.publicSans, textSizeStyles.extraSmallTxt,
                { 
                    textAlign: centered ? 'center' : 'left'
                }
           ]}>
                {errorMsg}
            </Text>     
        </View>
    )
}