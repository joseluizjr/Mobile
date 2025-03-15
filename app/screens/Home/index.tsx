import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import styles from "./styles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = (): void => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.userName}>Usuário Exemplo</Text>
          <Text style={styles.userEmail}>usuario@exemplo.com</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Bem-vindo ao MedHealth</Text>
        <Text style={styles.infoText}>
          Este é o seu painel de controle. Aqui você pode gerenciar suas
          informações médicas, agendar consultas e acessar seu histórico de
          saúde.
        </Text>
      </View>

      <Text style={styles.text}>Bem-vindo à Tela Inicial</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
