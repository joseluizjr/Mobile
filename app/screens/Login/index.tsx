import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";
import { RootStackParamList } from "../../../App";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = (): void => {
    // Adicione a lógica de login aqui
    navigation.navigate("Home");
  };

  const handleForgotPassword = (): void => {
    // Lógica para recuperação de senha
    console.log("Esqueci minha senha");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 200, height: 80 }}
        />

        <Text style={styles.title}>ACESSE SUA CONTA</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueci a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
