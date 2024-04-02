import { View, Text, Colors, BorderRadiuses } from "react-native-ui-lib";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AddDocButton = ({ handle_doc_pick }) => {
  return (
    <View paddingH-10>
      <TouchableOpacity onPress={() => handle_doc_pick()}>
        <View
          style={{
            // padding: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
          }}>
          <FontAwesome
            name="plus"
            size={24}
            color={Colors.$iconDefault}
            style={{
              width: 50,
              borderRadius: BorderRadiuses.br20,
              justifyContent: "center",
              alignItems: "center",
            }}
          />

          <View
            popM
            style={{
              // backgroundColor: Colors.red10,
              borderRadius: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
            <Text
              h4
              popM
              style={{
                fontFamily: "PopM",
                //   textAlign: "center",
              }}>
              Document
            </Text>
            <Text popR>Add page or file</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddDocButton;
