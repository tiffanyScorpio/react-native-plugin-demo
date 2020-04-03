import React, {
  Component
} from 'react'
import {
  View
} from "react-native"
import CommunicationsEmail from "./src/components/CommunicationsEmail"
import IflytekSpeech from "./src/components/IflytekSpeech"

export default class App extends Component {

  render() {
    return (<View >
      <IflytekSpeech />
      <CommunicationsEmail />
    </View>
    )
  }


}

