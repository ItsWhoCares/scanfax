import { View, Text, Card, Colors, Button } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { Animated, FlatList, Image } from "react-native";
import { deleteLocally, getLocally } from "../helpers";
import HistoryItem from "./../components/historyItem";

const history = () => {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getLocally();
      setHistoryData(history);
    };
    fetchHistory();
  }, []);
  return (
    <View flex bg-white padding-10 bg-$backgroundNeutral>
      <Text
        onPress={() => {
          setHistoryData([]);
          deleteLocally();
        }}
        h4
        right
        secondaryColor
        popR
        style={{
          textDecorationLine: "underline",
          alignSelf: "flex-end",
          marginRight: 10,
        }}>
        Clear history
      </Text>
      <FlatList
        data={historyData}
        renderItem={({ item, index }) => (
          <HistoryItem item={item} key={item.date} />
        )}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default history;
