import { View, Text, Card, Colors, Button } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import CountryFlag from "react-native-country-flag";

import Success from "../components/Success";
import { Constants } from "expo-constants";
import { useLocalSearchParams, useNavigation } from "expo-router";
import send from "./index";
import Wait from "../components/Wait";

import "../helpers";
import { getDeviceUuid, insertToDb } from "../helpers";

const handleUpload = async (data) => {
  return new Promise(async (resolve, reject) => {
    await insertToDb({
      faxNumber: data.faxNumber,
      countryCode: data.countryCode,
      countryName: data.countryName,
      countryDialCode: data.countryDialCode,
      deviceUuid: await getDeviceUuid(),
      documentsUrl: await getDeviceUuid(),
    });
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
};

const pending = () => {
  const nav = useNavigation();
  const [success, setSuccess] = useState(false);
  const params = useLocalSearchParams();
  params.documents = params.documents.split(",");
  useEffect(() => {
    handleUpload(params).then((res) => {
      console.log(res);
      setSuccess(true);
    });
  }, []);
  // getDeviceUuid().then((uuid) => {
  //   console.log(uuid);
  // });

  return (
    <View padding-10 bg-white flex>
      {success ? <Success /> : <Wait />}
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
              {params.countryDialCode}
            </Text>
            <Text popM h4 marginL-20>
              {params.faxNumber}
            </Text>
          </View>
        </View>

        <View marginT-5>
          <Text grey30 popR>
            Country
          </Text>
          <View paddingV-5 row>
            <CountryFlag isoCode={params.countryCode} size={25} />
            <Text marginL-20 popM>
              {params.countryName}
            </Text>
          </View>
        </View>
        <View marginT-5>
          <Text grey30 popR>
            Document
          </Text>
          <Text popM>{params?.documents?.length + " Documents"}</Text>
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
          disabled={!success}
          onPress={() => {
            nav.reset({
              index: 0,
              routes: [{ name: "index" }],
            });
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
