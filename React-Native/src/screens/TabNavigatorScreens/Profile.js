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
              <Text>{item.data.description}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  usernameLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  usernameText: {
    fontWeight: 'normal',
    color: '#000',
  },
  emailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontWeight: 'normal',
    color: '#555',
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
