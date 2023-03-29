import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./Styles";
import { Icon_Component } from "./Icon_Component/Icon_Component";
import { Back_Icon } from "./Icon_Component/Icons";

const Header_Component = ({
  level,
  navigation,
  isTimed,
  save,
  initialMinute,
  initialSecond,
  successModal,
  stopTime,
  setStopTime,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSecond);
  const Navigate_Home = async () => {
    const gameState = await save(minutes, seconds);
    navigation.navigate("homepage", { gameState });
    return;
  };
  return (
    <View style={styles.container}>
      <Icon_Component
        SVG={Back_Icon}
        onPressFunction={Navigate_Home}
      ></Icon_Component>
      <View>
        <Text>{level.toUpperCase()}</Text>
      </View>
      {isTimed && (
        <View style={styles.timerContainer}>
          <Timer
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            successModal={successModal}
            stopTime={stopTime}
            setStopTime={setStopTime}
          ></Timer>
        </View>
      )}
    </View>
  );
};

const Timer = ({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  successModal,
  stopTime,
  setStopTime,
}) => {
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (successModal && stopTime === null) {
        setStopTime([minutes, seconds])
      }
      setSeconds(seconds + 1);
      if (seconds === 60) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      <Text>
        {" "}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

export { Header_Component };
