import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import React, { Component } from "react";
import { auth } from "../../firebase/config";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error_message: "",
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        this.props.navigation.navigate('TabNavigator');
      }
    });
  }

  submit(email, password) {
    console.log("Usuario Logeado:", { email, password });
  
    {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.props.navigation.navigate('TabNavigator', { screen: 'Home', params: {id:123} });
        })
        .catch((error) => this.setState({ error_message: error.message }));
    }
  }

  render() {
    return (
      <View>
        <Text>Inicia sesión</Text>
        <Text style={styles.error_message}>{this.state.error_message}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => this.submit(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Crear una cuenta</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  error_message: {
    color: "red",
    marginBottom: 12,

  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  button2: {
    backgroundColor: "gray",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
