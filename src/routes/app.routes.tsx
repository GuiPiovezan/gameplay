import React from "react";
import {createStackNavigator} from '@react-navigation/stack'

import {HomeScreen} from '../screens/HomeScreen'
import {SigInScreen} from '../screens/SiginScreen'
import {AppointmentDetails} from '../screens/AppointmentDetails'
import {AppointmentCreate} from '../screens/AppointmentCreate'


import { theme } from "../global/styles/theme";

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator 
            headerMode="none" 
            screenOptions={{
                cardStyle: {
                    backgroundColor: theme.colors.secondary100
                }
            }} 
        >
            <Screen name="HomeScreen"  component={HomeScreen}/>
            <Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Screen name="AppointmentCreate" component={AppointmentCreate} />
        </Navigator>
    )
}