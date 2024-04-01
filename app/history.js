import { View, Text, Card, Colors, Button } from "react-native-ui-lib";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { Animated } from "react-native";
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

import { withAnchorPoint } from "react-native-anchor-point";

const pending = () => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const [iconPressed, setIconPressed] = useState(false);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  function rotate() {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,

        useNativeDriver: true,
      })
    ).start();

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
  return (
    <View padding-10 bg-white flex>
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
      <View paddingH-50 marginT-10>
        <Text popSB h3>
          Fax Details
        </Text>
        <View marginT-5>
          <Text grey30 popR>
            Recipient Fax Number
          </Text>
          <View row>
            <Text popM h4>
              +91
            </Text>
            <Text popM h4 marginL-20>
              123 456 7890
            </Text>
          </View>
        </View>

        <View marginT-5>
          <Text grey30 popR>
            Country
          </Text>
          <View paddingV-5 row>
            <CountryFlag isoCode={"in"} size={25} />
            <Text marginL-20 popM>
              India
            </Text>
          </View>
        </View>
        <View marginT-5>
          <Text grey30 popR>
            Document
          </Text>
          <Text popM>{"05" + " Documents"}</Text>
        </View>
        <View marginT-5>
          <Text grey30 popR>
            Date
          </Text>
          <Text popM>{"25/12/2024 - 12:00 PM"}</Text>
        </View>
      </View>
      <View
        row
        marginV-20
        style={{
          flexDirection: "row-reverse",
        }}>
        <Button
          label="Done"
          margin-10
          br30
          popSB
          style={{
            backgroundColor: Colors.secondaryColor,
          }}
          onPress={() => {
            setIconPressed(!iconPressed);
            rotate();
          }}
        />
        <Button
          label="Share"
          margin-10
          br30
          popSB
          black
          style={{
            backgroundColor: "white",
          }}
        />
      </View>
    </View>
  );
};

export default pending;
