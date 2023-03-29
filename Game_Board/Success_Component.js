import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Animated,
  Easing,
  TouchableOpacity,
  LogBox,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useRef, useContext } from "react";
import { GameContext } from "./GameContext";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import ConfettiCannon from "react-native-confetti-cannon";

const Success_Component = () => {
  const {
    successModal,
    setSuccessModal,
    setGameEnded,
    start,
    playVictorySound,
  } = useContext(GameContext);
  LogBox.ignoreAllLogs();
  var opacities = useRef(
    [...Array(3)].map((x) => new Animated.Value(1))
  ).current;
  var scales = useRef([...Array(3)].map((x) => new Animated.Value(1))).current;
  var button1 = useRef(new Animated.Value(0)).current;
  var button2 = useRef(new Animated.Value(0)).current;

  function createLoop(opacity, scale, delay) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          delay,
          toValue: 0,
          duration: 2000,
          ease: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          ease: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          delay,
          toValue: 1.5,
          duration: 2000,
          ease: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          ease: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }

  useEffect(() => {
    if (successModal) {
      playVictorySound();
      opacities.forEach((o) => o.setValue(1));
      scales.forEach((s) => s.setValue(1));
      button1.setValue(0);
      button2.setValue(0);
      createLoop(opacities[0], scales[0], 0);
      createLoop(opacities[1], scales[1], 400);
      createLoop(opacities[2], scales[2], 800);

      Animated.timing(button1, {
        toValue: 1,
        duration: 2000,
        delay: 4000,
        ease: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(button2, {
        toValue: 1,
        duration: 2000,
        delay: 5000,
        ease: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [successModal]);

  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Montserrat_500Medium: require('../assets/fonts/Montserrat-Medium.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Modal visible={successModal} animationType="fade">
        <View style={[styles.container]}>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            autoStartDelay={540}
          />
          <View style={[styles.inner, styles.center, { marginTop: hp("8%") }]}>
            {[...Array(3).keys()].map((i) => (
              <Animated.View
                key={i}
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.inner,
                  {
                    backgroundColor: "green",
                    opacity: opacities[i],
                    transform: [
                      {
                        scaleX: scales[i],
                      },
                      {
                        scaleY: scales[i],
                      },
                    ],
                  },
                ]}
              ></Animated.View>
            ))}
            <Text style={styles.text}>SUCCESS!</Text>
          </View>
          <Animated.View style={{ opacity: button1 }}>
            <TouchableOpacity
              style={[styles.button, { marginTop: hp("20%") }]}
              onPress={() => {
                setSuccessModal(false);
                setGameEnded(true);
              }}
            >
              <Text style={styles.buttonText}>MainMenu</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: button2 }}>
            <TouchableOpacity
              style={[styles.button, { marginTop: hp("6%") }]}
              onPress={() => {
                setSuccessModal(false);
                start();
              }}
            >
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    );
  }
};

export { Success_Component };
var colorTheme = "#F4C3C3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: hp("10%"),
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    height: 170,
    width: 170,
    borderRadius: 160,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
    color: "white",
  },
  button: {
    backgroundColor: "#79E467",
    width: wp("65%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat_500Medium",
    fontSize: 23,
    letterSpacing: 5,
  },
});
