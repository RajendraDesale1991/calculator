/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ToolbarAndroid } from 'react-native-gesture-handler';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { insertCalcData } from '../databases/allSchemas';

export default class Calc extends Component {

    constructor() {
        super()
        this.state = {
            inputFlag : false,
            calculationText: "",
            resultText: ""
        }

        this.operators = ['Del', '/', '*', '-', '+']
    }

    updateData = item => {
        this.setState({
            calculationText: item.calctext,
            resultText: item.resulttext
        });
    }

    buttonPressed(text) {

        if (text == '=') {
            return this.calculateResult()
        }

        if (text == '.') {

            if (this.state.calculationText == "") {
                return
            }

            if (this.state.calculationText.indexOf('.') != -1) {
                return
            }
        }

        this.setState({
            inputFlag: true,
            calculationText: this.state.calculationText + text,
            resultText:""
        })
    }

    operatorPressed(operator) {
        switch (operator) {
            case 'DelL':
                this.setState({
                    inputFlag:false,
                    calculationText: "",
                    resultText: ""
                })
                break
            case 'Del':
                let text = this.state.calculationText.split('')
                text.pop()
                this.setState({
                    inputFlag:false,
                    calculationText: text.join(''),
                    resultText: ""
                })
                break
            case '/':
            case '*':
            case '-':
            case '+':

                const lastChar = this.state.calculationText.split('').pop()
                if (this.operators.indexOf(lastChar) > 0) return

                if (this.state.calculationText == '') return

                this.setState({
                    inputFlag:false,
                    calculationText: this.state.calculationText + operator
                });
                break
        }
    }

    onActionSelected(position) {
        if (position === 0) {
            this.showHistory();
        }

        if (position === 1) {
            this.showFeedback();
        }

        if (position === 2) {
            this.showHelp();
        }
    }

    showHistory() {
        this.props.navigation.navigate('History', {
            updateData: this.updateData
        });
    }

    showFeedback() {
        this.props.navigation.navigate('Feedback');
    }

    showHelp() {
        this.props.navigation.navigate('Help');
    }

    calculateResult() {
        const text = this.state.calculationText

        switch (text.slice(-1)) {
            case '+':
            case '-':
            case '/':
            case '*':
                return
        }

        this.setState({
            resultText: eval(text)
        })

    }

    insestCalcData() {
        const newCalc = {
            id: Math.floor(Date.now()),
            calctext: "" + this.state.calculationText,
            resulttext: "" + this.state.resultText
        };
        insertCalcData(newCalc).then(()=>{
            this.setState({
                inputFlag:false
            });
        }).catch((error) => {
            alert("insestCalcData calc error " + error);
        });
    }

    validation = {
        isEmailAddress:function(str) {
            var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str);
        },
        isNotEmpty:function (str) {
            var pattern =/\S+/;
            return pattern.test(str);
        },
        isNumber:function(str) {
            var pattern = /^-?[0-9]\d*(\.\d+)?$/;
            return pattern.test(str);
        },
        isSame:function(str1,str2){
            return str1 === str2;
        }
    }; 

    onSwipe(gestureName) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:

                break;
            case SWIPE_DOWN:
                this.showHistory();
                break;
            case SWIPE_LEFT:

                break;
            case SWIPE_RIGHT:

                break;
        }
    }

    render() {

        let numberElements = []
        let numbers = [[7, 8, 9], [4, 5, 6], [1, 2, 4], ['.', 0, '=']]

        for (let i = 0; i < numbers.length; i++) {
            let numbersRow = []
            for (let j = 0; j < numbers[i].length; j++) {

                numbersRow.push(
                    <TouchableOpacity key={numbers[i][j]} style={styles.btn}
                        onPress={() => this.buttonPressed(numbers[i][j])} >

                        <Text style={styles.btnText}>
                            {numbers[i][j]}
                        </Text>
                    </TouchableOpacity>)
            }
            numberElements.push(<View key={i} style={styles.row}>{numbersRow}</View>)
        }

        let operatorElements = []
        for (let i = 0; i < this.operators.length; i++) {

            if (this.operators[i] === 'Del') {
                operatorElements.push(
                    <TouchableOpacity key={this.operators[i]} style={styles.operator}
                        onPress={() => this.operatorPressed(this.operators[i])}
                        onLongPress={() => this.operatorPressed(this.operators[i] + "L")} >

                        <Text style={styles.operatorText}>
                            {this.operators[i]}
                        </Text>
                    </TouchableOpacity>
                )

            } else {

                operatorElements.push(
                    <TouchableOpacity key={this.operators[i]} style={styles.operator}
                        onPress={() => this.operatorPressed(this.operators[i])} >

                        <Text style={styles.operatorText}>
                            {this.operators[i]}
                        </Text>
                    </TouchableOpacity>
                )

            }
        }

        if (this.state.calculationText !== "" && this.state.resultText !== "" && this.validation.isNumber(this.state.resultText) && this.state.inputFlag ) {
            this.insestCalcData();
        }

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFCC00" animated={true}/>
                <View style={styles.textboxContainer}>

                    <GestureRecognizer
                        onSwipe={(direction) => this.onSwipe(direction)}
                        config={config}
                        style={{
                            flex: 1,
                        }}
                    >
                        <ToolbarAndroid style={styles.toolbar} title="Calculator"
                            actions={[
                                { title: 'History', show: 'never' },
                                { title: 'Send feedback', show: 'never' },
                                { title: 'Help', show: 'never' },
                            ]}
                            onActionSelected={this.onActionSelected.bind(this)} />

                        <View style={styles.calculation}>
                            <Text style={styles.calculationText} numberOfLines={1} ellipsizeMode={'head'}>{this.state.calculationText}</Text>
                        </View>
                        <View style={styles.result}>
                            <Text style={styles.resultText} numberOfLines={1}>{this.state.resultText}</Text>
                        </View>
                    </GestureRecognizer>
                </View>
                <View style={styles.controlButton}>
                    <View style={styles.numbers}>
                        {numberElements}
                    </View>
                    <View style={styles.operator}>
                        {operatorElements}
                    </View>
                    <View style={styles.sign}>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textboxContainer: {
        flex: 3,
        borderColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,

        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        elevation: 10,

    },
    toolbar: {
        height: 60,
        backgroundColor: 'white',
    },
    calculation: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    calculationText: {
        fontSize: 30,
        color: 'black',
    },
    result: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    resultText: {
        fontSize: 24,
        color: 'black',
    },
    controlButton: {
        flex: 7,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    numbers: {
        flex: 70,
        backgroundColor: 'white',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 30,
        color: 'black',
    },
    operator: {
        flex: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderLeftColor: '#bbb',
        borderLeftWidth: StyleSheet.hairlineWidth,
    },
    operatorText: {
        fontSize: 24,
        color: 'black',
    },
    sign: {
        flex: 5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderLeftColor: '#bbb',
        borderLeftWidth: StyleSheet.hairlineWidth,
    },

});
