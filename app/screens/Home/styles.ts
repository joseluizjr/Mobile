import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    color: "#333",
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#66CDAA",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
});
