import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import EditCategory from '../components/editCategory/EditCategory';
import ScreenHeader from '../components/ScreenHeader';
import colors from '../config/colors';
import {
  getPermissionAndLocalData,
  storeLocalData,
} from '../config/UtilFunctions';
import {CATEGORY_STORE_KEY} from '../config/constants';
import PasswordModal from '../components/PasswordModal';
import Button from '../components/Button';
import routes from '../navigation/routes';
import appLabels from '../config/appLabels';

interface Props {
  navigation: any;
}

export default function EditScreen({navigation}: Props) {
  const [categories, setCategories] = useState<any>();
  const categoriesFromMemory = getPermissionAndLocalData(CATEGORY_STORE_KEY);

  //get local data
  useEffect(() => {
    if (categoriesFromMemory) {
      setCategories(categoriesFromMemory);
    }
  }, [categoriesFromMemory]);

  //store to local memory
  useEffect(() => {
    if (categories && categories !== categoriesFromMemory) {
      storeLocalData(CATEGORY_STORE_KEY, categories);
    }
  }, [categories]);

  const onCategoryChange = (value: any, index: number) => {
    categories[index] = value;
    setCategories([...categories]);
  };

  const onCategoryRemove = (index: number) => {
    if (index > -1) {
      categories.splice(index, 1);
      setCategories([...categories]);
    }
  };

  const onAddNewCategory = () => {
    const newObj = {
      category: '',
      itemsArray: [],
    };

    if (categories?.length > 0) {
      setCategories([...categories, newObj]);
    } else setCategories([newObj]);
  };

  return (
    <View style={styles.screenContainer}>
      <PasswordModal navigation={navigation} />
      <ScreenHeader
        navigation={navigation}
        title={appLabels.addEditImages}
        onRightIconPress={() => navigation.navigate(routes.SETTINGS_SCREEN)}
        hideRightIcon={false}
      />
      <Button
        title={appLabels.addNewCategory}
        onPress={onAddNewCategory}
        style={styles.addCategoryBtn}
      />
      <ScrollView>
        {categories?.length > 0 ? (
          <View>
            {categories?.map((e: any, i: number) => (
              <View key={i}>
                <EditCategory
                  category={e.category}
                  itemsArray={e.itemsArray}
                  setCategoryObj={(v: any) => onCategoryChange(v, i)}
                  onCategoryRemove={() => onCategoryRemove(i)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{appLabels.addCategoryMsg}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {flex: 1, backgroundColor: colors.white},
  addCategoryBtn: {
    margin: moderateScale(15),
    alignSelf: 'flex-end',
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(15),
  },
  message: {
    textAlign: 'center',
    fontSize: moderateScale(35),
    color: colors.primary,
  },
});
