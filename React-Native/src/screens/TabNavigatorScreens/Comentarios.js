import {Text,View,FlatList,TextInput,Pressable,StyleSheet,} from "react-native";
import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      nuevoComentario: "",
      postId: "",
    };
  }

componentDidMount() {
  const postId = this.props.route.params.id;

  db.collection("posts")
    .doc(postId)
    .onSnapshot((doc) => {
      const data = doc.data();
      this.setState({
        comentarios: data.comentarios,
        postId: doc.id,
      });
    });
}




  agregarComentario() {
    let nuevoComentario = {
      owner: auth.currentUser.email,
      texto: this.state.nuevoComentario,
      createdAt: Date.now(),
    };

    db.collection("posts")
      .doc(this.state.postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
      })
      .then(() => this.setState({ nuevoComentario: "" }));
  }

  render() {
    return (
      <View style={styles.container}>
  <Text style={styles.title}>Comentarios</Text>

  <FlatList
    data={this.state.comentarios}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.commentContainer}>
        <Text style={styles.commentOwner}>{item.owner}</Text>
        <Text style={styles.commentText}>{item.texto}</Text>
      </View>
    )}
  />

  <TextInput
    style={styles.input}
    placeholder="Escribí tu comentario..."
    keyboardType="default"
    value={this.state.nuevoComentario}
    onChangeText={(text) => this.setState({ nuevoComentario: text })}
  />

  <Pressable style={styles.button} onPress={() => this.agregarComentario()}>
    <Text style={styles.buttonText}>Comentar</Text>
  </Pressable>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },

  commentContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  commentOwner: {
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },

  commentText: {
    color: "#333",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});


export default Comentarios;
