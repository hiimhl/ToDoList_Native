import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { theme } from "./color";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToDo from "./ToDo";
import { styles } from "./styles";
import { STORAGE_KEY, WORK_KEY, saveToDos, saveWork } from "./Storage";

export default function App() {
  const [working, setWorking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const toggleWork = (type) => {
    type === "work" ? setWorking(true) : setWorking(false);
    saveWork(type);
  };

  const onChangeText = (payload) => setText(payload);

  const loadData = async () => {
    try {
      //todo
      const todo = await AsyncStorage.getItem(STORAGE_KEY);
      const work = await AsyncStorage.getItem(WORK_KEY);

      if (JSON.parse(work) === "work") {
        setWorking(true);
      } else if (work === null) {
        setWorking(true);
      } else {
        setWorking(false);
      }

      setToDos(JSON.parse(todo));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //save to do
  const addToDo = async () => {
    if (text === "") return;

    const newToDos = {
      //
      ...toDos,
      [Date.now()]: { text, working, completed: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (id) => {
    Alert.alert(
      //
      "삭제하시겠습니까?",
      "삭제 시 복원할 수 없습니다",
      [
        { text: "취소" },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            const newToDos = { ...toDos };
            delete newToDos[id];
            setToDos(newToDos);
            await saveToDos(newToDos);
          },
        },
      ] // buttons array
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => toggleWork("work")}
          activeOpacity={0.5}
        >
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleWork("travel")}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.gray : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder={
          working ? "할 일을 추가해 주세요." : "여행지를 추가해 주세요."
        }
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            // Toggle Work or Travel
            toDos[key].working === working ? (
              <ToDo
                toDo={toDos[key]}
                toDosData={toDos}
                key={key + working}
                toDoKey={key}
                deleteToDo={deleteToDo}
              />
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
}
