import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs, useRouter, useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import "../FoundationConfig";
import { Colors } from "react-native-ui-lib";
export default function AppLayout() {
  const router = useRouter();
  const nav = useNavigation();
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Send Fax",
          headerTitleStyle: {
            fontFamily: "PopB",
            fontSize: 24,
          },
          tabBarLabelStyle: {
            fontFamily: "PopM",
          },
          tabBarActiveTintColor: Colors.secondaryColor,
          tabBarIcon: ({ color }) => (
            <Ionicons name="paper-plane" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitleStyle: {
            fontFamily: "PopB",
            fontSize: 24,
          },
          tabBarActiveTintColor: Colors.secondaryColor,
          tabBarLabelStyle: {
            fontFamily: "PopM",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="pending"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
          title: "",
          // backbutton on header left
          headerLeft: () => (
            <FontAwesome6
              name="arrow-left-long"
              size={24}
              color="black"
              style={{ marginLeft: 20 }}
              onPress={() => {
                nav.reset({
                  index: 0,
                  routes: [{ name: "index" }],
                });
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
