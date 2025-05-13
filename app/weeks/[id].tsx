import {View, Text} from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Week = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Week {id}</Text>
        </View>
    );
}


export default Week;