
/**
 * create by tiffany liu at 2020-04-03
 * 使用插件：react-native-communications
 * 作用：调用手机系统的电话、短信、邮件、浏览器等功能，这次只使用了邮件功能
 */
import React, { Component } from 'react';
import {
    View, Text, Button, StyleSheet
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Communications from 'react-native-communications';

export default class CommunicationsEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailAddress: null,
            emailSubject: null,
            emailBody: null
        };
    };

    render() {
        return (
            <View style={styles.mailContainer}>
                <Input
                    label="Your Email Address"
                    placeholder='email@address.com'
                    value={this.state.emailAddress}
                    onChangeText={(val) => { this.setState({ emailAddress: val }) }}
                />
                <Input
                    label="Subject"
                    placeholder="Please input Email's subject"
                    value={this.state.emailSubject}
                    onChangeText={(val) => { this.setState({ emailSubject: val }) }}
                />
                <Input
                    label="Body"
                    placeholder="Please input Email's body"
                    value={this.state.emailBody}
                    onChangeText={(val) => { this.setState({ emailBody: val }) }}
                />
                <Button onPress={() => { this.sendMail() }}
                    title="发送邮件"
                    color="#841584"
                    accessibilityLabel="点击发动邮件"></Button>
            </View>
        );
    }
    sendMail = () => {
        console.log(this.state.emailAddress)
        Communications.email([this.state.emailAddress], null, null, this.state.emailSubject, this.state.emailBody)
    }
}

const styles = StyleSheet.create({
    mailContainer: {
        marginTop: 20
    }
})
