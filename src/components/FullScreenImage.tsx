import {
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
  View,
  Text,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../config/colors';
import Modal from './Modal';
import appLabels from '../config/appLabels';

interface Props {
  isShown: boolean;
  image: string;
  onClose: any;
}

export default function FullScreenImage({isShown, image, onClose}: Props) {
  const window = useWindowDimensions();
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const handlePinch = Animated.event([{nativeEvent: {scale: scale}}], {
    useNativeDriver: true,
  });
  const handlePan = Animated.event(
    [{nativeEvent: {translationX: translateX, translationY: translateY}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    if (!isShown) {
      translateX.setValue(0);
      translateY.setValue(0);
      scale.setValue(1);
    }
  }, [isShown]);

  return (
    <Modal modalVisible={isShown}>
      <View
        style={{
          height: window.height,
          width: window.width,
          backgroundColor: colors.white,
        }}>
        {image != null ? (
          <PanGestureHandler
            minPointers={1}
            maxPointers={1}
            onGestureEvent={handlePan}>
            <View style={styles.imageContainer}>
              <PinchGestureHandler onGestureEvent={handlePinch}>
                <Animated.Image
                  style={[
                    styles.image,
                    {
                      height: window.height,
                      width: window.width,
                      transform: [
                        {scale: scale},
                        {translateX: translateX},
                        {translateY: translateY},
                      ],
                    },
                  ]}
                  source={{
                    uri: image,
                  }}
                />
              </PinchGestureHandler>
            </View>
          </PanGestureHandler>
        ) : (
          <Text>{appLabels.noImagePreviewAvailable}</Text>
        )}
        <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
          <Icon
            name="closecircle"
            size={moderateScale(25)}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeIconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: moderateScale(5),
    right: moderateScale(5),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
