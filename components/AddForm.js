import { View, Button, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import Form from 'react-native-form'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { RNS3 } from 'react-native-aws3'
import {REACT_AWS3_ACCESS_KEY, REACT_AWS3_SECRET_ACCESS_KEY} from '../secrets'
import {connect} from 'react-redux'
import {addPost} from '../store/posts'
import {Header, Icon, Input, Image} from 'react-native-elements'
import user from '../store/user';


class AddForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            img: null,
            latitude: 0,
            longitude: 0

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getLocationAsync();
    }
    
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        })
        console.log(result)
        if (!result.cancelled) {
            this.setState({ img: result.uri });
        }
    }

    getLocationAsync = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          let result = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
          this.setState({longitude: result.coords.longitude, latitude: result.coords.latitude})
        } else {
          throw new Error('Location permission not granted');
        }
    };

    handleSubmit() {
        const options = {
            bucket: "detrash",
            region: "us-east-1",
            accessKey: REACT_AWS3_ACCESS_KEY,
            secretKey: REACT_AWS3_SECRET_ACCESS_KEY,
            successActionStatus: 201
        }
        const imgName = this.state.title.split(" ").join("_") + "_dirty"
        const file = {
            uri: this.state.img,
            name: imgName,
            type: "image/jpg"
        }
        RNS3.put(file, options).then(response => {
            if (response.status !== 201) throw new Error("Failed to upload image to S3");
        });

        this.props.submitPost({
            title: this.state.title,
            dirtyImage: `https://detrash.s3.amazonaws.com/${imgName}`,
            latitude: String(this.state.latitude),
            longitude: String(this.state.longitude),
            userId: this.props.userId
        })
        this.props.navigation.navigate('Home')
        
        this.setState({            
            title: "",
            img: null,
            latitude: 0,
            longitude: 0,
        })
    }

    render() {
        return (
            <Form>
                <Header
                    leftComponent={
                        <Icon name="map" onPress={() => {
                            this.props.navigation.navigate('Home')
                            this.setState({            
                                title: "",
                                img: null,
                                latitude: 0,
                                longitude: 0
                            })
                        }} />
                    }
                    centerComponent={{ text: "Add a Post", style: { color: '#fff' } }}
                    rightComponent={
                        <Icon name="clear" title="Clear" onPress={() => {
                            this.setState({            
                                title: "",
                                img: null,
                                latitude: 0,
                                longitude: 0
                            })
                        }} />
                    }
                />
                <Input
                    onChangeText={(title) => this.setState({title})}
                    multiline = {false}
                    value = {this.state.title}
                    editable = {true}
                    autoCapitalize = {"words"}
                    leftIcon={
                        <Icon
                            name = 'create'
                            marginRight = {5}
                        />
                    }
                    placeholder = "Add a title"
                />
                {this.state.img !== null ? 
                    <Image
                        source={{ uri: this.state.img}}
                        style={{ width: Dimensions.get('screen').width, height: 300 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    :
                    <Image
                        source={require('./images/placeholder.jpg')}
                        style={{ width: Dimensions.get('screen').width, height: 300 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                }
                <Button title="Choose Photo" onPress={this.pickImage} />
                <View style={{margin: 15}}>
                    <Button title="Submit" onPress={this.handleSubmit} disabled={!(this.state.title.length && this.state.img !== null)}/>
                </View>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.id
})

const mapDistpatchToProps = dispatch => ({
    submitPost: (post) => dispatch(addPost(post))
})

export default connect(mapStateToProps, mapDistpatchToProps)(AddForm)