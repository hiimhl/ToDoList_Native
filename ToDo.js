import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { theme } from "./color";
import { styles } from "./styles";
import {
  Fontisto,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { completedToDo, editTodo } from "./Storage";

function ToDo({ toDo, toDosData, toDoKey, deleteToDo }) {
  const [edit, setEdit] = useState(false);
  const [completed, setCompleted] = useState(toDo.completed);
  const [inputText, setInputText] = useState(toDo.text);

  const toggleEdit = () => setEdit((prev) => !prev);
  const onChangeTodo = (payload) => setInputText(payload);

  const submitEdit = () => {
    editTodo(toDosData, inputText, toDoKey);
    setEdit(false);
  };

  const toDoCompleted = () => {
    completedToDo(toDosData, toDoKey, true);
    setCompleted(true);
  };
  const cancelCompleted = () => {
    completedToDo(toDosData, toDoKey, false);
    setCompleted(false);
  };

  return (
    <View style={styles.toDo}>
      {/* 수정 input */}
      {edit ? (
        <View style={styles.editBox}>
          <TextInput
            style={styles.editInput}
            value={inputText}
            onChangeText={onChangeTodo}
            onSubmitEditing={submitEdit}
          />
          <TouchableOpacity
            onPress={submitEdit}
            style={{ ...styles.editBtn, backgroundColor: theme.blue }}
          >
            <Text style={styles.editBtnText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleEdit}
            style={{ ...styles.editBtn, backgroundColor: theme.btnGray }}
          >
            <Text style={styles.editBtnText}>취소</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.todoLeft}>
            {/* ToDo 완료 표시 */}
            {completed ? (
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
                  {toDo.text}
                </Text>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={toDoCompleted}>
                  <Feather name="square" size={24} color={theme.lightGray} />
                </TouchableOpacity>
                <Text style={styles.toDoText}>{toDo.text}</Text>
              </>
            )}
          </View>
          <View style={styles.toDoBtns}>
            {!completed && (
              <>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <MaterialIcons
                    name="edit"
                    size={25}
                    color={theme.lightGray}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToDo(toDoKey)}>
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
