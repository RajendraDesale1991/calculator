import React, { Component } from 'react';
import { ToolbarAndroid } from 'react-native-gesture-handler';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { queryAllCalc, deleteAllCalc } from '../databases/allSchemas';

let FlatListItem = props => {
    const { itemIndex, id, calctext, resulttext, onPressItem } = props;

    return (
        <TouchableOpacity onPress={onPressItem}>
            <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }} numberOfLines={1} >{calctext}</Text>
                <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={1}>{resulttext}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calcList: []
        };
        this.reloadData();
    }
    reloadData = () => {
        queryAllCalc().then((calcList) => {
            this.setState({ calcList });
        }).catch((error) => {
            this.setState({ calcList: [] });
            alert("queryAllCalc calc error " + error);
        });
        console.log('reloadData');
    }

    onActionSelected(position) {
        if (position === 0) {
            this.clearHistory();
        }
    }

    clearHistory() {
        // TODO
        deleteAllCalc().then(() => {
            this.reloadData();
        }).catch((error) => {
            alert("deleteAllCalc calc error " + error);
        });

    }

    render() {

        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="History"
                    actions={[
                        { title: 'clear', show: 'never' },
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)} />

                <FlatList
                    style={styles.flatList}
                    data={this.state.calcList}
                    renderItem={({ item, index }) => <FlatListItem {...item} itemIndex={index}
                        onPressItem={() => {
                            this.props.navigation.state.params.updateData(item);
                            this.props.navigation.goBack();
                        }} />}
                    keyExtractor={item => "" + item.id}
                />
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

    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    }
});
