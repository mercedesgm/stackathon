import { MonoText } from '../components/StyledText';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import CustomCallout from './CustomCallout'
import { withNavigation } from 'react-navigation';

const Map = (props) => {
    const posts = props.posts
    return (
        <MapView
            style={styles.map}
            initialRegion={{
            latitude: 40.7130,
            longitude: -74.0060,
            latitudeDelta: 0.3,
            longitudeDelta: 0.01,
            }}
        >
            {posts.map(post => {
            const latlng = {latitude: Number(post.latitude), longitude: Number(post.longitude)}
            return (
                <Marker key={post.id} coordinate={latlng}>
                  <Callout onPress={() => props.navigation.navigate('Post', {id: post.id})}>
                    <CustomCallout post={post} navigate={props.navigate}/>
                  </Callout>
                 </Marker>
            )
            })}
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    img: {
        width: 100,
        height: 100,
        borderColor: "#F44336",
        borderWidth: 2,
    }
});

export default withNavigation(Map)
