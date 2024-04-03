import { View, Text, Button, Colors, TextField } from "react-native-ui-lib";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DocList from "../components/DocList";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CountrySelector from "../components/CountrySelector";
import AddDocButton from "../components/AddDocButton";

const send = () => {
  const router = useRouter();
  const [country, setCountry] = useState({
    name: "India",
    dial_code: "+91",
    code: "IN",
  });

  const [faxNumber, setFaxNumber] = useState("44444444");
  const [documents, setDocuments] = useState();

  const onDelete = (item) => {
    const i = documents.indexOf(item);
    if (i > -1) {
      const newDocs = documents.filter((a, index) => index !== i);
      setDocuments(newDocs);
    }
  };
  const handle_doc_pick = async () => {
    // only allow at max 5 files
    if (documents && documents.length >= 5) {
      alert("You can only send 5 files at a time");
      return;
    }
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png"],
      copyToCacheDirectory: true,
      multiple: true,
    });
    console.log(result);
    if (!result.canceled) {
      if (!documents) setDocuments(result.assets);
      else {
        setDocuments([...documents, ...result.assets]);
      }
    }
  };
  const handle_send_checks = () => {
    if (!country || !faxNumber || !documents || documents.length === 0) {
      alert("Please fill all the fields");
      return;
    }
    if (faxNumber.length < 6) {
      alert("Please enter a valid fax number (minimum 6 digits)");
      return;
    }
    if (documents.length > 5) {
      alert("You can only send 5 files at a time");
      return;
    }
    const totalSize =
      documents.reduce((acc, curr) => acc + curr.size, 0) / 1000 / 1000;
    if (totalSize > 25) {
      alert("Total size of documents should not exceed 25MB");
      return;
    }
    router.push({
      pathname: "/pending",
      params: {
        documents: [documents.map((a) => a.uri)],
        faxNumber: faxNumber,
        countryName: country.name,
        countryDialCode: country.dial_code,
        countryCode: country.code,
        date: new Date().toISOString(),
        toUpload: true,
      },
    });
  };
  return (
    <View bg-white flex>
      <StatusBar style="dark" />
      <Text marginH-15 marginT-10 popSB h3>
        Send To
      </Text>
      {/* {Country} */}
      <View marginH-15 marginV-5>
        <Text grey30 h4 popR>
          Country
        </Text>
        <CountrySelector setCountry={setCountry} country={country} />
      </View>
      {/* {Fax Number} */}
      <View marginH-15 marginV-5>
        <Text grey30 h4 popR>
          Recipient Fax Number
        </Text>
        <View style={styles.numInpContainer}>
          <TextField
            value={country.dial_code}
            height={40}
            popM
            h4
            width={50}
            maxLength={6}
            centered
          />
          <TextField
            value={faxNumber}
            maxLength={12}
            onChangeText={(text) => setFaxNumber(text)}
            marginL-20
            height={40}
            popM
            h4
            // allow number only
            keyboardType="numeric"
            containerStyle={{ flex: 1 }}
            trailingAccessory={
              <View>
                <MaterialIcons
                  name="contacts"
                  size={24}
                  color="black"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
            }
          />
        </View>
      </View>
      {/* {Document} */}
      <View marginH-15>
        {/* DOC and Clear row */}
        <View row>
          <Text h3 popSB>
            Document
          </Text>
          <Text
            onPress={() => setDocuments([])}
            h4
            popR
            secondaryColor
            style={styles.addDocBtn}>
            Clear
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}>
          <FlatList
            style={{ height: "45%" }}
            data={documents}
            renderItem={({ item, index }) => (
              <DocList
                item={item}
                key={item.uri}
                onDelete={() => onDelete(item)}
              />
            )}
          />
          {/* ADD DOC Button */}
          <AddDocButton handle_doc_pick={handle_doc_pick} />

          {/* SEND Button */}
          <Button
            label="Send Fax"
            popM
            br30
            margin-10
            style={{
              backgroundColor: Colors.secondaryColor,
            }}
            onPress={() => handle_send_checks()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addDocBtn: {
    marginLeft: "auto",
    paddingRight: 10,
    textAlignVertical: "center",
    textDecorationLine: "underline",
  },
  numInpContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default send;
