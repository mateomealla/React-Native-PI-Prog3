import { Text, View, Pressable, FlatList, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import firebase from "firebase";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsRecuperados: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        const posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ postsRecuperados: posts, loading: false });
      });
  }

  likePost(postId, userLikes) {
    if (userLikes.includes(auth.currentUser.email)) {
      db.collection("posts")
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(
            auth.currentUser.email
          ),
        });
    } else {
      db.collection("posts")
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(
            auth.currentUser.email
          ),
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando...</Text>
            <Image
              style={styles.image}
              source={require("../../../assets/cargando.gif")}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={this.state.postsRecuperados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.comentarioContainer}>
                <Text style={styles.comentarioText}>
                  {item.data.description}
                </Text>
                <Text style={styles.ownerText}>Gmail: {item.data.owner}</Text>
                <Text style={styles.likesText}>
                  {item.data.likes ? item.data.likes.length : 0} Me gusta
                </Text>

                <Pressable
                  onPress={() => this.likePost(item.id, item.data.likes)}
                >
                  <Text style={styles.likeBoton}>
                    {item.data.likes &&
                    item.data.likes.includes(auth.currentUser.email)
                      ? "Quitar Like"
                      : "Me gusta"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("Comentario", {
                      description: item.data.description,
                      owner: item.data.owner,
                      id: item.id,
                    })
                  }
                >
                  <Text style={styles.comentarioBoton}>Comentar</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  comentarioContainer: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  comentarioText: {
    fontSize: 16,
  },
  ownerText: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  likesText: {
    fontSize: 13,
    color: "gray",
  },
  likeBoton: {
    color: "blue",
    marginTop: 6,
  },
  comentarioBoton: {
    color: "green",
    marginTop: 6,
  },
});

export default Feed;
