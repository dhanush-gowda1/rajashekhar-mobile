import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BuildingsScreen from "./screens/BuildingsScreen";
import AddBuildingScreen from "./screens/AddBuildingScreen";
import TenantsScreen from "./screens/TenantsScreen";
import AddTenantScreen from "./screens/AddTenantScreen";
import EditTenantScreen from "./screens/EditTenantScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AccessDeniedScreen from "./screens/AccessDeniedScreen";
import { resetMonthlyRent } from "./utils/monthlyReset";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    resetMonthlyRent();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Buildings" component={BuildingsScreen} />
        <Stack.Screen name="AddBuilding" component={AddBuildingScreen} />
        <Stack.Screen name="Tenants" component={TenantsScreen} />
        <Stack.Screen name="AddTenant" component={AddTenantScreen} />
        <Stack.Screen name="EditTenant" component={EditTenantScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="AccessDenied" component={AccessDeniedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
