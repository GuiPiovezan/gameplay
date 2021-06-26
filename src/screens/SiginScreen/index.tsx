import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator} from 'react-native';

import {useAuth} from '../../hooks/auth'

import {styles} from './styles'

import illustration from '../../assets/illustration.png'

import {ButtonIcon} from '../../components/ButtonIcon'
import {Background} from '../../components/Background'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../global/styles/theme';

export function SigInScreen() {

  const {loading, signIn} = useAuth()

  async function handleSigIn() {
    try{
      await signIn()
    } catch(error){
      Alert.alert(error)
    }
  }

  return (
    <Background>
      <View style={styles.container}>

        <Image source={illustration} resizeMode="stretch" style={styles.image} />

        <View style={styles.content}>
            <Text style={styles.title}>Conecte-se {'\n'} e organize suas {'\n'} jogatinas</Text>
            <Text style={styles.subtitle}>Crie grupos para jogar seus games {'\n'} favoritos com seus amigos</Text>

            {    
              loading ? 
              <ActivityIndicator color={theme.colors.primary} /> : 
              <ButtonIcon 
                title="Entrar com Discord"
                onPress={handleSigIn}
              />
            }
        </View>
      </View>
    </Background>
  );
}

