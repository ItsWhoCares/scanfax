import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Colors,
} from "react-native-ui-lib";
import React, { useEffect } from "react";
import { formatDate } from "./../helpers";
import { FontAwesome6 } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const getThumbnail = async (uri) => {
  //check if file is jpg or png
  if (uri.split(".").pop() === "jpg" || uri.split(".").pop() === "png") {
    return uri;
  }
  return false;
};

const HistoryItem = (props) => {
  const router = useRouter();
  const data = props.item;
  // console.log(Colors);
  const [thumbnail, setThumbnail] = React.useState(false);
  useEffect(() => {
    getThumbnail(data.documents[0]).then((res) => {
      setThumbnail(res);
    });
  }, []);

  return (
    <TouchableOpacity
      margin-5
      bg-white
      style={styles.container}
      onPress={() => {
        // console.log(data);
        router.push({
          pathname: "/pending",
          params: {
            documents: [...data.documents],
            faxNumber: data.faxNumber,
            countryName: data.countryName,
            countryDialCode: data.countryDialCode,
            countryCode: data.countryCode,
            date: data.date,
            toUpload: false,
            state: data.state,
          },
        });
      }}>
      {thumbnail ? (
        <View style={styles.thumbnail}>
          <Image
            marginH-15
            source={{
              uri: thumbnail,
            }}
            style={{ width: 70, height: 70, borderRadius: 20 }}
          />
        </View>
      ) : (
        <View style={styles.pdfIcon}>
          <View
            style={{
              height: 70,
              width: 70,
              backgroundColor: Colors.$backgroundNeutral,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FontAwesome6
              name="file-pdf"
              size={32}
              color="black"
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </View>
      )}

      <View paddingV-20 flex>
        <View
          row
          style={{
            justifyContent: "space-between",
          }}>
          <Text popM h4>
            {data.countryDialCode} {data.faxNumber}
          </Text>
          <Text
            popM
            h5
            marginR-15
            style={{
              textAlignVertical: "center",
              color: data.state ? Colors.successColor : Colors.errorColor,
            }}>
            {data.state ? "Success" : "Failed"}
          </Text>
        </View>
        <View>
          <View
            row
            style={{
              justifyContent: "space-between",
            }}>
            <Text popR h6 grey40>
              {formatDate(data?.date)}
            </Text>
            <Text popR h6 grey40 marginR-15>
              {data?.documents?.length + " Docs"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  pdfIcon: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.$backgroundNeutral,
  },
});

export default HistoryItem;
