import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { cover } from "../assets";

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} h3>
        MatGear
      </Text>
      <Text style={styles.text} h5>
        <Text h5>Relação de transmissão:</Text> calcula a relação de transmissão
        a partir dos números de dentes do pinhão de da coroa
      </Text>
      <Text style={styles.text} h5>
        <Text h5>Dentes retos:</Text> calcula as características geométricas
        deste tipo de engrenagem a partir do número de dentes do pinhão e da
        coroa e do módulo
      </Text>
      <Text style={styles.text} h5>
        <Text h5>Dentes helicoidais:</Text> calcula as características
        geométricas deste tipo de engrenagem a partir do número de dentes do
        pinhão e da coroa, do módulo e do ângulo da hélice
      </Text>
      <Text h5>Desenvolvedores:</Text>
      <View>
        <Text style={styles.text} h5>
          Rodrigo Yoshio Ferreira Hiramine (estudante bolsita IFPE)
        </Text>
        <Text style={styles.text} h5>
          Marcos Antonio Souza do Nascimento Segundo (estudante bolsita IFPE)
        </Text>
        <Text style={styles.text} h5>
          Prof. Dr. Eng. Jose Dasio de Lira Junior
        </Text>
        <Text style={styles.text} h5>
          Prof. Dr. Eng. Tiago de Sousa Antonino
        </Text>
        <Text style={styles.text} h5>
          Prof. Dr. Eng. Pablo Batista Guimarães
        </Text>
        <Text style={styles.textCenter} h5>
          Instituto Federal de Educação, Ciência e Tecnologia de Pernambuco -
          IFPE - Campus Recife
        </Text>
      </View>
      <ImageBackground style={styles.image} source={cover}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    height: 260,
    width: 400,
  },
  text: {
    paddingHorizontal: 15,
    color: "#86939e",
  },
  textCenter: {
    textAlign: "center",
  },
});
