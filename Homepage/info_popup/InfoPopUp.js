import { styles } from './Styles';
import {View, Text, Animated, TouchableOpacity, Dimensions} from 'react-native';
import { useState } from 'react';

const InfoPopUp = (props={navigation}) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const {height} = Dimensions.get("window");

    const color=animation.interpolate({
        inputRange:[0,0.2,1.8,2],
        outputRange:[
            "rgba(255,255,255,0.0)",
            "rgba(45,57,82,0.5)",
            "rgba(45,57,82,0.8)",
            "rgba(255,255,255,0.0)"]
    })

    const openModal = animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,1],
        extrapolate:"clamp"
    })

    const modalTrigger = () => {
        Animated.timing(animation, {
            toValue:1,
            duration:300,
            useNativeDriver:false
        }).start();
    }

    const close = () => {
        Animated.timing(animation, {
            toValue:0,
            duration:300,
            useNativeDriver:false
        }).start();
    }

    const open = {
        transform: [
            {scale:openModal}
        ]
    }

    const background = {
        backgroundColor:color
    }

    return (
        <View style={[styles.container, styles.center]}>
                <Animated.View style={[styles.background, open]}>
                    <View style={styles.wrap}>
                        <Text style={styles.subtitle}>What is Sudoku?</Text>
                        <Text style={styles.paragraphs}>Sudoku is a traditional game played by people on their phones!</Text>
                        <Text style={styles.subtitle}>Gamemodes!</Text>
                        <Text style={styles.paragraphs}>Classic Mode - Plain and simple sudoku for beginners and pros alike!</Text>
                        <Text style={styles.paragraphs}>Timed Mode - Race against the clock in this fast paced doku puzzle!</Text>
                        <Text style={styles.subtitle}>Credits:</Text>
                        <Text style={styles.paragraphs}>Thank you to these people...</Text>
                        <Text style={styles.paragraphs}>Colin.</Text>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={[styles.button, styles.center]} onPress={close}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.center]} onPress={()=>console.warn('urmum')}>
                                <Text>Donate!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
        </View>
    );
}

export {InfoPopUp};