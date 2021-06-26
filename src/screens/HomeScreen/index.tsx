import React, { useState} from "react";
import {View, FlatList} from 'react-native'

import { useNavigation } from "@react-navigation/native";


import {Profile} from '../../components/Profile'
import {ButtonAdd} from '../../components/ButtonAdd'
import {CategorySelect} from '../../components/CategorySelect'
import {ListHeader} from '../../components/ListHeader'
import {Appointment} from '../../components/Appointments'
import {ListDivider} from '../../components/ListDivider'
import {Background} from '../../components/Background'

import { styles } from "./styles";



export function HomeScreen() {

    const [category, setCategory] = useState('')

    const navigation = useNavigation()

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challender sem perder uma partida da md10',
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challender sem perder uma partida da md10',
        }
    ]

    function handleCategorySelect(categoryId:string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails() {
        navigation.navigate('AppointmentDetails')
    }

    function handlerAppointmenteCreate() {
        navigation.navigate('AppointmentCreate')
    }

    return(
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handlerAppointmenteCreate} />
            </View>

            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            <ListHeader title="Partidas agendads" subtitle="Total 6" />

            <FlatList
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Appointment 
                        data={item} 
                        onPress={handleAppointmentDetails}
                    />
                )}
                style={styles.matches}
                contentContainerStyle={{paddingBottom: 69}}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
            />
        </Background>
    )
}