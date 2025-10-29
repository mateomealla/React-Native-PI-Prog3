import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

export class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  submit(email, password) {

    console.log('Usuario Logeado:', { email, password });
    if(password.length < 6){
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }    
    {
    auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.props.navigation.navigate("Home")
    })
    .catch((error) => console.log("error en el inicio de sesión:", error))
  }
}

  render() {
    return (
      <View>
        <Text>Inicia sesión</Text>
        <View style={styles.container}>
          <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password: text})} value={this.state.password} />
        </View>
        <Pressable style={styles.button} onPress={() => this.submit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Logearse</Text>
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

export default Login