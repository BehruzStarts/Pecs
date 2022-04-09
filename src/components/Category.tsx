import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import colors from '../config/colors';
import {SUBTITLE_SIZE, TITLE_SIZE} from '../config/constants';

interface Props {
  categoryTitle: string;
  items: {
    img: string;
    desc: string;
  }[];
  onImagePress?: any;
}

export default function Category({categoryTitle, items, onImagePress}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTxt}>{categoryTitle}</Text>
      <ScrollView horizontal={true}>
        <View style={styles.itemMainContainer}>
          {items?.map((e, i) => (
            <View key={i} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => onImagePress(e.img)}>
                <Image style={styles.image} source={{uri: e.img}} />
              </TouchableOpacity>
              <Text style={styles.descTxt}>{e.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: moderateScale(15),
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
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
  sectionTxt: {
    fontSize: TITLE_SIZE,
    fontWeight: '700',
    marginStart: moderateScale(15),
  },
  descTxt: {
    marginVertical: moderateScale(15),
    fontSize: SUBTITLE_SIZE,
    fontWeight: '600',
    textAlign: 'center',
  },
});
