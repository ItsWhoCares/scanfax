import { View, Text } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";

import { FlatList, StyleSheet } from "react-native";
import { deleteLocally, getLocally } from "../helpers";
import HistoryItem from "./../components/historyItem";
import { StatusBar } from "expo-status-bar";

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
      <StatusBar style="dark" />
      <Text
        onPress={() => {
          setHistoryData([]);
          deleteLocally();
        }}
        h4
        right
        secondaryColor
        popR
        style={styles.clearHistory}>
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
const styles = StyleSheet.create({
  clearHistory: {
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: 10,
  },
});

export default history;
