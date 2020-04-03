/**
 * create by tiffany liu at 2020-04-01
 * 使用插件：react-native-speech-iflytek
 * 作用：科大讯飞的语音识别插件
 */

import React, { Component } from 'react'
import {
    View, Text, Button, NativeEventEmitter, PermissionsAndroid, StyleSheet
} from "react-native"
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-speech-iflytek";

export default class IflytekSpeech extends Component {
    constructor(props) {
        super(props)

        this.state = {
            state: false,
            text: '111',
            btnText: '点击开始',
        }
    }
    componentDidMount() {
        requestCameraPermission()
    }
    render() {
        return (
            <View>
                <Text>{this.state.text}</Text>
                <Button onPress={() => { this.startSpeek() }}
                    title={this.state.btnText}
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"></Button>
            </View>
        )
    }

    startSpeek = () => {


        let state = !this.state.state;
        this.setState({
            state: state
        })
        if (state) {
            this.setState({
                btnText: '点击停止'
            })
            console.log('start')
            Recognizer.init("5e845214");
            this.recognizerEventEmitter = new NativeEventEmitter(Recognizer);
            this.recognizerEventEmitter.addListener('onRecognizerResult', this.onRecognizerResult);
            this.recognizerEventEmitter.addListener('onRecognizerError', this.onRecognizerError);
            Recognizer.start();
            Recognizer.isListening().then((res) => {
                console.log('检测当前是否正在语音识别:' + res)
            })
        } else {
            console.log('cancel')
            this.setState({
                btnText: '点击开始'
            })
            Recognizer.stop()
            Recognizer.isListening().then((res) => {
                console.log('检测当前是否正在语音识别:' + res)
            })
        }

    }
    onRecognizerResult = (e) => {
        console.log(e)
        if (!e.isLast) {
            return;
        }
        this.setState({ text: e.result });
    }
    onRecognizerError = (e) => {
        console.log(e)
    }
    stopSpeek = () => {

    }

}
async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                'title': '获取录音权限',
                'message': '没权限我不能工作，请授权读写权限'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('你已获取了录音权限');
        } else {
            console.log('获取录音权限失败！');
        }
    } catch (err) {
        this.show(err.toString())
    }
}
