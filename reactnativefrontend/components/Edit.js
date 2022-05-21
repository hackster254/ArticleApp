import React, {useState} from 'react'
import { View, StyleSheet} from 'react-native'
import { TextInput, Button } from 'react-native-paper'

function Edit(props) {
    const editData = props.route.params.data
    const [editTitle, setEditTitle]= useState(editData.title)
    const [editBody, setEditBody] = useState(editData.body)
    
    console.log(editData.id)

    const updateData = async()=> {
         await fetch(`http://192.168.0.101:3000/update/${editData.id}/`, {
            method: 'PUT', 
            headers: {'Content-Type': 'application/json',  'Accept':'application/json, text/plain, */*'},
            credentials: "same-origin",
            // mode: 'cors',
            
            body: JSON.stringify({
                                title: editTitle,
                                body: editBody
                            })
    
    })
       .then(response =>  response.json())
       .then(data =>{
          // console.log("hello"+item)
           props.navigation.navigate('HomePage', {data: editData})
           console.log(' new data saved'+ data)
           
       })
       .catch(error=> console.log('Edit erorr recieved is: '+error))

    }
  return (
    <View style={{margin: 15}}>
        <TextInput style ={styles.inputStyle} label="Title" value={editTitle} mode="outlined" 
        onChangeText={text => setEditTitle(text)}
        />
        <TextInput style ={styles.inputStyle} label="Description" 
        multiline
        numberOfLines={10}
        value={editBody} mode="outlined" 
        onChangeText={text =>setEditBody(text)}
        />
    

    
        <Button  icon="update" mode="contained" style={{backgroundColor: 'green', 
    
    margin: 15,
    padding: 10}} onPress={()=> updateData()}>
            Edit
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
export default Edit
