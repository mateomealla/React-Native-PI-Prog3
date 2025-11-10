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
    };
  }

  componentDidMount() {
    let postId = this.props.navigation.getParam("id");

    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data();
        this.setState({ comentarios: data.comentarios });
      });
  }

  agregarComentario() {
    let postId = this.props.navigation.getParam("id");

    let nuevoComentario = {
      owner: auth.currentUser.email,
      texto: this.state.nuevoComentario,
      createdAt: Date.now(),
    };

    db.collection("posts")
      .doc(postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
      })
      .then(() => this.setState({ nuevoComentario: "" }));
  }

  render() {
    return (
      <View>
        <Text>Comentarios</Text>

        <FlatList
          data={this.state.comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.owner}</Text>
              <Text>{item.texto}</Text>
            </View>
          )}
        />

        <TextInput
          placeholder="Escribí tu comentario..."
          keyboardType="default"
          value={this.state.nuevoComentario}
          onChangeText={(text) => this.setState({ nuevoComentario: text })}
        />

        <Pressable onPress={() => this.agregarComentario()}>
          <Text>Comentar</Text>
        </Pressable>
      </View>
    );
  }
}

export default Comentarios;
