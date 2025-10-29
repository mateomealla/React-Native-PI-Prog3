import { Text, View, Pressable } from "react-native";
import React, { Component } from "react";

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Pressable onPress={() => this.props.navigation.navigate("Pantalla3")}>
          <Text>Ir a Pantalla 3</Text>
        </Pressable>
      </View>
    );
  }
}

export default Home;
