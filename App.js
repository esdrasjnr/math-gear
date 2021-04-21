import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Ratio from "./src/screens/Ratio";
import SpurGear from "./src/screens/SpurGear";
import HelicalGear from "./src/screens/HelicalGear";
import Developers from "./src/screens/Developers";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Rel. transmissão":
                return (
                  <Icon
                    name="cogs"
                    type="font-awesome"
                    color={color}
                    size={size}
                  />
                );
              case "Dentes retos":
                return (
                  <Icon
                    name="cog"
                    type="font-awesome"
                    color={color}
                    size={size}
                  />
                );
              case "Dentes helicoidais":
                return (
                  <Icon
                    name="propeller-4"
                    type="fontisto"
                    color={color}
                    size={size}
                  />
                );
              case "Desenvolvedores":
                return (
                  <Icon
                    name="users"
                    type="font-awesome"
                    color={color}
                    size={size}
                  />
                );
              default:
                return null;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Desenvolvedores" component={Developers} />
        <Tab.Screen name="Rel. transmissão" component={Ratio} />
        <Tab.Screen name="Dentes retos" component={SpurGear} />
        <Tab.Screen name="Dentes helicoidais" component={HelicalGear} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
