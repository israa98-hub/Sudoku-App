import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image,ImageBackground,TouchableOpacity } from 'react-native'


const Onboarding = ({navigation}) => {

    const handleSignInPress = () => {
        navigation.navigate('Login'); // تحويل إلى صفحة تسجيل الدخول
      };

      const handleSignUpPress = () => {
        navigation.navigate('signup'); // تحويل إلى صفحة تسجيل الدخول
      };

    return (
<View style={{ flex: 1, backgroundColor: "#fff" }}>
  <StatusBar barStyle="dark-content" backgroundColor="#fff" />
  {/* handshake image */}
  <View style={{ flex: 3, flexDirection: "column", backgroundColor: '#ddd' }}>
    <ImageBackground source={require('../assets/think.jpeg')}
      style={{ flex: 1, width: '100%', backgroundColor: '#fff' }} />
  </View>

  {/* button and text */}
  <View style={{ flex: 3, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
    {/* Text part */}

    {/* Button */}
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={style.button} onPress={handleSignInPress}>
        <Text style={style.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={handleSignUpPress}>
        <Text style={style.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>


    )
}

const style = StyleSheet.create({
    button: {
      backgroundColor: 'pink',
      width: 200,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      marginVertical: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  
Onboarding.navigationOptions = {
    headerShown: false,
  };




export default Onboarding

const styles = StyleSheet.create({})
