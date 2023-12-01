import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

function EncyclopediaCircle({positionX, positionY, color, onPress}) {
  const originalSize = 96;
  const sizeRatio = Math.min(width / 375, height / 812);
  const circleSize = originalSize * sizeRatio;
  const sizeDiff = originalSize - circleSize;
  const leftOffset = sizeDiff * (positionX / 375);
  const topOffset = sizeDiff * (positionY / 812);
  return (
  <View style={[styles.circleContainer, { left: (width * positionX) / 375 - leftOffset, top: (height * positionY) / 812 - topOffset }]}>
      <Pressable
        style={({ pressed }) => [
          styles.circle,
          {width: circleSize}, 
          {height: circleSize},
          { borderColor: color, opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={onPress}
      />
  </View>
  );

}

export default EncyclopediaCircle;

const styles = StyleSheet.create({
  circleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 50,
    borderWidth: 4,
    backgroundColor: 'black',
  },
});