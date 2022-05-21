
import React, { Component } from 'react'
import {View,Text, Button }from 'react-native'
class Home extends Component {
    state = {
        firstname: "Charles",
        lastname: "Karira"
    }
    
// states can be changed
// but props cannot be changed
  render() {
    return (
    <View>
<Text>{this.state.firstname} is best {this.state.lastname}
              </Text>
              <Button style={{backgroundColor: 'red', fontSize: 40}}title="Click me"
              onPress= {()=> this.setState({firstname: "Ken",lastname: "Hulk"})  }
              />
    </View>
          
    )
  }
}

export default Home