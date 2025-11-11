import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import React, { Component } from "react";
import { auth, db } from "../firebase/config";

export default class FormularioCreaDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
    };
  }

  crearPost() {
    if (this.state.description !== "") {
      db.collection("posts")
        .add({
          owner: auth.currentUser.email,
          description: this.state.description,
          createdAt: Date.now(),
          likes: [],
          comentarios: [],
        })
        .then(() => {
          this.setState({ description: "" });
          this.props.navigation.navigate("Home");
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo post</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Escribí aquí tu comentario..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />
        <Pressable style={styles.button} onPress={() => this.crearPost()}>
          <Text style={styles.buttonText}>Publicar post</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  input: {
    height: 52,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.outline,
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
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
