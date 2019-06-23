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
  Button
} from 'react-native';
import {connect} from 'react-redux'
import {getMyPosts, deletePost} from '../store/posts'
import {logout} from '../store/user'

 
class ProfileScreen extends React.Component {
  componentDidMount() {
    this.props.getPosts(this.props.user.id)
  }

  render() {
    return (
      <View>
        <Text>Welcome, {this.props.user.email}</Text>
        {this.props.posts.map(post => {
          return (
            <View key={post.id} style={styles.postWrapper}>
              <Text
                onPress={() => {
                  console.log('hey')
                  this.props.navigation.navigate('Post', {id: post.id})}
                }
              >
                {post.title}
              </Text>
              <Image style={{width: 40, height: 30}} source={{uri: post.dirtyImage}} />
              <Button title="Delete" onPress={() => this.props.delete(post.id, this.props.user.id)} />
            </View>
          )
        })}
        <Button title="Logout" onPress={() => this.props.removeUser()} />
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
