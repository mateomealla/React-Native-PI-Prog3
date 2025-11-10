import { Text, View, Pressable, FlatList, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db } from "../../firebase/config";
import firebase from "firebase";
import { auth } from "../../firebase/config";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsRecuperados: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        const tweets = [];
        docs.forEach((doc) => {
          tweets.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ tweetsRecuperados: tweets, loading: false });
      });
  }

  likeTweet(tweetId, userLikes) {
    let userEmail = auth.currentUser.email;
    let tweet2 = db.collection("posts").doc(tweetId);

    if (userLikes.includes(userEmail)) {
      tweet2.update({
        likes: firebase.firestore.FieldValue.arrayRemove(userEmail),
      });
    } else {
      tweet2.update({
        likes: firebase.firestore.FieldValue.arrayUnion(userEmail),
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Text>Cargando tweets...</Text>
        ) : (
          <FlatList
            data={this.state.tweetsRecuperados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tweetContainer}>
                <Text style={styles.tweetText}>{item.data.description}</Text>
                <Text style={styles.ownerText}>{item.data.owner}</Text>
                <Text style={styles.likesText}>
                  {item.data.likes ? item.data.likes.length : 0} Me gusta
                </Text>
                <Pressable
                  onPress={() => this.likeTweet(item.id, item.data.likes)}>
                  <Text style={styles.likeBoton}>Me gusta</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate("Comentarios", {
                      id: item.id,
                    })
                  }>
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
  tweetContainer: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  tweetText: {
    fontSize: 16,
  },
  ownerText: {
    fontSize: 12,
    color: "gray",
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
