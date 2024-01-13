import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from "@react-native-seoul/kakao-login";
import { awsServer } from "../server";
import axios from "axios";
import { useAppContext } from "../global/AppContext";
import { setStorageItem, getStorageItem } from "../global/AsyncStorage";

const LoginHub = ({navigation, route}) => {
  const [result, setResult] = useState("");
  const { position, setPosition , userInfo , setUserInfo , now , setNow } = useAppContext();

  const signInWithKakao = async () => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
      // console.log(JSON.stringify(token));
      const kakaoAccessToken = JSON.stringify(token.accessToken);
      const loginResponse = await axios.get(awsServer.url + `/oauth2/kakao?access_token=${kakaoAccessToken}`);

      const requestHeader = loginResponse.request.responseHeaders;

      const refreshToken = requestHeader['Set-Cookie'];
      const accessToken = loginResponse.data.accessToken;
      
      setUserInfo({
        accessToken: accessToken,
        refreshToken: refreshToken
      })

      await setStorageItem('accessToken', accessToken);
      await setStorageItem('refreshToken', refreshToken);


      navigation.navigate('HomeScreen');
    } catch (err) {
      console.error("login err", err);
    }
  };

  const signOutWithKakao = async () => {
    try {
      const message = await logout();
      setResult(message);
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const getProfile = async () => {
    try {
      const profile = await getKakaoProfile();
      setResult(JSON.stringify(profile));

    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const getShippingAddresses = async () => {
    try {
      const shippingAddresses = await getKakaoShippingAddresses();
      setResult(JSON.stringify(shippingAddresses));
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  const unlinkKakao = async () => {
    try {
      const message = await unlink();
      setResult(message);
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <ScrollView>
          <Text>{result}</Text>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}
      >
        <Text style={styles.text}>카카오 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => getProfile()}>
        <Text style={styles.text}>프로필 조회</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => getShippingAddresses()}>
        <Text style={styles.text}>배송주소록 조회</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => unlinkKakao()}>
        <Text style={styles.text}>링크 해제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => signOutWithKakao()}>
        <Text style={styles.text}>카카오 로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginHub;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  resultContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 24,
  },
  button: {
    backgroundColor: "#FEE500",
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: "center",
  },
});
