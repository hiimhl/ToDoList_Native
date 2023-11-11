import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "@toDos";
export const WORK_KEY = "@work";

export const saveWork = async (work) => {
  try {
    await AsyncStorage.setItem(WORK_KEY, JSON.stringify(work));
  } catch (e) {
    console.log(e);
  }
};

export const saveToDos = async (toSave) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.log(e);
  }
};

export const editTodo = async (toDos, data, key) => {
  const newToDos = { ...toDos };
  newToDos[key].text = data;

  await saveToDos(newToDos);
};

export const completedToDo = async (toDos, key, type) => {
  const newToDos = { ...toDos };
  if (type) {
    newToDos[key].completed = true;
  } else {
    newToDos[key].completed = false;
  }

  await saveToDos(newToDos);
};
