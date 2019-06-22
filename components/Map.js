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

export const Map = (props) => {
    const posts = props.posts
    console.log('postssss', posts)
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
            const latlng = {latitude: post.latitude / 10000000, longitude: post.longitude / 10000000}
            return (
                <Marker coordinate={latlng} key={post.id}>
                    <CustomCallout post={post} />
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
  