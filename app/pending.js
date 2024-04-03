import { View, Text, Colors, Button } from "react-native-ui-lib";
import React, { useEffect, useRef, useState } from "react";
import CountryFlag from "react-native-country-flag";

import Success from "../components/Success";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Wait from "../components/Wait";

import "../helpers";
import { formatDate, handleUpload } from "../helpers";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import Failure from "../components/Failure";

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

const pending = () => {
  const navigation = useNavigation();
  const viewRef = useRef(null);
  const nav = useNavigation();
  const params = useLocalSearchParams();
  const [success, setSuccess] = useState(JSON.parse(params.state || null));
  params.documents = params.documents.split(",");
  useEffect(() => {
    if (params.toUpload === "true") {
      // console.log("uploading...", params);
      handleUpload(params).then((res) => {
        console.log("state", res);
        setSuccess(res);
      });
    } else {
      const state = JSON.parse(params.state);
      setSuccess(state);
    }
  }, []);

  // useEffect(() => {
  //   // prevent tab switching when state is null
  //   const sub = navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //   });
  //   return sub;
  // }, []);

  return (
    <View padding-10 bg-white flex ref={viewRef}>
      <StatusBar style="dark" />
      {success ? <Success /> : success == null ? <Wait /> : <Failure />}
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
          disabled={success == null}
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
          disabled={success == null}
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
