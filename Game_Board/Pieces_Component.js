import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon_Component } from "./Icon_Component/Icon_Component";
import { Undo_Transparent_Icon } from "./Icon_Component/Icons";
const Piece = ({ choice, setNumber, colorTheme, target }) => {
  return (
    <View style={[styles.piece, {"backgroundColor": colorTheme}]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          if (target) setNumber(choice);
        }}
      >
        <Text style={styles.number}>{choice}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Pieces_Component = (
  props = { setNumber, moves, board, setBoard, colorTheme, target, playUndoSound }
) => {
  const Undo = () => {
    const lastMove = props.moves.pop();
    if (!lastMove) {
      return;
    }
    props.playUndoSound()
    var changedBoard = [...props.board];
    changedBoard[lastMove[0]][lastMove[1]] = ".";
    props.setBoard(changedBoard);
    return;
  };
  return (
    <View style={styles.container}>
      {[...Array(9)].map((piece, i) => (
        <Piece
          key={i}
          choice={i + 1}
          setNumber={props.setNumber}
          colorTheme={props.colorTheme}
          target={props.target}
        />
      ))}
      <View style={[styles.piece, {"backgroundColor": props.colorTheme}]}>
        <Icon_Component
          SVG={Undo_Transparent_Icon}
          onPressFunction={Undo}
        ></Icon_Component>
      </View>
    </View>
  );
};
export { Pieces_Component };
// var colorTheme = "#F4C3C3";

const styles = StyleSheet.create({
  container: {
    marginRight: wp("6%"),
    marginLeft: wp("6%"),
    height: hp("10%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  piece: {
    width: wp("13%"),
    height: hp("6%"),
    margin: wp("1%"),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 30,
    color: "white",
  },
  touchable: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
