import { View, Text, Colors, BorderRadiuses } from "react-native-ui-lib";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AddDocButton = ({ handle_doc_pick }) => {
  return (
    <View paddingH-10>
      <TouchableOpacity onPress={() => handle_doc_pick()}>
        <View style={styles.main}>
          <FontAwesome
            name="plus"
            size={24}
            color={Colors.$iconDefault}
            style={styles.icon}
          />

          <View popM style={styles.txtCntr}>
            <Text h4 popM>
              Document
            </Text>
            <Text popR>Add page or file</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  icon: {
    width: 50,
    borderRadius: BorderRadiuses.br20,
    justifyContent: "center",
    alignItems: "center",
  },
  txtCntr: {
    // backgroundColor: Colors.red10,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
export default AddDocButton;
