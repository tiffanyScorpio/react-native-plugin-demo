/**
 * create by tiffany liu at 2020-04-03
 * 使用插件：react-native-mail
 * 作用：A React Native wrapper for Apple's MFMailComposeViewController from iOS and Mail Intent on android Supports emails with attachments.
 */
import React, { Component } from 'react';
import { View, Alert, Button, StyleSheet } from 'react-native';
import Mailer from 'react-native-mail';

export default class Mail extends Component {

    handleEmail = () => {
        Mailer.mail({
            subject: 'need help',
            recipients: ['support@example.com'],
            ccRecipients: ['supportCC@example.com'],
            bccRecipients: ['supportBCC@example.com'],
            body: '<b>A Bold Body</b>',
            isHTML: true,
            attachment: {
                path: '',  // The absolute path of the file from which to read data.
                type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: '',   // Optional: Custom filename for attachment
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.handleEmail}
                    title="Email Me"
                    color="#841584"
                    accessabilityLabel="Purple Email Me Button"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})
