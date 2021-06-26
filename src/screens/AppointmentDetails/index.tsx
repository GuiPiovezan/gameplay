import { api } from '../../services/api';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform} from 'react-native';
import {Fontisto} from '@expo/vector-icons'
import {BorderlessButton} from 'react-native-gesture-handler'
import * as Linking from 'expo-linking';

import {Background} from '../../components/Background'
import {Header} from '../../components/Header'
import {ListHeader} from '../../components/ListHeader'
import {Member, MemberProps} from '../../components/Member'
import {ListDivider} from '../../components/ListDivider'
import {ButtonIcon} from '../../components/ButtonIcon'
import { AppointmentProps } from '../../components/Appointments';
import { Load } from '../../components/Load';


import { theme } from '../../global/styles/theme';
import BannerPNG from '../../assets/banner.png'
import { styles } from './styles';


type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: SVGStringList;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails() {

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true)


    const route = useRoute();
    const {guildSelected} = route.params as Params;

    async function fetchGuildWidget() {
        try{
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } 
        catch {
            Alert.alert('Virique as configurações do servidor. Será que o Widget está habilitado?')
        }
        finally {
            setLoading(false);
        }
    }

    function handleShareInvation() {
        const message = Platform.OS === 'ios' ?  `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

        Share.share({
            message, 
            url: widget.instant_invite
        });
    }

    function handlerOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget()
    },[])
    

  return (
      <Background>
        <Header 
            title="Detalhes" 
            action={(
                guildSelected.guild.owner && 
                <BorderlessButton onPress={handleShareInvation}>
                    <Fontisto name="share" size={24} color={theme.colors.primary} />
                </BorderlessButton>
            )}
        />

        <ImageBackground 
            source={BannerPNG}
            style={styles.banner}
        >
           <View style={styles.bannerContent}>
                <Text style={styles.title}> {guildSelected.guild.name} </Text>
                <Text style={styles.subtitle}>{ guildSelected.description }</Text>
           </View>
        </ImageBackground>

        {
            loading ? < Load/> : 
            <>
                <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`}/>
        
                <FlatList 
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Member data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    style={styles.members}
                />
            </>
        }

        {
             guildSelected.guild.owner && 
            <View style={styles.footer}>
                <ButtonIcon title="Entrar na partida" onPress={handlerOpenGuild} />
            </View>
        }

      </Background>
  );
}

