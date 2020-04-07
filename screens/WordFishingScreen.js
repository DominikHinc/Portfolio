import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { ColorsContext } from '../helpers/ColorsContext'

const WordFishingScreen = (props) => {
    const {colors} = useContext(ColorsContext)
    return (
        <View style={[styles.screen, {backgroundColor:colors.background}]}>
            <Text>WordFishing Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    }
})


export default WordFishingScreen
