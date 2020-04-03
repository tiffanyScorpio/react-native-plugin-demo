import React, {
  Component
} from 'react'
import {
  View, Text, Button, NativeEventEmitter, PermissionsAndroid, StyleSheet
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-speech-iflytek";
import Communications from 'react-native-communications';
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      state: false,
      text: '111',
      btnText: '点击开始',
      emailAddress: null,
      emailSubject: null,
      emailBody: null
    }
  }
  componentDidMount() {
    requestCameraPermission()
  }
  render() {
    return (<View >
      <View>
        <Text>{this.state.text}</Text>
        <Button onPress={() => { this.startSpeek() }}
          title={this.state.btnText}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"></Button>
      </View>
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
  sendMail = () => {
    console.log(this.state.emailAddress)
    Communications.email([this.state.emailAddress], null, null, this.state.emailSubject, this.state.emailBody)
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

const styles = StyleSheet.create({
  mailContainer: {
    marginTop: 20
  }
})