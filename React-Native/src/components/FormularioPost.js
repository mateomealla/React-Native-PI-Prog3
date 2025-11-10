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
      db.collection("posts").add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: [],
        comentarios: [],
      })
      .then(() => {
        console.log("Post guardado correctamente");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
