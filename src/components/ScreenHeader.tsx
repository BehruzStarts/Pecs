import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../config/colors';
import {HEADER_HEIGHT, SCREEN_HEADER_TEXT_SIZE} from '../config/constants';

interface Props {
  navigation: any;
  title: string;
  onRightIconPress?: any;
  onLeftIconPress?: any;
  hideRightIcon?: boolean;
}
export default function ScreenHeader({
  navigation,
  title,
  onRightIconPress,
  onLeftIconPress,
  hideRightIcon = true,
}: Props) {
  const onLeftIconAction = () => {
    onLeftIconPress;
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftIconAction}>
        <Icon
          name="arrow-left"
          size={moderateScale(25)}
          color={colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.titleTxt}>{title}</Text>
      <TouchableOpacity onPress={onRightIconPress}>
        <Icon
          name="settings"
          size={moderateScale(25)}
          color={hideRightIcon ? colors.primary : colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: moderateScale(15),
  },
  titleTxt: {
    color: colors.white,
    fontSize: SCREEN_HEADER_TEXT_SIZE,
  },
});
