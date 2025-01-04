import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserCrud from './src/components/userCrud'

export default function App() {
  return (
    <View style={{flex:1}}>
     <UserCrud/>
    </View>
  )
}

const styles = StyleSheet.create({})