import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Icon_Component = ({SVG, onPressFunction, text}) => {
  return(
    <View style={styles.component_style}>
      <TouchableOpacity onPress={() => onPressFunction()}>
          <SVG></SVG>
      </TouchableOpacity>
      {
        text && <Text>{text}</Text>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  component_style: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});
export { Icon_Component };
