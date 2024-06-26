import { View, Text, Colors } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

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
          <Animated.View style={[styles.moveHand, getTransform()]} />
          <View style={styles.fixHand} />
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

const styles = StyleSheet.create({
  iconCntr: {
    backgroundColor: Colors.secondaryColor,
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
  },
  moveHand: {
    position: "absolute",
    height: 12,
    width: 4,
    margin: 5,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 5,
  },
  fixHand: {
    height: 14,
    width: 4,
    margin: 5,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 5,
  },
});

export default Wait;
