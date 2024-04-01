import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rqypllshpjvwjzdymnrf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxeXBsbHNocGp2d2p6ZHltbnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5OTE5ODIsImV4cCI6MjAyNzU2Nzk4Mn0.GiJxSviG-GWakHTPddLvY2uOjHmtMjA1WJMwqfmDINE"
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
    .insert([data]);

  if (error) {
    console.log(error);
    return false;
  }

  return insertedData;
};
