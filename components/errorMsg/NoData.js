import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { colors, textColors } from "../colors/colors";
import { fontFamilyStyles, textSizeStyles } from "../styleSheets/defaultStyles";
import CustomErrorMsg from "./CustomErrorMsg";


export default function NoData({ onPressFunc, text, btnTxt, BtnIcon }){
    return (
        <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.F8F6FB,
        }}>
            <View style={{ marginBottom: 10 }}>
                <Text style={[
                    fontFamilyStyles.publicSansMedium, textSizeStyles.smallTxt, textColors.text_1C2E49
                ]}>
                    { text }
                </Text>
            </View>

            {
                onPressFunc &&
                    <TouchableOpacity
                        onPress={onPressFunc}
                        style={{
                            display: 'flex', backgroundColor: colors.transparent, borderRadius: 10, padding: 15,
                            alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                            borderWidth: 1, borderStyle: 'dashed'
                        }}
                    >
                        <View style={{ marginRight: 5 }}>
                            <BtnIcon />
                        </View>
                        <Text style={[
                            textColors.text_1C2E49, fontFamilyStyles.publicSansMedium, textSizeStyles.regularText, 
                            {
                                marginLeft: 5
                            }
                        ]}>
                            {btnTxt}
                        </Text>
                    </TouchableOpacity>                
            }
        </View>        
    )
}