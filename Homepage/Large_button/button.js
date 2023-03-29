import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import styles from "./styles";
import {funcs} from "../../Game_Board/gameLogic2";
import {
  DIFFICULTY_DEFAULT,
  GAME_MODE_DEFAULT,
  LIVES_DEFAULT
}
from "../../Constants/constants";

const LargeButton = ({
  content,
  ID,
  navigation,
  difficulty,
  gameMode,
  lives,
  colorTheme,
  gameState,
  soundState
}) => {
  const [buttonSound, setButtonSound] = useState();

  async function playButtonSound() {
    if(soundState) {await buttonSound.replayAsync();}
  }

  async function initAudio() {
    //
    const buttonAudioObject = new Audio.Sound();
    try {
      await buttonAudioObject.loadAsync(
        require("../../Game_Board/Sounds/main_buttons.mp3")
      );
      //
    } catch (err) {
      console.error(err);
    }
    setButtonSound(buttonAudioObject);
  }

  useEffect(() => {
    initAudio();
    return () => {
      //buttonSound.unloadAsync();
    };
  }, []);

  const Navigate_GameBoard = () => {
    playButtonSound();
    if (ID == "1") {

      var [unsolvedBoard, solvedBoard] = funcs.generate(difficulty);
      navigation.navigate("gameBoard", {
        difficulty,
        lives,
        gameMode,
        colorTheme,
        unsolvedBoard,
        solvedBoard,
        soundState
      });
    } else if (ID == "0") {
      const prevGame = JSON.parse(gameState);

      navigation.navigate("gameBoard", {
        difficulty: prevGame.difficulty,
        lives: prevGame.lives,
        gameMode: prevGame.gameMode,
        colorTheme,
        unsolvedBoard: prevGame.board,
        solvedBoard: prevGame.solvedBoard,
        mistakes: prevGame.mistakes,
        moves: prevGame.moves,
        initialMinute: prevGame.initialMinute,
        initialSecond: prevGame.initialSecond,
        soundState
      });
    }
  };

  return (
    <View style={styles.button_container}>
      <TouchableOpacity
        style={[{ backgroundColor: colorTheme.tileColor }, styles.large_button]}
        onPress={Navigate_GameBoard}
      >
        <Text style={styles.button_text}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LargeButton;
