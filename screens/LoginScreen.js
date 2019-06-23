import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
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

    handleSubmit(method) {
        this.props.submit(this.state.email, this.state.password, method)
    }

    render() {
        if (this.props.user.id) {
            return this.props.navigation.navigate('Home')
        } else {
            return (
                <View>
                    <Text>Email:</Text>
                    <TextInput value={this.state.email} onChangeText={(email) => this.setState({email})} autoFocus={true} />
                    <Text>Password:</Text>
                    <TextInput value={this.state.password} onChangeText={(password) => this.setState({password})} enablesReturnKeyAutomatically={true} secureTextEntry={true} />
                    <Button
                        title="Login" 
                        disabled={!(this.state.email.length && this.state.password.length)}
                        onPress={() => this.handleSubmit("login")}
                    />
                    <Button 
                        title="Sign Up"
                        disabled={!(this.state.email.length && this.state.password.length)}
                        onPress={() => this.handleSubmit("signup")}
                    />
                </View>
            )
        }
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
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
