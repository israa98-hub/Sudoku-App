import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Game_Board_View } from "./Game_Board/Game_Board_View";
import HomePage from "./Homepage/homepage_view";
import {Splash,Onboarding,Login,signup} from './screens'


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator>


      <Stack.Screen name="Splash" component={Splash}           
      options={{
            animation: "fade",
            headerShadowVisible: false,
            headerShown: false,
          }}/>
      <Stack.Screen name="Onboarding" component={Onboarding}
                options={{
                  animation: "fade",
                  headerShadowVisible: false,
                  headerShown: false,
                }} />
      <Stack.Screen name="signup" component={signup}
                options={{
                  animation: "fade",
                  headerShadowVisible: false,
                  headerShown: false,
                }} />
      <Stack.Screen name="Login" component={Login} 
                options={{
                  animation: "fade",
                  headerShadowVisible: false,
                  headerShown: false,
                }}/>

        <Stack.Screen
          name="homepage"
          component={HomePage}
          options={{
            animation: "fade",
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gameBoard"
          component={Game_Board_View}
          options={{
            animation: "fade",
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
