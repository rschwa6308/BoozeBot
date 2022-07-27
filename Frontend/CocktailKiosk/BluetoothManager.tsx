import { Component } from "react"
import { Toast } from "native-base"

import BluetoothSerial from "react-native-bluetooth-serial"


const EOT_CHAR = ";"


export type device = { id: string, name: string }

export class BluetoothManager {
  isEnabled: boolean
  devices: Array<device>
  connected: boolean
  connecting: boolean
  device: device | null

  constructor() {
    this.isEnabled = false
    this.devices = []
    this.connected = false
    this.connecting = false
    this.device = null
  }

  initialize() {
    // initialize bluetooth and scan for available devices
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.withDelimiter("\r\n"),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, _, devices ] = values
      this.isEnabled = isEnabled
      this.devices = devices
      console.log(`Bluetooth Enabled: ${isEnabled}`)
      console.log(`Connected Devices:\n${devices}`)
    })

    // register event listeners
    BluetoothSerial.on("bluetoothEnabled", () => Toast.show({description: "Bluetooth enabled"}))
    BluetoothSerial.on("bluetoothDisabled", () => Toast.show({description: "Bluetooth disabled"}))
    BluetoothSerial.on("error", (err: any) => console.log(`Bluetooth Error: ${err.message}`))
    BluetoothSerial.on("connectionLost", () => {
      if (this.device != null) {
        Toast.show({description: `Connection to device \"${this.device.name}\" has been lost`})
      }
      this.connected = false
      this.device = null
    })
    
    BluetoothSerial.on("read", (msg: any) => {
      // console.log(msg)
      Toast.show({description: `Message received from device:\n\n\"${msg.data.trim()}\"`})
    })
  }

  connect(device: device) {
    this.connecting = true
    BluetoothSerial.connect(device.id)
    .then((res: any) => {
      Toast.show({description: `Connected to device \"${device.name}\"`})
      this.device = device
      this.connecting = false
      this.connected = true
    })
    .catch((err: any) => Toast.show({description: err.message}))
  }

  connectionStatus() {
    return {
      connected: this.connected,
      device: this.device
    }
  }

  refreshAvailableDevices() {
    return BluetoothSerial.list()
    .then((devices: Array<device>) => {
      this.devices = devices
    })
  }

  availableDevices() {
    return this.devices;
  }

  sendMessage(message_object: Object) {
    const message = JSON.stringify(message_object)

    if (message.includes(EOT_CHAR)) {
      console.warn(`WARNING: message should not include EOT character \"%{EOT_CHAR}\"`)
    }

    BluetoothSerial.write(message + EOT_CHAR)
    .then((res: any) => {
      console.log("Message sent: " + message)
    }).catch((err: any) => {
      Toast.show({description: err})
    })
  }
}
