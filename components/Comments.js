import React from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import {connect} from 'react-redux'
import {addComment} from '../store/posts'
import {Input} from 'react-native-elements'

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }

    render () {
        
        return (
            <View style={{display: "flex", height: 322, justifyContent: "space-between"}}>
                <ScrollView 
                    contentContainerStyle={{display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: 3}}
                    keyboardShouldPersistTaps="never"
                    style={{backgroundColor: "#6A6C6E"}}
                    scrollsToTop={false}
                >
                    {this.props.comments.length ?
                        this.props.comments.map(comment => {
                            return <Text key={comment.id} style={[comment.userId === this.props.userId && {alignSelf: "flex-end"}, styles.comment]}>{comment.content}</Text>
                        })
                    : <Text style={{alignSelf: "center"}}>No comments yet...</Text>}
                </ScrollView>
                <Input
                    onChangeText={(comment) => this.setState({comment})}
                    returnKeyType={"done"}
                    value={this.state.comment}
                    onSubmitEditing={() => {
                        if (this.state.comment.length) {
                            this.props.submitComment(this.state.comment, this.props.userId, this.props.id)
                            this.setState({comment: ""})
                        }
                    }}
                    enablesReturnKeyAutomatically={true}
                    leftIcon={{name: "comment"}}
                    placeholder="Submit a comment"
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
    submitComment: (content, userId, postId) => dispatch(addComment(content, userId, postId))
})

const styles = StyleSheet.create({
    commentsWrapper: {
      width: Dimensions.get('window').width,
      height: 600,
      overflow: "scroll",
      display: "flex",
      alignItems: "flex-start"
    },
    img: {
        width: 100,
        height: 100,
        borderColor: "#F44336",
        borderWidth: 2,
    },
    comment: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 2,
        marginBottom: 3,
        marginTop: 3
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments)