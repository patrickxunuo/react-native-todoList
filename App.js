import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import Task from './components/Task'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    TouchableOpacity,
    Keyboard
} from 'react-native';

export default function App() {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([])

    const changeTask = (newTask) => {
        setTask(newTask)
    }

    const handleAddTask = () => {
        if (task !== "") {
            Keyboard.dismiss()
            setTaskItems([...taskItems, task])
            setTask("")
        }
    }

    // const deleteTask = (thisTask) => {
    //     let index = taskItems.indexOf(thisTask)
    //     setTaskItems(taskItems.splice(index))
    // }
    const completeTask = (index) => {
        console.log(index)
        let itemsCopy = [...taskItems]
        itemsCopy.splice(index, 1)
        setTaskItems(itemsCopy)
    }

    return (
        <View style={styles.container}>
            {/*Today's Tasks*/}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's task</Text>
                <View style={styles.items}>
                    {/*    This is where the tasks will go*/}
                    {taskItems.map((taskItem,index) => {
                            return (
                                <TouchableOpacity onPress={() => completeTask(index)} key={index}>
                                    <Task text={taskItem}/>
                                </TouchableOpacity>
                            )
                        }
                    )}
                </View>
                {taskItems.length===0 &&
                <View style={styles.noTask}>
                    <Text>You have no task today!</Text>
                </View>
                }
            </View>

            {/*write a task*/}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                  style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Write a task'} value={task}
                           onChangeText={text => changeTask(text)}/>
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        height: '80%',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,

    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addText: {},
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    noTask:{
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        fontSize: 30,
    }
});
