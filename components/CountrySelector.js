import {
  View,
  Text,
  Picker,
  Button,
  Colors,
  Assets,
  Icon,
} from "react-native-ui-lib";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { ScrollView, FlatList, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";
import countryList from "../assets/countryList.json";

const CountrySelector = ({ setCountry, country }) => {
  return (
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

                        <CountryFlag isoCode={countryValue.code} size={25} />
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
  );
};

export default CountrySelector;
