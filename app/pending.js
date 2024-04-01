import { View, Text, Card, Colors, Button } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import CountryFlag from "react-native-country-flag";

import Success from "../components/Success";

const pending = () => {
  return (
    <View padding-10 bg-white flex>
      <Success />
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
