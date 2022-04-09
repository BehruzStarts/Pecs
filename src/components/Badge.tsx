import React, {CSSProperties} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../config/colors';

interface Props {
  onPress: any;
  style: CSSProperties;
}

export default function Badge({onPress, style}: Props) {
  return (
    <TouchableOpacity
      style={[styles.closeIconCont, style as StyleProp<ViewStyle>]}
      onPress={onPress}>
      <Icon name="close" size={moderateScale(12)} color={colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeIconCont: {
    backgroundColor: colors.white,
    padding: moderateScale(3),
    borderRadius: 50,
    elevation: moderateScale(7),
    zIndex: 1,
  },
});
