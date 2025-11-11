import {Text,View,FlatList,TextInput,Pressable,StyleSheet} from "react-native";
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
          contentContainerStyle={styles.listContent}
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

const COLORS = {
  primary: "#1679FF",
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  outline: "#E5ECF6",
  text: "#0F172A",
  textMuted: "#6B7280",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  listContent: {
    paddingBottom: 12,
  },
  commentContainer: {
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  commentOwner: {
    fontWeight: "700",
    color: COLORS.textMuted,
    marginBottom: 6,
    fontSize: 13,
  },
  commentText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 21,
  },
  input: {
    height: 52,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.outline,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginVertical: 12,
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
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
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

export default Comentarios;
