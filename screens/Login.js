import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getUserData } from '../AsyncStorage';

const Login = ({ navigation, route }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);


  const handleLogin = async () => {
    const storedEmail = await getUserData('email');
    const storedPassword = await getUserData('password');
  
    // التحقق من صحة البريد الإلكتروني وكلمة المرور
    if (email === storedEmail && password === storedPassword) {
      setLoginSuccess(true); // تعيين الحالة إلى تسجيل الدخول بنجاح
      navigation.navigate('homepage'); // الانتقال إلى صفحة الصفحة الرئيسية
    } else {
      setErrorOccurred(true);
    }
  };

    const handleRegisterPress = () => {
      // تنفيذ الإجراء اللازم عند النقر على الزر التسجيل
      // على سبيل المثال، قد تقوم بتوجيه المستخدم إلى صفحة التسجيل
      navigation.navigate('signup'); // الانتقال إلى صفحة الصفحة الرئيسية
    };
    return (
<ScrollView style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
  <StatusBar barStyle="dark-content" backgroundColor="#fff" />
  
  {/* login form section */}
  <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 30, paddingHorizontal: '3%', justifyContent: 'center', alignItems: 'center'}}>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 30}}>Think better</Text>
      
      <Image source={require('../assets/images/waving_hand.png')} style={{width: 30, height: 30}}/>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 20}}>Login </Text>
          </View>
    <View style={{flexDirection: 'column', paddingTop: 20, width: '95%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', borderRadius: 10, height: 60, paddingLeft: 20}}>
        <Icon name="envelope-o" size={22} color="#818181"/>
        <TextInput 
          value={email}
          onChangeText={text => setEmail(text)}
           style={styles.input} 
           placeholder="Enter Email" 
           placeholderTextColor="#818181"/>
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 20}}>
        <Icon name="lock" size={22} color="#818181"/>
        <TextInput 
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input} 
        placeholder="Enter Password" 
        secureTextEntry={true} 
        placeholderTextColor="#818181"/>
      </View>
      
      <View style={{width: '95%', marginBottom: 10}}>
      </View>
      
      <TouchableOpacity
         style={style.button}  
         >
         <Text style={style.buttonText} onPress={handleLogin} >Sign In</Text>
         </TouchableOpacity>
    </View>
  </View>
  <View style={styles.container}>
      <Text style={{ color: 'black' }}>If you don't have an account, </Text>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={{ color: 'blue' }}>click here to register</Text>
      </TouchableOpacity>
    </View>



  {errorOccurred && (
      <Text style={style.errorMessage}>خطأ في التسجيل</Text>
    )}
</ScrollView>

    )
}

export default Login
const style = StyleSheet.create({
  errorMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    marginRight: 5,
  },
  registerText: {
    color: 'blue',
  },
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        fontFamily:'OpenSans-Medium',
        paddingLeft:20,
    },
    social_btn:{
        height:55,
        width:'100%',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ddd',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    social_img:{
        width:25,
        height:25,
        marginLeft:15
    }
})
