import { StatusBar } from 'expo-status-bar';
import { constants } from 'expo-constants';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos'

export default function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(
    [{key:'foo',description: 'Testing'}]
  )

  const storeData = async(value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async() => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
      .then(req => JSON.parse(req))
      .then(json => {
        if (json === null) {
          json = []
        }
        setTodos
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  

  const addTodo = () => {
    const newKey = String(todos.length)
    const object = {key: newKey,description: newTodo}
    const newTodos = [...todos, object]
    setTodos(newTodos)
    setNewTodo('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todos</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter new todo'
        value={newTodo}
        onChangeText={text => setNewTodo(text)}
        returnKeyType='done'
        onSubmitEditing={() => addTodo()}
        />
      <FlatList
        style={styles.list}
        data={todos}
        extraData={todos}
        renderItem={({item}) =>
          <Text>{item.description}</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: constants.StatusBarHeight,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderColor: '#FAFAFA',
    height: 40,
    margin: 8
  },
  list: {
    margin: 8
  },
  row: {
    height: 30
  }
});
