import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
import React, { Component } from "react";
import { auth } from "../../firebase/config";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error_message: null,
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
      <View style={styles.screen}>
        <Text style={styles.title}>Inicia sesión</Text>
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
    placeholderTextColor: COLORS.textMuted,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
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

export default Login;
