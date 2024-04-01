import {
  View,
  Text,
  Picker,
  Button,
  Colors,
  Assets,
  Icon,
  TextField,
  Image,
  ListItem,
} from "react-native-ui-lib";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const bytesToMB = (bytes) => {
  return bytes / 1024 / 1024;
};

const DocList = (props) => {
  const doc = props.item;
  return (
    <View
      row
      //   br20
      //   padding-10
      style={{
        overflow: "hidden",
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 5,
        // backgroundColor: Colors.primaryColor,
      }}>
      <Image
        source={{
          uri: doc.uri,
        }}
        style={{ width: 100, height: 100 }}
      />

      <View
        col
        style={{
          //   width: 150,
          width: "50%",
          // alignContent: "center",
          justifyContent: "center",
          padding: 15,
        }}>
        <Text numberOfLines={1} ellipsizeMode={"middle"} h4 popM>
          {doc.name}
        </Text>
        <Text popR h5 grey40>
          {bytesToMB(doc.size).toFixed(2)} MB
          {" - "}
          {doc?.mimeType?.split("/")[1]}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginLeft: "auto",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
        }}
        onPress={() =>
          props.setDocuments((prev) => prev.filter((a, i) => i != props.id))
        }>
        <MaterialIcons
          name="delete"
          size={28}
          color="white"
          style={{
            width: 50,
            height: 50,
            textAlign: "center",
            textAlignVertical: "center",
            backgroundColor: Colors.secondaryColor,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DocList;
