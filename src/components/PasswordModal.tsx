import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import appLabels from '../config/appLabels';

import colors from '../config/colors';
import {PASSWORD_STORE_KEY, TITLE_SIZE} from '../config/constants';
import Button from './Button';
import Modal from './Modal';

interface Props {
  navigation: any;
}
export default function PasswordModal({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [password, setPassword] = useState('0000');

  useEffect(() => {
    getLocalData();
  }, []);

  //get password from local memory if exists
  const getLocalData = async () => {
    try {
      const value = await AsyncStorage.getItem(PASSWORD_STORE_KEY);
      if (value !== null) {
        return setPassword(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPasswordChange = (value: string) => {
    setPasswordInput(value);
    if (value.length === 4) {
      if (value === password) {
        setModalVisible(!modalVisible);
        setErrorMsg(false);
      } else setErrorMsg(true);
    }
  };

  return (
    <Modal modalVisible={modalVisible}>
      <View style={styles.centeredView}>
        <TextInput
          style={styles.passwordInput}
          onChangeText={onPasswordChange}
          value={passwordInput}
          placeholder={appLabels.enterPassword}
          keyboardType="number-pad"
          maxLength={4}
          autoFocus
        />
        {errorMsg && (
          <Text style={styles.errorTxt}>{appLabels.incorrectPassword}</Text>
        )}
        <Button
          title={appLabels.cancel}
          onPress={() => navigation.goBack()}
          txtStyle={styles.cancelBtn}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    padding: moderateScale(15),
  },
  passwordInput: {
    height: moderateScale(40),
    maxWidth: moderateScale(150),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
    fontSize: TITLE_SIZE,
    borderWidth: moderateScale(1),
    borderRadius: 5,
    borderColor: colors.greyMedium,
  },
  cancelBtn: {
    fontSize: TITLE_SIZE,
    marginTop: moderateScale(10),
  },
  errorTxt: {
    color: colors.danger,
    fontStyle: 'italic',
  },
});
