import { View, Text, Image } from "react-native-ui-lib";
import React, { useEffect } from "react";
import { formatDate } from "./../helpers";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const getThumbnail = async (uri) => {
  //check if file is jpg or png
  if (uri.split(".").pop() === "jpg" || uri.split(".").pop() === "png") {
    return uri;
  }
  return false;
};

const HistoryItem = (props) => {
  const data = props.item;
  const [thumbnail, setThumbnail] = React.useState(false);
  useEffect(() => {
    getThumbnail(data.documents[0]).then((res) => {
      setThumbnail(res);
    });
  }, []);

  return (
    <View
      margin-5
      bg-white
      style={{
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      {thumbnail ? (
        <View
          style={{
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            marginH-15
            source={{
              uri: thumbnail,
            }}
            style={{ width: 60, height: 60, borderRadius: 20 }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.$backgroundNeutral,
          }}>
          <FontAwesome6 name="file-pdf" size={32} color="black" />
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
            successColor
            marginR-15
            style={{
              textAlignVertical: "center",
            }}>
            Success
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
    </View>
  );
};

export default HistoryItem;
