import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { theme } from "./color";
import { styles } from "./styles";
import {
  Fontisto,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

function ToDo({ data, dataKey, deleteToDo, completedToDo, editTodo }) {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(data.text);

  const toggleEdit = () => setEdit((prev) => !prev);
  const onChangeTodo = (payload) => setTodo(payload);

  const submitEdit = () => {
    editTodo(todo, dataKey);
    setEdit(false);
  };

  const toDoCompleted = () => completedToDo(dataKey);
  const cancelCompleted = () => completedToDo(dataKey);

  return (
    <View style={styles.toDo} key={dataKey + "work"}>
      {edit ? (
        <View style={styles.editBox}>
          <TextInput
            style={styles.editInput}
            value={todo}
            onChangeText={onChangeTodo}
            onSubmitEditing={submitEdit}
          />
          <TouchableOpacity onPress={submitEdit}>
            <Text style={styles.editBtn}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEdit}>
            <Text style={styles.editBtn}>취소</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.todoLeft}>
            {data.done ? (
              <>
                <TouchableOpacity onPress={cancelCompleted}>
                  <AntDesign
                    name="checksquare"
                    size={24}
                    color={theme.lightGray}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.toDoText,
                    color: theme.lightGray,
                    textDecorationLine: "line-through",
                  }}
                >
                  {data.text}
                </Text>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={toDoCompleted}>
                  <Feather name="square" size={24} color={theme.lightGray} />
                </TouchableOpacity>
                <Text style={styles.toDoText}>{data.text}</Text>
              </>
            )}
          </View>
          <View style={styles.toDoBtns}>
            {data.done ? null : (
              <>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <MaterialIcons
                    name="edit"
                    size={25}
                    color={theme.lightGray}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToDo(dataKey)}>
                  <Fontisto name="trash" size={20} color={theme.lightGray} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}

export default ToDo;
