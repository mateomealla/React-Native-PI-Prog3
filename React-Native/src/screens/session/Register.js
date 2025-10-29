import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

export class Register extends Component {
    constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }
  submit(email, password, username) {

    console.log('Usuario registrado:', { email, password, username });
    if(password.length < 6){
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }{
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.props.navigation.navigate("Login")
    })
    .catch((error) => console.log("error en la creación de usuario:", error))
  }
}

  render() {
    return (
      <View>
        <Text>Registra tu usuario</Text>
        <View style={styles.container}>
          <TextInput style={styles.input} keyboardType="default" placeholder="Username" onChangeText={(text) => this.setState({username: text})} value={this.state.username} />
          <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password: text})} value={this.state.password} />
        </View>
        <Pressable style={styles.button} onPress={() => this.submit(this.state.email, this.state.password, this.state.username)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: 'blue',
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
   
})

export default Register