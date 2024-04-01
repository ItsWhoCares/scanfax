import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";

import "../FoundationConfig";
export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    PopM: require("../assets/Fonts/Poppins-Medium.ttf"),
    PopR: require("../assets/Fonts/Poppins-Regular.ttf"),
    PopB: require("../assets/Fonts/Poppins-Bold.ttf"),
    PopSB: require("../assets/Fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "History",
          headerTitleStyle: {
            fontFamily: "PopB",
            fontSize: 24,
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          title: "Send Fax",
          headerTitleStyle: {
            fontFamily: "PopB",
            fontSize: 24,
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
