import React from 'react'
import {View, ScrollView, Text,StyleSheet} from 'react-native'
import { Button } from 'react-native-paper'

function Details(props) {
  const articleData = props.route.params.data
  //console.log(articleData)

  const deleteArticle = async()=>{
    console.log(articleData.id)
    await fetch(`http://192.168.0.101:3000/delete/${articleData.id}/`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',  'Accept':'application/json, text/plain, */*'},
      credentials: "same-origin",

  })
  // .then(resp = resp.json())
  .then(data => {
    props.navigation.navigate('HomePage', {data: data})
  })
  .catch(err => console.log('erorr deleting : '+ err))

}
  return (
    <ScrollView>
      <View style={styles.viewStyle}>
        <Text style={{fontSize: 25}}>
{articleData.title}
        </Text>
        <Text style={{fontSize: 20, marginTop: 10}}>
          {articleData.body}
        </Text>
        <Text style={{color: 'green', fontSize: 15, marginTop: 10 }}>{articleData.date}</Text>
      
      <View style={styles.btnStyle}>
        <Button mode="contained" icon="update" style={{margin: 10, backgroundColor: 'grey'}}
        
        onPress={()=> props.navigation.navigate('Edit', {data: articleData})}
        >Edit</Button>
        <Button mode ="contained" icon="delete" style={{margin: 10, backgroundColor: 'red'}}
          onPress={()=>deleteArticle()}
        >Delete</Button>
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 10,
    margin: 10
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
    padding: 10
  }
})

export default Details