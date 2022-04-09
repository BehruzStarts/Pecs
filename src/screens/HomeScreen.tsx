import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Category from '../components/Category';
import FullScreenImage from '../components/FullScreenImage';
import ScreenHeader from '../components/home/ScreenHeader';
import appLabels from '../config/appLabels';
import colors from '../config/colors';
import {CATEGORY_STORE_KEY} from '../config/constants';
import {getPermissionAndLocalData} from '../config/UtilFunctions';
import routes from '../navigation/routes';

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
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={() => navigation.navigate(routes.EDIT_SCREEN)}>
            <Icon
              name="upload"
              size={moderateScale(80)}
              color={colors.white}
              style={styles.uploadIcon}
            />
            <Text style={styles.message}>{appLabels.uploadImgMsg}</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: colors.primary,
    marginTop: moderateScale(15),
  },
  uploadContainer: {
    margin: moderateScale(15),
    borderRadius: 10,
    elevation: moderateScale(10),
    padding: moderateScale(15),
    backgroundColor: colors.white,
  },
  uploadIcon: {
    backgroundColor: colors.primary,
    padding: moderateScale(15),
    alignSelf: 'center',
    borderRadius: 90,
  },
});
