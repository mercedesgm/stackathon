import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AddForm from '../components/AddForm'


export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <AddForm />
    </ScrollView>
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
