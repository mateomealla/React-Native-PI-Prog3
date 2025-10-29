import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'

export class Pantalla3 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Pantalla3</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Pantalla2')}>
          <Text>Ir a Pantalla 2</Text>
        </Pressable>
      </View>
    )
  }
}

export default Pantalla3