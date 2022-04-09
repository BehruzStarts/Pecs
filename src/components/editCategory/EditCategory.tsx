import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import appLabels from '../../config/appLabels';

import colors from '../../config/colors';
import {TXT_SIZE} from '../../config/constants';
import Badge from '../Badge';

interface Props {
  setCategoryObj: any;
  onCategoryRemove: any;
  itemsArray: any;
  category: string;
}

export default function EditCategory(props: Props) {
  const [category, setCategory] = useState(props.category);
  const [itemsArray, setItemsArray] = useState(props.itemsArray);

  useEffect(() => {
    props.setCategoryObj({category, itemsArray});
  }, [category, itemsArray]);

  useEffect(() => {
    if (props.category !== category) setCategory(props.category);
  }, [props.category]);

  useEffect(() => {
    if (props.itemsArray !== itemsArray) setItemsArray(props.itemsArray);
  }, [props.itemsArray]);

  const onUpload = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: false},
      onImageCallback,
    );
  };

  const onCamera = () => {
    launchCamera({mediaType: 'photo', includeBase64: false}, onImageCallback);
  };

  const onImageCallback = (obj: any) => {
    const assets = obj?.assets?.[0];
    // const base64 = 'data:' + assets?.type + ';base64,' + assets?.base64;
    const uri = assets?.uri;

    if (uri) {
      const itemObj = {desc: '', img: uri};
      if (itemsArray) {
        setItemsArray([itemObj, ...itemsArray]);
      } else setItemsArray([itemObj]);
    }
  };

  const onItemTextChange = (value: string, index: number) => {
    itemsArray[index].desc = value;
    setItemsArray([...itemsArray]);
  };

  const onItemRemove = (index: number) => {
    if (index > -1) {
      itemsArray.splice(index, 1);
      setItemsArray([...itemsArray]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.itemMainContainer}>
          <View style={{minHeight: moderateScale(200)}}>
            <Badge
              style={styles.closeIconCont}
              onPress={props.onCategoryRemove}
            />
            <View style={[styles.itemContainer, {flex: 1}]}>
              <TextInput
                style={styles.categoryInput}
                onChangeText={setCategory}
                value={category}
                placeholder={appLabels.enterCategory}
              />
              <TouchableOpacity
                style={styles.uploadIconContainer}
                onPress={onCamera}>
                <Icon
                  name="camerao"
                  size={moderateScale(70)}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadIconContainer}
                onPress={onUpload}>
                <Icon
                  name="upload"
                  size={moderateScale(70)}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {itemsArray?.map(
            (e: any, i: number) =>
              e.img && (
                <View key={i}>
                  <Badge
                    style={styles.closeIconCont}
                    onPress={() => onItemRemove(i)}
                  />
                  <View style={styles.itemContainer}>
                    <Image style={styles.image} source={{uri: e.img}} />
                    <TextInput
                      style={styles.itemInput}
                      onChangeText={v => onItemTextChange(v, i)}
                      value={e.desc}
                      placeholder={appLabels.enterDescriptionHere}
                    />
                  </View>
                </View>
              ),
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(15),
  },
  itemMainContainer: {
    flexDirection: 'row',
    padding: moderateScale(15),
  },
  itemContainer: {
    marginEnd: moderateScale(15),
    borderRadius: moderateScale(15),
    overflow: 'hidden',
    backgroundColor: colors.white,
    elevation: moderateScale(5),
    alignItems: 'center',
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
  icon: {
    margin: moderateScale(15),
  },
  categoryInput: {
    height: moderateScale(40),
    maxWidth: moderateScale(110),
    margin: moderateScale(15),
    padding: moderateScale(10),
    fontSize: TXT_SIZE,
    textAlign: 'center',
    borderWidth: moderateScale(1),
    borderRadius: 5,
    borderColor: colors.greyMedium,
  },
  itemInput: {
    height: moderateScale(40),
    maxWidth: moderateScale(140),
    margin: moderateScale(15),
    fontSize: TXT_SIZE,
    textAlign: 'center',
  },
  uploadIconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeIconCont: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(10),
    marginBottom: moderateScale(-12),
  },
});
