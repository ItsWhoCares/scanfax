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

  const [faxNumber, setFaxNumber] = useState("7019460164");
  const [documents, setDocuments] = useState([
    {
      mimeType: "image/png",
      name: "1200px-Image_created_with_a_mobile_phone.png",
      size: 1369165,
      uri: "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/686ce0b2-7132-4a55-8e55-5ef6fc16cdfd.png",
    },
    {
      mimeType: "image/png",
      name: "1200px-Image_created_with_a_mobile_phone.png",
      size: 1369165,
      uri: "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/686ce0b2-7132-4a55-8e55-5ef6fc16cdfd.png",
    },
  ]);

  const handle_doc_pick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png"],
      copyToCacheDirectory: true,
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
        },
      });
    }
  };
  return (
    <View bg-white flex>
      <Text marginH-15 marginT-10 popSB h3>
        Send To
      </Text>
      {/* {Country} */}
      <View marginH-15 marginV-5>
        <Text grey30 h4 popR>
          Country
        </Text>
        <TouchableOpacity>
          <View padding-10>
            {/* <Button outline ></Button> */}
            <Picker
              placeholder="Country"
              value={country.name}
              enableModalBlur={false}
              onChange={(item) =>
                setCountry(countryList.find((a) => item === a.name))
              }
              topBarProps={{ title: "Country" }}
              style={{
                fontFamily: "PopM",
              }}
              showSearch
              searchPlaceholder={"Search a country"}
              searchStyle={{
                color: Colors.blue30,
                placeholderTextColor: Colors.grey50,
              }}
              // onSearchChange={value => console.warn('value', value)}
              renderPicker={(countryName) => {
                // return null;
                const countryValue = countryList.find(
                  (item) => item.name === countryName
                );
                return (
                  <View row>
                    {countryValue ? (
                      <>
                        <CountryFlag isoCode={countryValue.code} size={25} />

                        <Text text70 marginL-25 $textDefault popM>
                          {countryValue?.name}
                        </Text>
                      </>
                    ) : (
                      <Text text70 $textNeutral>
                        Pick a country
                      </Text>
                    )}
                    <View
                      style={{
                        marginLeft: "auto",
                      }}>
                      <Entypo name="chevron-down" size={24} color="black" />
                    </View>
                  </View>
                );
              }}>
              {countryList.map((country, index) => {
                return (
                  <Picker.Item
                    key={index}
                    value={country.name}
                    label={country.name}
                    renderItem={(countryName, props) => {
                      //   return null;
                      const countryValue = countryList.find(
                        (item) => item.name === countryName
                      );
                      return (
                        <View
                          style={{
                            height: 56,
                            borderBottomWidth: 1,
                            borderColor: Colors.$backgroundNeutral,
                          }}
                          paddingH-15
                          row
                          centerV
                          spread>
                          <View row centerV>
                            {/* <Avatar size={35} source={{uri: contact?.thumbnail}}/> */}

                            <CountryFlag
                              isoCode={countryValue.code}
                              size={25}
                            />
                            <Text marginL-30 text70 $textDefault popM>
                              {countryValue?.name}
                            </Text>
                          </View>
                          {props.isSelected && (
                            <Icon
                              source={Assets.icons.check}
                              tintColor={Colors.$iconDefault}
                            />
                          )}
                        </View>
                      );
                    }}
                  />
                );
              })}
            </Picker>
          </View>
        </TouchableOpacity>
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
            // backgroundColor: "red",
            // justifyContent: "center",
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
            centered
          />
          <TextField
            value={faxNumber}
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
            style={{ height: "42%" }}
            data={documents}
            renderItem={({ item, index }) => (
              <DocList item={item} setDocuments={setDocuments} id={index} />
            )}
            // keyExtractor={this.keyExtractor}
            // contentContainerStyle={{ flexGrow: 1 }}
          />
          {/* ADD DOC Button */}
          <View padding-10>
            <TouchableOpacity onPress={() => handle_doc_pick()}>
              <View
                style={{
                  // padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor: "white",
                }}>
                <FontAwesome
                  name="plus"
                  size={24}
                  color={Colors.$iconDefault}
                  style={{
                    width: 50,
                    borderRadius: BorderRadiuses.br20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />

                <View
                  popM
                  style={{
                    // backgroundColor: Colors.red10,
                    borderRadius: 20,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                  <Text
                    h4
                    popM
                    style={{
                      fontFamily: "PopM",
                      //   textAlign: "center",
                    }}>
                    Document
                  </Text>
                  <Text popR>Add page or file</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

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
