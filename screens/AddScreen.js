import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AddForm from '../components/AddForm'


export default function LinksScreen(props) {
  return (
    <AddForm navigation={props.navigation}/>
  );
}

LinksScreen.navigationOptions = {
  title: 'Add',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
