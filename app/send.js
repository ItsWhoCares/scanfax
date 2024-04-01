import { View, Text, Picker } from "react-native-ui-lib";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

const send = () => {
  return (
    <View bg-white flex>
      <Text margin-15 popSB h3>
        Send To
      </Text>
      <View>
        <Text>Country</Text>
      </View>
      <Picker
        value={1}
        placeholder={"Placeholder"}
        onChange={() => console.log("changed")}>
        <Picker.Item label={"Option 1"} value={"1"} />
        <Picker.Item label={"Option 2"} value={"2"} />
        <Picker.Item label={"Option 3"} value={"3"} />
      </Picker>
    </View>
  );
};

export default send;
