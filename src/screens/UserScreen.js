import React, { useContext } from 'react'
import { View,Text } from 'react-native'
import { UserContext } from '../context/UserContext'

export const UserScreen = () => {
  const { user } = useContext(UserContext)
  return (
    <View>
      <Text>
        {user.displayName}
      </Text>
    </View>
  )
}
