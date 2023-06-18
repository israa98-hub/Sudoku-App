import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'


const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('Onboarding')
    },3000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:"#fff"}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#fff" />
            <Image source={require('../assets/think.jpeg')} style={{width:400,height:500}} testID="splash-image"
 />    
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})
