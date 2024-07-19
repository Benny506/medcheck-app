import React, { useEffect, useRef } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";


export default function RegularScroll(props){

    const { scrollToTopCondition, withBottomPadding } = props

    const scrollRef = useRef(null)

    useEffect(() => {
        if(scrollToTopCondition){
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }
    }, [scrollToTopCondition])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView ref={scrollRef} style={{ flex: 1, backgroundColor: props.bgColor || '#fff' }}>
                <View style={{ 
                    flex: 1, paddingHorizontal: 20, 
                    paddingBottom: withBottomPadding ? 20 : 0
                }}>
                    { props.children }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}