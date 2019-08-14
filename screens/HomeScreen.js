import * as WebBrowser from 'expo-web-browser';
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
import {connect} from 'react-redux'
import { MonoText } from '../components/StyledText';
import {getAllPosts} from '../store/posts'
import Map from '../components/Map'
import { Icon } from 'react-native-elements'

class HomeScreen extends React.Component {
  componentDidMount() {
    if (!this.props.user.id) {
      return this.props.navigation.navigate('Login')
    } 
    this.props.getPosts()
    this.interval = setInterval(() => this.props.getPosts(), 5000)
  }
  render () {
    const posts = this.props.posts.allPosts
    return (
      <View>
        <Map posts={posts}/>
        <View style={{position: "absolute", top: 30, right: 10}}>
          <Icon name="account-circle" reverse  
            onPress={() => {
              this.props.navigation.navigate('Profile')
              clearInterval(this.interval)
            }}
          />
          <Icon name="add-circle-outline" reverse
            onPress={() => {
              this.props.navigation.navigate('Add')
              clearInterval(this.interval)
            }}
          />
        </View>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  posts: state.posts,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getAllPosts())
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
