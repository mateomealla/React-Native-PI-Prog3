import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormularioPosts from '../../components/FormularioPost';

class Usuario extends Component {
    constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props usuario',this.props);
  }

  render() {
    return (
      <View>
        
        <FormularioPosts navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Usuario
