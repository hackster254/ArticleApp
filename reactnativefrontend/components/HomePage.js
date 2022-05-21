import React, {useState, useEffect}  from 'react'
import { StyleSheet,FlatList, View, Text } from 'react-native'
import {Card, FAB} from 'react-native-paper'

import Constants from 'expo-constants'

const HomePage =  (props) => {

    const [newArticles ,setNewArticles]= useState([])
    
    const [loading, setLoading] = useState(true)

    const loadData = async()=>{
         //await fetch('http://192.168.0.101:3000/get', {method: 'GET', headers:{ 'Content-Type': 'application/json', 'Accept': 'application/json'} })

         await fetch('http://192.168.0.101:3000/get', {method: 'GET' })
         .then(response =>  response.json()
            
         )
         .then(item =>{
            // console.log("hello"+item)
            const arr = item
            arr.sort(function(a,b){
                new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            console.log(JSON.stringify(arr.sort((a,b)=> b.id-a.id)))
             setNewArticles(arr)
             setLoading(false)
             
         }).catch(err =>console.log(err))
    }
    
    

    useEffect(()=> {
        
        loadData()
    },[]) // just fetch it once on page load

    // const articles = [{
    //     id: 1, title: '1st article', body: 'my first article is in the works'
    // },
    //     {id: 2, title: '2nd article', body: 'my second article is in the works'

    //     }] 
        const renderData = (item)=> {
            return(
                <Card style ={styles.cardStyle}>
                    <Text style={{fontSize: 20}} onPress={()=> clickedItem(item)}>
                        {item.title}
                    </Text>
                    {/* <Text>{item.body}</Text> */}
                </Card>
            )
        }

        const clickedItem = (data)=>{
            props.navigation.navigate('Details', {data: data})
        }

    return(
        <View style = {styles.container}>
            <Text>Homepage screen</Text>
            <FlatList data={newArticles} keyExtractor={item => '${item.id}'}
                renderItem={({item})=>{
                    return renderData(item)
                }}

                onRefresh={()=> loadData()}
                refreshing ={loading}
            />
            <FAB style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors: {
                accent: 'green'

            }}}
            onPress = {()=> props.navigation.navigate('Create')}
            />

           
        </View>
    );

    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "fff",
        // alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#eddfdf"
    },
    cardStyle: {
        
        padding: 10,
        margin: 10,
        
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0

    }
})

export default HomePage;

