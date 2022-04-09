import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';
import colors from '../config/colors';
import {PASSWORD_STORE_KEY, TITLE_SIZE} from '../config/constants';
import {storeLocalDataItem} from '../config/UtilFunctions';

export default function SettingsScreen({navigation}: any) {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const onSave = () => {
    if (passwordInput.length < 4) {
      setErrorMsg(true);
    } else {
      storeLocalDataItem(PASSWORD_STORE_KEY, passwordInput);
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScreenHeader navigation={navigation} title="Settings" />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          onChangeText={setPasswordInput}
          value={passwordInput}
          placeholder="Update Password..."
          keyboardType="number-pad"
          maxLength={4}
          autoFocus
          onSubmitEditing={onSave}
        />
        {errorMsg && <Text style={styles.errorTxt}>Incorrect Password!</Text>}
        <Button title="Save Change" onPress={onSave} txtStyle={styles.btn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordInput: {
    height: moderateScale(40),
    padding: moderateScale(10),
    fontSize: TITLE_SIZE,
    borderWidth: moderateScale(1),
    borderRadius: 10,
    borderColor: colors.greyMedium,
  },
  btn: {
    fontSize: TITLE_SIZE,
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  errorTxt: {
    color: colors.danger,
    fontStyle: 'italic',
    marginTop: moderateScale(10),
  },
});
