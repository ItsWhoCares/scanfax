import { View, Text, Colors } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

import { withAnchorPoint } from "react-native-anchor-point";

const Wait = () => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  getTransform = () => {
    let transform = {
      transform: [{ perspective: 100 }, { rotate: spin }],
    };
    return withAnchorPoint(
      transform,
      { x: 0.5, y: 1 },
      { width: 4, height: 12 }
    );
  };

  useEffect(() => {
    let a;
    function rotate() {
      a = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      );
      a.start();

      // spinAnim.setValue(0);
      // Animated.timing(spinAnim, {
      //   toValue: 1,
      //   duration: 1000,
      //   useNativeDriver: true,
      // }).start();
      // Animated.loop(spinAnim, {
      //   iterations: 1,
      // });
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
          backgroundColor: Colors.secondaryColor,
          // padding: 20,
          borderRadius: 10,
          marginBottom: 10,
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
        }}>
        {/* <AnimatedIcon
            // onPress={() => animVal.setValue(1)}
            name="clockcircle"
            size={32}
            color={"white"}
            style={{ transform: [{ rotate: spin }] }}
            onPress={() => {
              setIconPressed(!iconPressed);
              rotate();
            }}
          /> */}

        <View
          style={{
            position: "absolute",
            // top: 25,
            backgroundColor: "white",
            width: 35,
            height: 35,
            borderRadius: 25,
            alignItems: "center",
          }}>
          <Animated.View
            style={[
              {
                position: "absolute",
                // top: 25,
                height: 12,
                width: 4,
                margin: 5,
                backgroundColor: Colors.secondaryColor,
                // aspectRatio: 1,
                borderRadius: 5,
                // transform: [{ rotate: "90deg" }],
              },
              getTransform(),
            ]}
          />
          <View
            style={{
              height: 14,
              width: 4,
              // top: 25,
              margin: 5,
              backgroundColor: Colors.secondaryColor,
              // aspectRatio: 1,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <Text popB h2>
        Fax Queued
      </Text>
      <Text grey30 h5 popR>
        Your fax is in the process of being sent
      </Text>
    </View>
  );
};

export default Wait;
