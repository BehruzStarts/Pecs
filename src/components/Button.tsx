import React, {CSSProperties} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import colors from '../config/colors';
import {TXT_SIZE} from '../config/constants';

interface Props {
  onPress: any;
  style?: CSSProperties;
  txtStyle?: CSSProperties;
  title: string;
}
export default function Button({onPress, style, txtStyle, title}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={style as StyleProp<ViewStyle>}>
      <Text style={[styles.txtStyle, txtStyle as StyleProp<ViewStyle>]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txtStyle: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    color: colors.white,
    borderRadius: 15,
    fontSize: TXT_SIZE,
  },
});
