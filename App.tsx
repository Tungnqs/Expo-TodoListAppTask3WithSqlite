import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite'
import { styles } from './style';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const initDatabase = async () => {
      const db = await SQLite.openDatabaseAsync('todos.db');
      await db.execAsync('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed INTEGER);');
      fetchTodos();
    };

    initDatabase();
  }, []);

  const fetchTodos = async () => {
    const db = await SQLite.openDatabaseAsync('todos.db');
    const result = await db.getAllAsync<{id: number, text: string, completed: number}>('SELECT * FROM todos');
    setTodos(result.map(row => ({ 
        id: row.id, 
        text: row.text, 
        completed: Boolean(row.completed) 
    })));
  };

  const addTodo = async () => {
    if (inputText.trim()) {
      const db = await SQLite.openDatabaseAsync('todos.db');
      
      if (editingId !== null) {
        await db.runAsync('UPDATE todos SET text = ? WHERE id = ?', [inputText, editingId]);
        setEditingId(null);
      } else {
        await db.runAsync('INSERT INTO todos (text, completed) VALUES (?, 0)', [inputText]);
      }
      
      setInputText('');
      fetchTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const db = await SQLite.openDatabaseAsync('todos.db');
    await db.runAsync('DELETE FROM todos WHERE id = ?', [id]);
    fetchTodos();
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setInputText(todoToEdit.text);
      setEditingId(id);
    }
  };

  const toggleCompleted = async (id: number, completed: boolean) => {
    const db = await SQLite.openDatabaseAsync('todos.db');
    await db.runAsync('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
    fetchTodos();
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoLeft}>
        <Switch
          value={item.completed}
          onValueChange={(value) => toggleCompleted(item.id, value)}
        />
        <Text style={[styles.todoText, item.completed && styles.completedText]}>{item.text}</Text>
      </View>
      <View style={styles.todoButtons}>
        <TouchableOpacity onPress={() => editTodo(item.id)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter a task"
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.buttonText}>{editingId !== null ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}