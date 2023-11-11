import { StyleSheet } from "react-native";
import { theme } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.text,
    borderRadius: 20,
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoLeft: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    fontSize: 18,
    color: theme.text,
  },
  toDoBtns: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  editBox: {
    backgroundColor: theme.text,
    // flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    padding: 7,
  },
  editInput: {
    fontSize: 20,
    padding: 5,
    flex: 7,
  },
  editBtn: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginHorizontal: 3,
    borderRadius: 7,
    borderColor: "black",
  },
  editBtnText: {
    fontSize: 17,
    color: theme.text,
  },
});
