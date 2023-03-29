import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  timerContainer: {
    width: 40,
  },
  notchBlock: {
	  height: hp('5%')
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 36,
    position: 'absolute',
    width: wp('100%'),
    height: hp('8%'),
    bottom: hp('5%'),
    justifyContent: 'space-evenly',
  },
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    backgroundColor: '#F4C3C3',
    borderRadius: 50,
    left: wp('53%'),
    top: hp('-.5%')
  },
});

export { styles };
