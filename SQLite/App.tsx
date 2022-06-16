import React, {useCallback, useEffect, useState} from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { ToDoItemComponent } from './src/component/ToDoItem';
import { TodoItem  } from "./src/models";
import { getDBconnection, getTodoItems, saveTodoItems, createTable, deletTodoItem } from "./src/services/db-service";

const App = () => {
  const isDarMode = useColorScheme() === 'dark';

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [netTodo, setNewTodo] = useState("");

  return (
    <View>
      <Text>Mantap</Text>
    </View>
  )
}

export default App;