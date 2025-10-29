import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'

export class Pantalla2 extends Component {
  constructor(props) { 
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Pantalla2</Text>
        <Pressable onPress={() => this.props.navigation.navigate('TabNavigator', { screen: 'Feed', params: {id:123} })}>
          <Text>Ir a Feed</Text>
        </Pressable>
      </View>
    )
  }
}

export default Pantalla2