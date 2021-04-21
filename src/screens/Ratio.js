import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { gears } from "../assets";

const errMessage = "Número mínimo de dentes deve ser 6";

export default () => {
  const [driver, setDriver] = useState("");
  const [driven, setDriven] = useState("");
  const [ratio, setRatio] = useState("");
  const [driverErr, setDriverErr] = useState(false);
  const [drivenErr, setDrivenErr] = useState(false);

  const handleDriverChange = (val) => {
    setDriver(val);
    setRatio("");
    setDriverErr(false);
  };

  const handleDrivenChange = (val) => {
    setDriven(val);
    setRatio("");
    setDrivenErr(false);
  };

  const calculate = () => {
    const driverVal = parseInt(driver);
    const drivenVal = parseInt(driven);
    setDriverErr(isNaN(driverVal) || driver < 6);
    setDrivenErr(isNaN(drivenVal) || driven < 6);
    error = isNaN(driverVal) || driver < 6 || isNaN(drivenVal) || driven < 6;
    setRatio(
      error ? "" : `${(drivenVal / driverVal).toFixed(3).replace(".", ",")} : 1`
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={gears}>
        <View style={styles.inputArea}>
          <Input
            style={styles.input}
            label="Pinhão"
            onChangeText={handleDriverChange}
            errorMessage={driverErr ? errMessage : ""}
          />
          {ratio ? (
            <Text style={styles.text} h3>
              {ratio}
            </Text>
          ) : (
            <Button title="Calcular" onPress={calculate} />
          )}
          <Input
            style={styles.input}
            label="Coroa"
            onChangeText={handleDrivenChange}
            errorMessage={drivenErr ? errMessage : ""}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: 260,
  },
  inputArea: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "75%",
    width: "75%",
  },
  input: {
    color: "#86939e",
    fontWeight: "bold",
  },
  text: {
    color: "#86939e",
  },
});
