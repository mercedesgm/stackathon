import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';
import {connect} from 'react-redux'
import {getMyPosts, deletePost} from '../store/posts'
import {logout} from '../store/user'
import { Header, Icon, Card, Text } from 'react-native-elements';

 
class ProfileScreen extends React.Component {
  componentDidMount() {
    this.props.getPosts(this.props.user.id)
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
              <Icon name="map" onPress={() => {
                  this.props.navigation.navigate('Home')
              }} />
          }
          centerComponent={{ text: `Welcome, ${this.props.user.email}`, style: { color: '#fff' } }}
          rightComponent={
              <Text onPress={() => {
                this.props.navigation.navigate('Login')
                this.props.removeUser()
              }}>Logout</Text>
          }
        />
        <Text h3>My posts:</Text>
        {this.props.posts.length ?
          this.props.posts.map(post => {
            return (
              <Card
                key={post.id}
                image={{uri: post.dirtyImage}}
                title={post.title}
              >
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
                  <Icon name="open-in-new" onPress={() => this.props.navigation.navigate('Post', {id: post.id})} />
                  <Icon name="delete" onPress={() => this.props.delete(post.id, this.props.user.id)} />
                </View>
              </Card>
            )
          })
          : <Text h2>No posts yet!</Text>
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts.myPosts
})

const mapDispatchToProps = dispatch => ({
  getPosts: (userId) => dispatch(getMyPosts(userId)),
  delete: (id, userId) => dispatch(deletePost(id, userId)),
  removeUser: () => dispatch(logout())
})

ProfileScreen.navigationOptions = {
  title: 'Profile'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  postWrapper: {
    borderColor: "#000000",
    borderWidth: 2
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
