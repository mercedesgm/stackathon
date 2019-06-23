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

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }

    render () {
        
        return (
            <KeyboardAvoidingView>
                <View style={{display: "flex", alignItems: "flex-start"}}>
                    {this.props.comments.map(comment => {
                        <Text style={comment.userId === this.props.userId && {alignSelf: "flex-end"}}>comment.content</Text>
                    })}
                </View>
                <TextInput
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
                />
            </KeyboardAvoidingView>
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    commentsWrapper: {
      width: Dimensions.get('window').width,
      height: 600,
      overflow: "scroll",
      display: "flex",
      alignItems: "flex-start"
    },
    myComment: {
        alignSelf: "flex-end"
    },
    img: {
        width: 100,
        height: 100,
        borderColor: "#F44336",
        borderWidth: 2,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments)