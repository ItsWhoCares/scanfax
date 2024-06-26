import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export const getDeviceUuid = async () => {
  //check if the device has a UUID
  const deviceUuid = await SecureStore.getItemAsync("deviceUuid");
  if (deviceUuid) {
    return deviceUuid;
  }

  // Generate a random UUID
  await createDeviceUuid();

  // Store the UUID in the device's secure storage
  const uuid = await SecureStore.getItemAsync("deviceUuid");

  return uuid;
};

export const createDeviceUuid = async () => {
  //check if the device has a UUID
  const deviceUuid = await SecureStore.getItemAsync("deviceUuid");
  if (deviceUuid) {
    return deviceUuid;
  }

  // Generate a random UUID
  const uuid = Crypto.randomUUID();

  // Store the UUID in the device's secure storage
  await SecureStore.setItemAsync("deviceUuid", uuid);

  return uuid;
};

export const insertToDb = async (data) => {
  const { data: insertedData, error } = await supabase
    .from("transactions")
    .insert([data])
    .select();

  if (error) {
    console.log(error);
    return false;
  }
  return insertedData;
};

export const handleUpload = async (data) => {
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
    // if any element is false, then set state to false else true
    const state = !res1.includes(false);
    // add state to data
    data.state = state;
    // remove toUpload key
    delete data.toUpload;

    // console.log("state", data);
    await storeLocally(data);

    setTimeout(() => {
      resolve(state);
    }, 1000);
  });
};

import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
export const uploadDocuments = async (documents, url) => {
  const promises = documents.map(async (doc) => {
    const docname = doc.split("/").pop();
    const ext = docname.split(".").pop();
    const contentType = ext === "pdf" ? "application/pdf" : `image/${ext}`;

    const base64 = await FileSystem.readAsStringAsync(doc, {
      encoding: "base64",
    });
    console.log("uploading doc", docname, "to", url);
    console.log("contentType", contentType);
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(`${url}/${docname}`, decode(base64), {
        contentType: contentType,
      });

    if (error) {
      console.log(error);
      return false;
    }
    return data;
  });

  return Promise.all(promises);
};
import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeLocally = async (data) => {
  // check if data is already stored
  const history = await AsyncStorage.getItem("history");
  if (history) {
    const parsedHistory = JSON.parse(history);
    parsedHistory.push(data);
    await AsyncStorage.setItem("history", JSON.stringify(parsedHistory));
  } else {
    await AsyncStorage.setItem("history", JSON.stringify([data]));
  }
};

export const getLocally = async () => {
  const history = await AsyncStorage.getItem("history");
  if (history) {
    // console.log("history", JSON.parse(history));
    return JSON.parse(history).reverse();
  }
  return [];
};

export const deleteLocally = async () => {
  await AsyncStorage.removeItem("history");
};

export function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sDay +
    "-" +
    sMonth +
    "-" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}
