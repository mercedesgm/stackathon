import { View, Switch, TextInput, Button, Text, Image } from 'react-native'
import Slider from '@react-native-community/slider'
import React from 'react'
import Form from 'react-native-form'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { RNS3 } from 'react-native-aws3'
import {REACT_AWS3_ACCESS_KEY, REACT_AWS3_SECRET_ACCESS_KEY} from '../secrets'
import {connect} from 'react-redux'
import {addPost} from '../store/posts'


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
        })
        this.props.navigation.navigate('Home')
        
        this.setState({            
            title: "",
            img: null,
            latitude: 0,
            longitude: 0
        })
    }

    render() {
        return (
            <Form>
                <Text>Title</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(title) => this.setState({title})}
                    multiline = {false}
                    value = {this.state.title}
                    editable = {true}
                    autoCapitalize = {"words"}
                />
                <Text>Dirty image</Text>
                {this.state.img && (
                <Image
                    source={{ uri: this.state.img}}
                    style={{ width: 300, height: 300 }}
                />
                )}
                <Button title="Choose Photo" onPress={this.pickImage} />
                <Button title="Submit" onPress={this.handleSubmit} disabled={!(this.state.title.length && this.state.img !== null)}/>

            </Form>
        )
    }
}

const mapDistpatchToProps = dispatch => ({
    submitPost: (post) => dispatch(addPost(post))
})

export default connect(null, mapDistpatchToProps)(AddForm)