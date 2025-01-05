import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserCrud from './src/components/userCrud'
import Toast from 'react-native-toast-message';
import utils from '../firbase/src/utils/Index';


export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
     <UserCrud/>
     <Toast
              config={utils.toastConfig}
              position="bottom"
              bottomOffset={40}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})