import { Text, View, Pressable, FlatList, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { db, auth} from "../../firebase/config";

import firebase from "firebase";

class Home extends Component {
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
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.comentarioContainer}>
                <Text style={styles.comentarioText}>
                  {item.data.description}
                </Text>
                <Text style={styles.ownerText}>Gmail: {item.data.owner}</Text>
                <Text style={styles.likesText}>
                  {item.data.likes ? item.data.likes.length : 0} Me gusta
                </Text>

                <View style={styles.actionsRow}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => this.likePost(item.id, item.data.likes)}
                  >
                    <Text style={styles.actionButtonText}>
                      {item.data.likes &&
                      item.data.likes.includes(auth.currentUser.email)
                        ? "Quitar Like"
                        : "Me gusta"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.actionButton, styles.secondaryButton]}
                    onPress={() =>
                      this.props.navigation.navigate("Comentario", {
                        description: item.data.description,
                        owner: item.data.owner,
                        id: item.id,
                      })
                    }
                  >
                    <Text style={styles.actionButtonText}>Comentar</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
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
    paddingHorizontal: 16,
    backgroundColor: COLORS.bg,
  },
  listContent: {
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  comentarioContainer: {
    marginBottom: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  comentarioText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  ownerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  likesText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#6DA8FF",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
  },
});

export default Home;
