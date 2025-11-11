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
      error_message: null,
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
            this.props.navigation.navigate("Login");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => this.setState({ error_message: error.message }));
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Registra tu usuario</Text>
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

const COLORS = {
  primary: "#1679FF",
  primaryDark: "#0E63D6",
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  outline: "#E5ECF6",
  text: "#0F172A",
  textMuted: "#6B7280",
  error: "#EF4444",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  container: {
    justifyContent: "center",
    padding: 24,
  },
  error_message: {
    color: COLORS.error,
    marginHorizontal: 24,
    marginBottom: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
    alignSelf: "stretch",
  },
  input: {
    height: 52,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.outline,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    placeholderTextColor: COLORS.textMuted,
    color: COLORS.text,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  button2: {
    backgroundColor: "#6DA8FF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 10,
    shadowColor: "#4F7DF7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.2,
  },
});

export default Register;
