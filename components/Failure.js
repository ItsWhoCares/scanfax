import { View, Text, Colors } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const AnimatedIcon = Animated.createAnimatedComponent(Octicons);
const Failure = () => {
  const router = useRouter();
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    let a;
    function rotate() {
      a = Animated.spring(spinAnim, {
        toValue: 1,
        // speed: 0.3,
        // bounciness: 0,
        damping: 12,
        // duration: 1000,
        useNativeDriver: true,
      });
      a.start();
    }
    rotate();
    return () => {
      a.stop();
    };
  }, []);

  return (
    <View center>
      <View style={styles.iconCntr}>
        <View style={styles.clock}>
          <Animated.View
            style={[
              styles.moveHand,
              {
                // move plane from bottom left to middle
                transform: [
                  {
                    translateY: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                  {
                    translateX: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                  { rotate: "135deg" },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.moveHand,
              {
                // move plane from bottom left to middle
                transform: [
                  {
                    translateY: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                  {
                    translateX: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                  { rotate: "45deg" },
                ],
              },
            ]}
          />
        </View>
      </View>
      <Text popB h2>
        Failed
      </Text>
      <Text grey30 h5 popR>
        An error occurred while sending your fax
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconCntr: {
    backgroundColor: Colors.errorColor,
    borderRadius: 10,
    marginBottom: 10,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    position: "absolute",
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  moveHand: {
    position: "absolute",
    height: 18,
    width: 4,
    margin: 5,
    backgroundColor: Colors.errorColor,
    borderRadius: 5,
  },
});

export default Failure;
