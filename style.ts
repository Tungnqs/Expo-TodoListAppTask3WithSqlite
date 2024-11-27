import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingHorizontal: 10,
      width: '100%',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      fontSize: 18,
      borderRadius: 6,
    },
    addButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 6,
      marginLeft: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    list: {
      width: '100%',
    },
    todoItem: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      marginHorizontal: 10,
      gap: 5,
    },
    todoLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    todoText: {
      fontSize: 18,
      marginLeft: 10,
      flexShrink: 1
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: '#888',
    },
    todoButtons: {
      flexDirection: 'row',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      padding: 8,
      borderRadius: 4,
      marginRight: 5,
    },
    deleteButton: {
      backgroundColor: '#F44336',
      padding: 8,
      borderRadius: 4,
    },
  });