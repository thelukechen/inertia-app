import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, View, Image, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseApiUrl } from '../helper';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export let userId = "";

export default function Auth({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const[showLoginButtons, setShowLoginButtons] = useState('flex');

  function displayModalHandler() {
    setShowEmailModal(true);
  }


  function signInHandler() {
    signIn(email, password)
  }

  function signUpHandler() {
    signUp(email, password)
  }


  async function signUp(email, password) {
    const userData = {
      email: email,
      password: password,
    };
    
    // Make the POST request
    axios.post(baseApiUrl+"auth/signup", userData)
      .then(response => {
        // Handle the response from the server
        setShowEmailModal(false)
        userId = response.data.userId
        navigation.navigate('TabRoot')
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  }

  async function signIn(email, password) {
    const userData = {
      email: email,
      password: password,
    };
    
    // Make the POST request
    axios.post(baseApiUrl+"auth/signin", userData)
      .then(response => {
        // Handle the response from the server
        setShowEmailModal(false)
        userId = response.data.userId
        navigation.navigate('TabRoot')
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  }


  return (
    <View style={styles.container}>
      <Modal style={{ backgroundColor: 'black'}} visible={showEmailModal} animationType='slide' transparent={true}>
      <View style={{backgroundColor: 'black', height: 550, justifyContent: 'center', alignItems: 'center', top: 300, paddingHorizontal: 20}}>
        <View style={[styles.verticallySpaced, styles.mt20,]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={signInHandler} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={signUpHandler} />
        </View>
      </View>
      </Modal>
      <View style={{alignItems: 'center'}}>
        <Image source={require("../assets/Login/inertia_transparent.png") } style={{height:210, width: 300, top: -150,}}>
          
        </Image>
        <View style={{top: 50, display: showLoginButtons}}>
          <View>
            <TouchableOpacity style={{ height: 45, width: 250, backgroundColor: 'white', borderRadius: 80, marginBottom: 20, alignItems: 'center', flexDirection: 'row'}} onPress={displayModalHandler}>
              <Image source={require('../assets/Login/email.png')} style={{height: 22, width: 30, marginLeft: 22}}></Image>
              <Text style={styles.buttonText}>Sign in with email</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{height: 45, width: 250, backgroundColor: 'white', borderRadius: 80, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../assets/Login/google.png')} style={{height: 23, width: 22, marginLeft: 26, }}></Image>
              <Text style={[styles.buttonText, {marginLeft: 33}]}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 0
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 28
  }

})