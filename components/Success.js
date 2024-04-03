import { View, Text, Colors } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const Success = () => {
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
        speed: 0.5,
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
      <View
        style={{
          backgroundColor: Colors.successColor,
          borderRadius: 10,
          marginBottom: 10,
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <AnimatedIcon
          name="paper-plane"
          size={32}
          color={"white"}
          style={{
            // move plane from bottom left to middle
            transform: [
              {
                translateY: spinAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [80, 0],
                }),
              },
              {
                translateX: spinAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-80, 0],
                }),
              },
              //   { rotate: spin },
            ],
          }}
        />
      </View>
      <Text popB h2>
        Successfully Sent
      </Text>
      <Text grey30 h5 popR>
        The fax was successfully sent to the recipient
      </Text>
    </View>
  );
};

export default Success;
