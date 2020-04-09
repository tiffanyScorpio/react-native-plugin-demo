import React, {
  Component
} from 'react'
import {
  View,
  Text,
} from "react-native"
// import CommunicationsEmail from "./src/components/CommunicationsEmail"
// import IflytekSpeech from "./src/components/IflytekSpeech"
// import Mail from "./src/components/Mail"
import AliPush from "./src/components/AliPush"
export default class App extends Component {
  render() {
    return (<View >
      {/* <Text>222</Text> */}
      {/* <IflytekSpeech /> */}
      {/* <CommunicationsEmail /> */}
      {/* <Mail /> */}
      <AliPush />
    </View>
    )
  }
}

