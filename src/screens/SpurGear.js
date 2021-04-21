import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const table = [
  { label: "Passo", field: "passo" },
  { label: "Vão entre os dentes", field: "vao" },
  { label: "Adendo", field: "adendo" },
  { label: "Dedendo", field: "dedendo" },
  { label: "Altura comum do dente", field: "alturaComum" },
  { label: "Altura total do dente", field: "alturaTotal" },
  { label: "Espessura do dente no primitivo", field: "espessura" },
  { label: "Folga da cabeça", field: "folga" },
  { label: "Diâmetro primitivo", field: "diametroPrimitivo" },
  { label: "Diâmetro base", field: "diametroBase" },
  { label: "Diâmetro interno", field: "diametroInterno" },
  { label: "Diâmetro externo", field: "diametroExterno" },
  { label: "Distância entre os centros" },
];

const calcMethod = (gear, module) => {
  const passo = module * Math.PI;
  const vao = passo / 2;
  const adendo = module;
  const dedendo = 1.2 * module;
  const alturaComum = 2 * module;
  const alturaTotal = 2.2 * module;
  const espessura = passo / 2;
  const folga = 0.2 * module;
  const diametroPrimitivo = module * gear;
  const diametroBase = diametroPrimitivo * Math.cos(Math.PI / 9);
  const diametroInterno = diametroPrimitivo - 2.4 * module;
  const diametroExterno = diametroPrimitivo + 2 * module;

  return {
    passo,
    vao,
    adendo,
    dedendo,
    alturaComum,
    alturaTotal,
    espessura,
    folga,
    diametroPrimitivo,
    diametroBase,
    diametroInterno,
    diametroExterno,
  };
};

const distanceCalcMethod = (driver, driven) => {
  return (driver.diametroPrimitivo + driven.diametroPrimitivo) / 2;
};

const errGear = "Número mínimo de dentes deve ser 6";
const errModule = "Valor de módulo inválido";
const errAngle = "Valor de ângulo inválido";
const moduleValues = [
  { firstValue: 0.3, length: 7, step: 0.1 },
  { firstValue: 1, length: 12, step: 0.25 },
  { firstValue: 4, length: 6, step: 0.5 },
  { firstValue: 7, length: 9, step: 1 },
  { firstValue: 16, length: 4, step: 2 },
  { firstValue: 24, length: 7, step: 3 },
  { firstValue: 45, length: 7, step: 5 },
]
  .map(({ firstValue, length, step }) =>
    Array(length)
      .fill(firstValue)
      .map((val, idx) => val + idx * step)
  )
  .flat();

export default () => {
  const [driver, setDriver] = useState("");
  const [driven, setDriven] = useState("");
  const [module, setModule] = useState("");
  const [driverErr, setDriverErr] = useState(false);
  const [drivenErr, setDrivenErr] = useState(false);
  const [moduleErr, setModuleErr] = useState(false);
  const [driverGeometric, setDriverGeometric] = useState({});
  const [drivenGeometric, setDrivenGeometric] = useState({});
  const [distance, setDistance] = useState(null);

  const handleDriverChange = (val) => {
    setDriver(val);
    setDriverErr(false);
  };

  const handleDrivenChange = (val) => {
    setDriven(val);
    setDrivenErr(false);
  };

  const handleModuleChange = (val) => {
    setModule(val);
    setModuleErr(false);
  };

  const calculate = () => {
    const driverVal = parseInt(driver);
    const drivenVal = parseInt(driven);
    const moduleVal = parseFloat(module);
    setDriverErr(isNaN(driverVal) || driverVal < 6);
    setDrivenErr(isNaN(drivenVal) || drivenVal < 6);
    setModuleErr(!moduleValues.includes(moduleVal));

    const driverData = calcMethod(driverVal, moduleVal);
    const drivenData = calcMethod(drivenVal, moduleVal);
    const distance = distanceCalcMethod(driverData, drivenData);

    setDriverGeometric(driverData);
    setDrivenGeometric(drivenData);
    setDistance(distance);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Pinhão"
            onChangeText={handleDriverChange}
            errorMessage={driverErr ? errGear : ""}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Coroa"
            onChangeText={handleDrivenChange}
            errorMessage={drivenErr ? errGear : ""}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Módulo"
            onChangeText={handleModuleChange}
            errorMessage={moduleErr ? errModule : ""}
          />
        </View>
        <Button title="Calcular" onPress={calculate} />
      </View>
      <View style={styles.tableLine}>
        <Text style={styles.cellLabel} />
        <View style={styles.values}>
          <Text style={styles.cell}>Pinhão</Text>
          <Text style={styles.cell}>Coroa</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.table}>
        {table.map(({ label, field }) => (
          <View style={styles.tableLine} key={field || "distancia"}>
            <Text style={styles.cellLabel}>{label}</Text>
            {field ? (
              <View style={styles.values}>
                <Text style={styles.cell}>
                  {driverGeometric[field]
                    ? driverGeometric[field].toFixed(3)
                    : ""}
                </Text>
                <Text style={styles.cell}>
                  {drivenGeometric[field]
                    ? drivenGeometric[field].toFixed(3)
                    : ""}
                </Text>
              </View>
            ) : (
              <Text style={[styles.values, styles.cell]}>
                {distance ? distance.toFixed(3) : ""}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  inputArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "20%",
  },
  input: {
    color: "#86939e",
    fontWeight: "bold",
  },
  table: {
    flexGrow: 1,
  },
  tableLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 20,
  },
  values: {
    flexDirection: "row",
    width: "50%",
  },
  cellLabel: {
    width: "50%",
  },
  cell: {
    width: "50%",
    fontWeight: "bold",
    textAlign: "center",
  },
});
