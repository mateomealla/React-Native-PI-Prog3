import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import React, { Component } from "react";
import { auth, db } from "../firebase/config";

export default class FormularioCreaDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
    };
  }

  componentDidMount() {
    console.log('props forms',this.props);
  }

  crearTweet(tweet) {
    if (tweet !== "") {
      db.collection("tweets").add({
        owner: auth.currentUser.email,
        tweet: this.state.tweet,
        createdAt: Date.now(),
      })
      .then((resp) => this.props.navigation.navigate("Feed"))
      .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crea tu tweet con lo que estes pensando</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Escribe tu tweet"
          onChangeText={(text) => this.setState({ tweet: text })}
          value={this.state.tweet}
        />
        
        <Pressable
          style={styles.button}
          onPress={() => this.crearTweet(this.state.tweet)}
        >
          <Text style={styles.buttonText}>Crear Tweet</Text>
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
