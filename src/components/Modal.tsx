import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

import colors from '../config/colors';

interface Props {
  children: any;
  modalVisible: boolean;
}

export default function Modal({children, modalVisible}: Props) {
  const window = useWindowDimensions();

  if (modalVisible) {
    return (
      <View
        style={[
          styles.modalContainer,
          {width: window.width, height: window.height},
        ]}>
        <View style={styles.container}>{children}</View>
      </View>
    );
  } else return null;
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    elevation: 99,
    zIndex: 99,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black50,
  },
});
