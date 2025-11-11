import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      username: '',
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          this.setState({ username: doc.data().username });
        });
      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posts });
      });
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil del usuario</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.usernameLabel}>
            Nombre de usuario: <Text style={styles.usernameText}>{this.state.username || 'Cargando...'}</Text>
          </Text>

          <Text style={styles.emailLabel}>
            Gmail: <Text style={styles.emailText}>{auth.currentUser.email}</Text>
          </Text>
        </View>

        <Text style={styles.subtitle}>Mis posteos:</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.postText}>{item.data.description}</Text>
            </View>
          )}
        />

        <Pressable style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
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
    padding: 16,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 12,
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  infoContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  usernameLabel: {
    fontWeight: '700',
    marginBottom: 6,
    color: COLORS.textMuted,
    fontSize: 14,
  },
  usernameText: {
    fontWeight: '800',
    color: COLORS.text,
    fontSize: 16,
  },
  emailLabel: {
    fontWeight: '700',
    color: COLORS.textMuted,
    fontSize: 14,
  },
  emailText: {
    fontWeight: '600',
    color: COLORS.text,
    fontSize: 15,
  },
  subtitle: {
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    color: COLORS.text,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.outline,
    marginBottom: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  postText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 21,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.outline,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});

export default Profile;
