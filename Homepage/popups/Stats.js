import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { IconButton } from "../icon_button/IconButton";
import { Plus_Icon2 } from "../icon_button/Icons";
import { Left_Arrow, Right_Arrow } from "../icon_button/Icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as CONSTANTS from "../../Constants/constants.js";
import {
  DIFFICULTY_DEFAULT,
  GAME_MODE_DEFAULT,
  LIVES_DEFAULT,
} from "../../Constants/constants";

const Stats = ({ setStatsVisible }) => {
  const [record, setRecord] = useState();
  const [numGames, setNumGames] = useState();
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_DEFAULT);

  useEffect(() => {
    const getStats = async () => {
      let highScore = await AsyncStorage.getItem(difficulty + "highScore");
      let totalGames = await AsyncStorage.getItem(difficulty + "totalGames");
      setRecord(JSON.parse(highScore));
      setNumGames(totalGames);
      if (highScore ) setLoading(false);
    };

    getStats();
  }, [difficulty]);

  const [diffIdx, setDiffIdx] = useState(0);
  const diff = [
    CONSTANTS.DIFFICULTY_EASY,
    CONSTANTS.DIFFICULTY_MEDIUM,
    CONSTANTS.DIFFICULTY_HARD,
  ];
  const cycle = (flag, index, setIndex, setSelection, selection) => {
    let newIndex = index;
    if (flag == "left") {
      if (index === 0) {
        newIndex = selection.length - 1;
      } else if (index < 0) {
        newIndex = selection.length - 1;
      } else {
        newIndex = index - 1;
      }
    } else if (flag == "right") {
      if (index === selection.length - 1) {
        newIndex = 0;
      } else if (index < 0) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }
    }
    setIndex(newIndex);
    setSelection(selection[newIndex]);
  };

  const cycleDifficulty = (flag) =>
    cycle(flag, diffIdx, setDiffIdx, setDifficulty, diff);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setStatsVisible(false)}
        style={styles.exit}
      >
        <Image
          source={require("../../assets/x.png")}
          style={{ height: 30, width: 30 }}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.statsTitle}>STATS</Text>
      </View>

      <View style={styles.selectionsContainer}>
        <View style={styles.selectButton}>
          <View style={styles.leftArrow}>
            <IconButton
              SVG={Left_Arrow}
              onPressFunction={() => cycleDifficulty("left")}
            ></IconButton>
          </View>
          <View style={styles.selectText}>
            <Text>{difficulty}</Text>
          </View>
          <View style={styles.rightArrow}>
            <IconButton
              SVG={Right_Arrow}
              onPressFunction={() => cycleDifficulty("right")}
            ></IconButton>
          </View>
        </View>
      </View>

      {!loading && (
        <View style={styles.scores}>
          <View style={styles.titles}>
            <Text style={styles.title}>DATE COMPLETED</Text>
            <Text style={styles.title}>TIME ELAPSED</Text>
          </View>
          <View style={styles.titles}>
            <View style={styles.yellowLabel}>
              <Text style={styles.buttonTitle}>BEST TIME</Text>
            </View>
          </View>
          <View style={styles.titles}>
            <Text style={styles.numbers}>{record ? record[2] : ''}</Text>
            <Text style={styles.numbers}>........................</Text>
            <Text style={styles.numbers}>{record ? `${
              record[0] < 10 ? "0" + record[0] : record[0]
            }:${record[1] < 10 ? "0" + record[1] : record[1]}` : ''}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>Total Puzzles Solved</Text>
            <Text style={styles.totalText}>{numGames || 0}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  exit: {
    position: "absolute",
    zIndex: 3, // works on ios
    elevation: 3,
  },
  container: {
    height: hp("40%"),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  statsTitle: {
    fontSize: 27,
    fontWeight: "600",
  },
  selectionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  selectButton: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  leftArrow: {
    width: "30%",
  },
  rightArrow: {
    width: "30%",
  },
  selectText: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  scores: {
    height: hp("44%"),
    justifyContent: "flex-start",
    // alignItems: "center",
    paddingVertical: 20,
  },
  titles: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    marginVertical: 5,
    marginHorizontal: 35,
  },
  yellowLabel: {
    fontSize: 10,
    marginVertical: 5,
    backgroundColor: "#FCF323",
    borderRadius: 6,
  },
  buttonTitle: {
    fontSize: 10,
    marginVertical: 5,
    marginHorizontal: 22,
  },
  numbers: {
    fontSize: 12,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  total: {
    marginTop: hp("8%"),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "600",
    margin: 5,
  },
});

export default Stats;
