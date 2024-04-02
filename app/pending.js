import { View, Text, Card, Colors, Button } from "react-native-ui-lib";
import React, { useEffect, useRef, useState } from "react";
import CountryFlag from "react-native-country-flag";

import Success from "../components/Success";
import { Constants } from "expo-constants";
import { useLocalSearchParams, useNavigation } from "expo-router";
import send from "./index";
import { StatusBar } from "expo-status-bar";
import Wait from "../components/Wait";

import "../helpers";
import {
  formatDate,
  getDeviceUuid,
  getLocally,
  insertToDb,
  storeLocally,
  uploadDocuments,
} from "../helpers";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const handleShare = async (ref) => {
  captureRef(ref, {
    format: "jpg",
    quality: 0.8,
  }).then(
    (uri) => {
      console.log("Image saved to", uri);
      Sharing.shareAsync(uri);
    },
    (error) => console.error("Oops, snapshot failed", error)
  );
};

const handleUpload = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("uploading");
    const res = await insertToDb({
      faxNumber: data.faxNumber,
      countryCode: data.countryCode,
      countryName: data.countryName,
      countryDialCode: data.countryDialCode,
      deviceUuid: await getDeviceUuid(),
      documentsUrl: await getDeviceUuid(),
      numDoc: data.documents.length,
    });
    if (res === false) alert("Error uploading");
    const res1 = await uploadDocuments(
      data.documents,
      res[0].deviceUuid + "/" + res[0].id
    );
    // console.log(res1);
    await storeLocally(data);

    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
};

const pending = () => {
  const viewRef = useRef(null);
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

  return (
    <View padding-10 bg-white flex ref={viewRef}>
       <StatusBar style="dark" />
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
          <Text popM>{formatDate(params.date)}</Text>
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
          disabled={!success}
          style={{
            backgroundColor: "white",
          }}
          onPress={() => handleShare(viewRef)}
        />
      </View>
    </View>
  );
};

export default pending;
