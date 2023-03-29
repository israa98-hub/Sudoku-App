import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useRef, useContext } from "react";
import { GameContext } from "./GameContext";

var Cell = ({ cell = [], loc }) => {
  const {
    board,
    target,
    setTarget,
    mistakes,
    notesMode,
    notes,
    hintLoc,
    tileTheme,
    hintsModal,
  } = useContext(GameContext);
  const opacity = useRef(new Animated.Value(1)).current;
  var note = notes[JSON.stringify(loc)];
  var color =
    target && loc[0] === target[0] && loc[1] === target[1]
      ? styles.touched
      : {};
  var mistake = mistakes[JSON.stringify(loc)] ? styles.mistake : {};
  var hinted = JSON.stringify(loc) === JSON.stringify(hintLoc);

  useEffect(() => {
    if (hintsModal) {
      var breathe = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 800,
            ease: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            ease: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
      breathe.start();
    }
  }, [hintsModal]);

  return (
    <View style={styles.cell}>
      {cell === "." ? (
        hinted ? (
          <Animated.View style={[styles.hinted, { opacity }]}>
            <Text style={styles.numbers}>{cell}</Text>
          </Animated.View>
        ) : (
          <TouchableOpacity
            style={[styles.empty, color]}
            onPress={() => setTarget(loc)}
          >
            <Text style={styles.notes}>
              {note ? Array.from(note).sort() : null}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <View style={[{ backgroundColor: tileTheme }, styles.circle, mistake]}>
          <Text style={styles.numbers}>{cell}</Text>
        </View>
      )}
    </View>
  );
};

const SquareRowView = ({ rowNumber, square, grid }) => {
  const square_index1 = rowNumber * 3;
  const square_index2 = rowNumber * 3 + 1;
  const square_index3 = rowNumber * 3 + 2;
  return (
    <View style={styles.row}>
      <Cell cell={square[square_index1]} loc={[grid, square_index1]} />
      <View style={styles.sideLine}></View>
      <Cell cell={square[square_index2]} loc={[grid, square_index2]} />
      <View style={styles.sideLine}></View>
      <Cell cell={square[square_index3]} loc={[grid, square_index3]} />
    </View>
  );
};

var Square = ({ square = [], grid }) => {
  return (
    <View style={styles.square}>
      <SquareRowView rowNumber={0} square={square} grid={grid} />
      <View style={styles.lineRow}>
        {[...Array(3)].map((line, i) => (
          <View key={i} style={styles.bottomLine}></View>
        ))}
      </View>
      <SquareRowView rowNumber={1} square={square} grid={grid} />
      <View style={styles.lineRow}>
        {[...Array(3)].map((line, i) => (
          <View key={i} style={styles.bottomLine}></View>
        ))}
      </View>
      <SquareRowView rowNumber={2} square={square} grid={grid} />
    </View>
  );
};

const GridRowView = ({ rowNumber }) => {
  const board_and_grid_index1 = rowNumber * 3;
  const board_and_grid_index2 = rowNumber * 3 + 1;
  const board_and_grid_index3 = rowNumber * 3 + 2;
  const { tileTheme, board } = useContext(GameContext);

  return (
    <View style={styles.gridRow}>
      <Square
        square={board[board_and_grid_index1]}
        grid={board_and_grid_index1}
      />
      <View style={[styles.gSideLine, { backgroundColor: tileTheme }]}></View>
      <Square
        square={board[board_and_grid_index2]}
        grid={board_and_grid_index2}
      />
      <View style={[styles.gSideLine, { backgroundColor: tileTheme }]}></View>
      <Square
        square={board[board_and_grid_index3]}
        grid={board_and_grid_index3}
      />
    </View>
  );
};

const Grid = () => {
  var setClicked = (loc) => setTarget(loc);
  const { tileTheme } = useContext(GameContext);
  return (
    <View style={styles.board}>
      <GridRowView rowNumber={0}></GridRowView>
      <View style={styles.gridRow}>
        {[...Array(3)].map((line, i) => (
          <View
            key={i}
            style={[styles.gBottomLine, { backgroundColor: tileTheme }]}
          ></View>
        ))}
      </View>
      <GridRowView rowNumber={1}></GridRowView>
      <View style={styles.gridRow}>
        {[...Array(3)].map((line, i) => (
          <View
            key={i}
            style={[styles.gBottomLine, { backgroundColor: tileTheme }]}
          ></View>
        ))}
      </View>
      <GridRowView rowNumber={2}></GridRowView>
    </View>
  );
};

export { Grid };

var marginWidth = 5;

const styles = StyleSheet.create({
  board: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  gridRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
  },
  gSideLine: {
    width: 5,
    height: hp("15%"),
    borderRadius: 10,
  },
  gBottomLine: {
    width: wp("34%"),
    height: 5,
    borderRadius: 10,
  },
  sideLine: {
    backgroundColor: "black",
    width: 1,
    height: hp("4%"),
    marginTop: hp("0.5%"),
  },
  bottomLine: {
    backgroundColor: "black",
    width: wp("8%"),
    height: 1,
    marginTop: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  lineRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cell: {
    marginTop: hp("0.4%"),
    height: hp("4%"),
    width: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    marginBottom: 1,
  },
  numbers: {
    fontWeight: "300",
  },
  circle: {
    height: hp("4%"),
    width: wp("8%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  empty: {
    height: hp("4%"),
    width: wp("8%"),
  },
  touched: {
    marginBottom: hp("0.4%"),
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
    justifyContent: "center",
    height: hp("3.5%"),
    width: wp("8%"),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  mistake: {
    backgroundColor: "red",
  },
  notes: {
    fontSize: 10,
  },
  hinted: {
    marginBottom: hp("0.4%"),
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#87CEFA",
    elevation: 2, // Android
    justifyContent: "center",
    height: hp("3.5%"),
    width: wp("8%"),
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
});
