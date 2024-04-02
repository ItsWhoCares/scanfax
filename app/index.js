import {
  View,
  Text,
  Picker,
  Button,
  Colors,
  Assets,
  Icon,
  TextField,
  Image,
  ListItem,
} from "react-native-ui-lib";
import React, { useState } from "react";
import { ScrollView, FlatList, TouchableOpacity } from "react-native";
import countryList from "../assets/countryList.json";
import { Entypo } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { BorderRadiuses } from "react-native-ui-lib/src/style/borderRadiuses";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DocList from "../components/DocList";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CountrySelector from "../components/CountrySelector";
import AddDocButton from "../components/AddDocButton";

const bytesToMB = (bytes) => {
  return bytes / 1024 / 1024;
};
const send = () => {
  const router = useRouter();
  const [country, setCountry] = useState({
    name: "India",
    dial_code: "+91",
    code: "IN",
  });

  const [faxNumber, setFaxNumber] = useState("");
  const [documents, setDocuments] = useState();

  const onDelete = (item) => {
    const i = documents.indexOf(item);
    if (i > -1) {
      const newDocs = documents.filter((a, index) => index !== i);
      setDocuments(newDocs);
    }
  };
  const handle_doc_pick = async () => {
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
    } else {
      router.push({
        pathname: "/pending",
        params: {
          documents: [documents.map((a) => a.uri)],
          faxNumber: faxNumber,
          countryName: country.name,
          countryDialCode: country.dial_code,
          countryCode: country.code,
          date: new Date().toISOString(),
        },
      });
    }
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}>
          <TextField
            value={country.dial_code}
            style={{
              height: 40,
              width: 50,
              fontFamily: "PopM",
              fontSize: 16,
              //   backgroundColor: "red",
            }}
            maxLength={6}
            centered
          />
          <TextField
            value={faxNumber}
            maxLength={12}
            onChangeText={(text) => setFaxNumber(text)}
            style={{
              marginLeft: 20,
              height: 40,
              fontFamily: "PopM",
              fontSize: 16,
              //   backgroundColor: "red",
            }}
            // allow number only
            keyboardType="numeric"
            containerStyle={{ flex: 1 }}
            trailingAccessory={
              <View>
                <FontAwesome
                  name="address-book"
                  size={24}
                  color="black"
                  style={{
                    // borderRadius: BorderRadiuses.br20,
                    // backgroundColor: Colors.$backgroundNeutral,
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
            style={{
              marginLeft: "auto",
              paddingRight: 10,
              textAlignVertical: "center",
              textDecorationLine: "underline",
            }}>
            Clear
          </Text>
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: "column",
            // flexGrow: 10,
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
            // keyExtractor={this.keyExtractor}
            // contentContainerStyle={{ flexGrow: 1 }}
          />
          {/* ADD DOC Button */}
          <AddDocButton handle_doc_pick={handle_doc_pick} />

          {/* SEND Button */}
          <Button
            label="Send Fax"
            //   onPress={this.handleSend}
            // marginB-20
            popM
            br30
            margin-10
            style={{
              // width: 150,
              // height: 50,
              backgroundColor: Colors.secondaryColor,
            }}
            onPress={() => handle_send_checks()}
          />
        </View>
      </View>
    </View>
  );
};

export default send;
