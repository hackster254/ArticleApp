import React, {useState} from 'react'

import {View, Text, StyleSheet} from 'react-native'
import {TextInput, Button} from 'react-native-paper'

function Create(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const insertData=async()=> {
        //await fetch('http://192.168.0.101:3000/get', {method: 'GET', headers:{ 'Content-Type': 'application/json', 'Accept': 'application/json'} })

        await fetch('http://192.168.0.101:3000/add', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json',  'Accept':'application/json, text/plain, */*'},
            // mode:"no-cors",
            credentials: 'same-origin',
            body: JSON.stringify({
                                title: title,
                                body: body
                            })
    
    })
       .then(response =>  response.json())
       .then(data =>{
          // console.log("hello"+item)
           props.navigation.navigate('HomePage')
           console.log('data saved'+data)
           
       })
       .catch(error=> console.log('erorr recieved is: '+error))

   } // just fetch it once on page load


  return (
    <View>
        <TextInput placeholder='Title' label= "Title" value={title} mode="outlined"
        onChangeText= {text => setTitle(text)}

        style={styles.inputStyle}
        />
        <TextInput placeholder='Description' label= "Description" value={body} mode="outlined" 
        onChangeText= {text => setBody(text)}
        multiline
        style={{padding: 15}}
        numberOfLines ={10}
        />
        <Button style={{margin:10}} icon="pencil" mode="contained" 
            onPress={()=> {
                if(title.length> 0 && body.length>0){
                    insertData()
                }
                
            }}     
        >Create article
            </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        marginTop: 30
    }
})

export default Create