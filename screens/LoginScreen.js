import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import {Button, Input, Icon, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {auth} from '../store/user'

class LoginScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate() {
        if (this.props.user.id) {
            return this.props.navigation.navigate('Home')
        }
    }

    handleSubmit(method) {
        this.props.submit(this.state.email, this.state.password, method)
    }

    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('./images/squirrel.jpg')}>
                <View style={styles.container}>
                    <Text h2 h2Style={{color: 'white'}}>♻️DeTrash NYC</Text>
                    <View style={styles.form}>
                        <Input
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            placeholder="Email"
                            inputStyle={{color: "white"}}
                            leftIcon={<Icon name='email' marginRight={5} color='white'/>}
                        />
                        <Input
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            enablesReturnKeyAutomatically={true}
                            secureTextEntry={true}
                            placeholder="Password"
                            inputStyle={{color: "white"}}
                            leftIcon={<Icon
                                name='lock'
                                color='black'
                                marginRight={5}
                                color='white'
                                />
                            }
                        />
                        <TouchableOpacity style={styles.buttonWrapper}>
                            <Button
                                title="Login" 
                                disabled={!(this.state.email.length && this.state.password.length)}
                                onPress={() => this.handleSubmit("login")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrapper}>
                            <Button 
                                title="Sign Up"
                                disabled={!(this.state.email.length && this.state.password.length)}
                                onPress={() => this.handleSubmit("signup")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    submit: (email, password, method) => dispatch(auth(email, password, method))
})

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10
  },
  buttonWrapper: {
      marginTop: 10
  },
  input: {
    backgroundColor: "#d3d3d3",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
