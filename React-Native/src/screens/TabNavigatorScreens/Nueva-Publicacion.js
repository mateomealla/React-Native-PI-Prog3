import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import FormularioCreaDocs from '../../components/FormularioCreaDocs';

export class Usuario extends Component {
    constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props usuario',this.props);
  }

  render() {
    return (
      <View>
        
        <FormularioCreaDocs navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Usuario
