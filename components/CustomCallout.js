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
import {Card} from 'react-native-elements'

const CustomCallout = (props) => {
    const post = props.post
    return (
      <Card title={post.title} containerStyle={{margin: 0, borderWidth: 0}}>
        <WebView source={{uri: post.dirtyImage}} contentInset={{top: 0, left: 0}}
        scalesPageToFit={true}
        style={styles.img}/>
      </Card>
    )
}
const styles = StyleSheet.create({
  img: {
      width: 200,
      height: 150,
  }
});


export default CustomCallout