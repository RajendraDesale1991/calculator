import React, { Component } from 'react';
import { ToolbarAndroid } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Help extends Component {


    render() {

        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="Help" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        height: 60,
        backgroundColor: 'white',

        borderColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,

        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        elevation: 10,

    }
}); 
