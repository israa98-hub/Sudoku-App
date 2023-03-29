import React from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';

const IconButton = ({SVG, onPressFunction}) => {
    return(
        <View style={styles.component_style}>
          <TouchableOpacity onPress={() => onPressFunction()}>
              <SVG></SVG>
          </TouchableOpacity>
        </View>
      );
    }
    const styles = StyleSheet.create({
      component_style: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }
    });

export { IconButton };