import { MonoText } from './StyledText';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

const CustomCallout = (props) => {
    const post = props.post
    return (
      <View>
        <Image source={{uri: post.dirtyImage}}
        style={{width: 100, height: 100}}/>
        <Text>{post.title}</Text>
      </View>
    )
}
const styles = StyleSheet.create({
  img: {
      width: 100,
      height: 100,
  }
});


export default CustomCallout