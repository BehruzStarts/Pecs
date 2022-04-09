import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../../config/colors';
import {HEADER_HEIGHT, SCREEN_HEADER_TEXT_SIZE} from '../../config/constants';
import routes from '../../navigation/routes';

interface Props {
  navigation: any;
  title: string;
}
export default function ScreenHeader({navigation, title}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          name="menu"
          size={moderateScale(25)}
          color={colors.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.titleTxt}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(routes.EDIT_SCREEN)}>
        <Icon
          name="edit"
          size={moderateScale(25)}
          color={colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    color: colors.white,
    fontSize: SCREEN_HEADER_TEXT_SIZE,
    fontWeight: '700',
    textAlign: 'center',
  },
  icon: {
    marginHorizontal: moderateScale(15),
  },
});
