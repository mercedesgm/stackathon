import React from 'react'
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Button,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'
import {getPost, markClean} from '../store/posts'
import Comments from './Comments'
import { RNS3 } from 'react-native-aws3'
import {REACT_AWS3_ACCESS_KEY, REACT_AWS3_SECRET_ACCESS_KEY} from '../secrets'
import * as ImagePicker from 'expo-image-picker'
import {Header, Image, Icon} from 'react-native-elements'


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.renderPost(this.props.id)
        this.interval = setInterval(() => this.props.renderPost(this.props.id), 2000)
    }

    handleSubmit = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        })
        if (!result.cancelled) {
            const options = {
                bucket: "detrash",
                region: "us-east-1",
                accessKey: REACT_AWS3_ACCESS_KEY,
                secretKey: REACT_AWS3_SECRET_ACCESS_KEY,
                successActionStatus: 201
            }
            const imgName = this.props.post.title.split(" ").join("_") + "_clean"
            const file = {
                uri: result.uri,
                name: imgName,
                type: "image/jpg"
            }
            await RNS3.put(file, options).then(response => {
                if (response.status !== 201) throw new Error("Failed to upload image to S3");
            });
            const cleanImage = `https://detrash.s3.amazonaws.com/${imgName}`
            this.props.submitClean(cleanImage, this.props.post.id)
            this.props.renderPost(this.props.post.id)
        }
    }

    render() {
        const post = this.props.post;
        if (post && post.title) {
            return (
                <View style={styles.postWrapper}>
                    <Header
                        leftComponent={<Icon name="map" onPress={() => {
                            this.props.navigation.navigate('Home')
                            this.props.renderPost()
                            clearInterval(this.interval)
                            
                        }} />}
                        centerComponent={{ text: post.title, style: { color: '#fff' } }}
                    >
                    </Header>
                    <View style={{height: 300, flex: 0}}>
                        <ScrollView horizontal={true} style={styles.imgWrapper}>
                            <Image source={{uri: post.dirtyImage}} style={styles.img}  PlaceholderContent={<ActivityIndicator />} />
                            {post.cleanImage !== null ? <Image source={{uri: post.cleanImage + "?" + new Date().getTime()}} style={styles.img}  PlaceholderContent={<ActivityIndicator />}/> : null}
                        </ScrollView>
                    </View>
                    <Button
                        title="Mark Clean" 
                        onPress={() => {
                            this.handleSubmit()
                            setTimeout(() => this.props.renderPost(this.props.post.id), 200)
                        }}
                        disabled={!!post.cleanImage}
                    />
                    <Comments comments={post.comments} id={post.id} renderPost={this.props.renderPost} />            
                </View>
            )
        } else {
            return <Text>Loading</Text>
        }
    }
}

const mapStateToProps = state => ({
    post: state.posts.currentPost,
    userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
    renderPost: (id) => dispatch(getPost(id)),
    submitClean: (cleanImage, postId, userId) => dispatch(markClean(cleanImage, postId, userId))
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    postWrapper: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    myComment: {
        alignSelf: "flex-end"
    },
    imgWrapper: {
        width: Dimensions.get("window").width,
        margin: 0,
        padding: 0,
    },
    img: {
        height: 300,
        width: 400
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Post)