/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    AppRegistry,
    MPush,
    DeviceEventEmitter,
    StyleSheet
} from "react-native"
var { NativeModules } = require('react-native');
var mPush = NativeModules.MPush;
var that = null;
console.log(mPush)

export default class AliPush extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deviceId: null,
            message: null,
            notice: null
        };
    };

    //绑定事件
    componentDidMount() {
        that = this;
        this.getDeviceId()
        DeviceEventEmitter.addListener('onMessage', this.onMessage);
        DeviceEventEmitter.addListener('onNotification', this.onNotification);
    }
    //解绑事件
    componentWillUnmount() {
        DeviceEventEmitter.removeListener('onMessage', this.onMessage);
        DeviceEventEmitter.removeListener('onNotification', this.onNotification);
    }
    render() {
        return (
            <View>
                <Text>deviceId：{this.state.deviceId}</Text>
                <View style={styles.content}>
                    <Text>收到的消息：</Text>
                    {
                        this.state.message ? (<View>
                            <Text>ID:{this.state.message.messageId}</Text>
                            <Text>标题:{this.state.message.title}</Text>
                            <Text>内容:{this.state.message.content}</Text>
                            <Text>app ID:{this.state.message.appId}</Text>
                            <Text>traceInfo:{this.state.message.traceInfo}</Text>
                        </View>) : null
                    }
                </View>
                <View style={styles.content}>
                    <Text>收到的通知：</Text>
                    {
                        this.state.notice ? (
                            <View>
                                <Text>标题:{this.state.notice.title}</Text>
                                <Text>内容:{this.state.notice.content}</Text>
                            </View>
                        ) : null
                    }
                </View>
            </View>
        )
    }
    //事件处理逻辑
    onMessage(e) {
        that.setState({
            message: e
        });
        console.log("Message Received. Title:" + e.title + ", Content:" + e.content);
    }
    onNotification(e) {
        that.setState({
            message: e
        });
        console.log("Notification Received.Title:" + e.title + ", Content:" + e.content);
    }
    //调用Native方法
    getDeviceId = () => {
        // var that = this;
        // console.log(MPush)
        mPush.getDeviceId(function (args) {
            console.log(args)
            that.setState({
                deviceId: args
            });
        });

    }
}
const styles = StyleSheet.create({
    content: {
        borderColor: 'blue',
        borderWidth: 1,
        height: '45%'
    }
})