import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";

export default function Pieces({ lives, isLifeMode, backTheme }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular: require('../assets/fonts/Montserrat-Regular.ttf')
  });
  var font_style = null;
  if (!fontsLoaded) {
    font_style = styles.size;
  } else {
    font_style = [styles.size, styles.family];
  }
  return (
    <View style={[styles.container, {"backgroundColor": backTheme }]}>
      {isLifeMode &&
        <Text style={font_style}>
          Lives: {lives > 0 ? [...Array(lives)].fill("I").join("") : 0}
        </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("8%"),
  },
  size: {
    fontSize: 20,
  },
  family: {
    fontFamily: "Montserrat_400Regular",
  },
});
