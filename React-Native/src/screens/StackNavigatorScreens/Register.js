import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import React, { Component } from "react";
import { auth, db } from "../../firebase/config";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error_message: "",
    };
  }
  submit(email, password, username) {
    if (username.length < 5) {
      this.setState({
        error_message: "El nombre de usuario debe tener al menos 5 caracteres.",
      });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users")
          .add({
            owner: email,
            createdAt: Date.now(),
            username: username,
          })
          .then(() => {
            console.log("Usuario registrado con éxito");
            this.props.navigation.navigate("Login");
          })
          
          .catch((error) => console.log(error));
      })
      .catch((error) => this.setState({ error_message: error.message }));
  }

  render() {
    return (
      <View>
        <Text>Registra tu usuario</Text>
        <Text style={styles.error_message}>{this.state.error_message}</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Username"
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          />
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
          onPress={() =>
            this.submit(
              this.state.email,
              this.state.password,
              this.state.username
            )
          }
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Ir a Login</Text>
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

export default Register;
