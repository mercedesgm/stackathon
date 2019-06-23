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
import { WebView } from 'react-native-webview';
import Post from './Post'

const CustomCallout = (props) => {
    const post = props.post
    return (
      <View>
        <WebView source={{uri: post.dirtyImage}}
        scalesPageToFit={true}
        style={styles.img}/>
        <Text>{post.title}</Text>
      </View>
    )
}
const styles = StyleSheet.create({
  img: {
      width: 200,
      height: 150,
  }
});


export default CustomCallout