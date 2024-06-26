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
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const bytesToMB = (bytes) => {
  return bytes / 1024 / 1024;
};

const getThumbnail = async (uri) => {
  //check if file is jpg or png
  if (uri.split(".").pop() === "jpg" || uri.split(".").pop() === "png") {
    return uri;
  }
  return false;
};
const DocList = (props) => {
  const doc = props.item;
  // console.log(doc);
  const [thumbnail, setThumbnail] = React.useState(false);
  useEffect(() => {
    getThumbnail(doc.uri).then((res) => {
      setThumbnail(res);
    });
  }, []);

  return (
    <View
      row
      //   br20
      //   padding-10
      style={styles.main}>
      {thumbnail ? (
        <Image
          source={{
            uri: thumbnail,
          }}
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <View style={styles.pdfIcon}>
          <FontAwesome6 name="file-pdf" size={24} color="black" />
        </View>
      )}

      <View col style={styles.docInfo}>
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
        style={styles.delIconCntr}
        onPress={() => props.onDelete()}>
        <MaterialIcons
          name="delete"
          size={28}
          color="white"
          style={styles.delIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    overflow: "hidden",
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  delIconCntr: {
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  delIcon: {
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: Colors.secondaryColor,
    borderRadius: 10,
  },
  pdfIcon: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.$backgroundNeutral,
  },
  docInfo: {
    //   width: 150,
    width: "50%",
    // alignContent: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export default DocList;
