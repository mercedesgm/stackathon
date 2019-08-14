import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Post from '../components/Post'


export default function PostScreen(props) {
  const { navigation } = props;
  const id = navigation.getParam('id');
  return (
      <Post id={id} navigation={props.navigation}/>
  );
}

PostScreen.navigationOptions = {
  title: 'Post',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
