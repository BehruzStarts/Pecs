import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Category from '../components/Category';
import FullScreenImage from '../components/FullScreenImage';
import ScreenHeader from '../components/home/ScreenHeader';
import appLabels from '../config/appLabels';
import colors from '../config/colors';
import {CATEGORY_STORE_KEY} from '../config/constants';
import {getPermissionAndLocalData} from '../config/UtilFunctions';

export default function HomeScreen({navigation}: any) {
  const categoriesFromMemory = getPermissionAndLocalData(CATEGORY_STORE_KEY);
  const [categories, setCategories] = useState<any>([]);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [activeUri, setActiveUri] = useState('');

  //get local data
  useEffect(() => {
    if (categoriesFromMemory !== categories) {
      setCategories(categoriesFromMemory);
    }
  }, [categoriesFromMemory]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getLocalData();
    });
  }, []);

  const getLocalData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(CATEGORY_STORE_KEY);
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        if (data !== categories) {
          return setCategories(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onImagePress = (activeImg: string) => {
    setActiveUri(activeImg);
    setIsImageFullScreen(true);
  };

  return (
    <View style={styles.container}>
      <FullScreenImage
        image={activeUri}
        isShown={isImageFullScreen}
        onClose={() => setIsImageFullScreen(false)}
      />
      <ScreenHeader title={appLabels.homeScreen} navigation={navigation} />
      {categories.length > 0 ? (
        <ScrollView>
          {categories?.map((e: any, i: number) => (
            <View key={i}>
              <Category
                categoryTitle={e.category}
                items={e.itemsArray}
                onImagePress={onImagePress}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{appLabels.uploadImgMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: moderateScale(35),
    color: colors.primary,
  },
});
