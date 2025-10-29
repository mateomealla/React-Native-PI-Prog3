import { Text, View, Pressable, FlatList, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db } from "../../firebase/config";

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsRecuperados: [],
    };
  }

  componentDidMount() {
    db.collection("tweets").onSnapshot((docs) => {
      const tweets = [];
      docs.forEach((doc) => {
        tweets.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({ tweetsRecuperados: tweets });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
        <FlatList
          data={this.state.tweetsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tweetContainer}>
              <Text style={styles.tweetText}>{item.data.tweet}</Text>
              <Text style={styles.ownerText}>{item.data.owner}</Text>
            </View>
          )}
        />
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
});

export default Feed;
