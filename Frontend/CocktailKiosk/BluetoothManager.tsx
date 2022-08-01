import { Component } from "react"
import { Toast } from "native-base"

import BluetoothSerial from "react-native-bluetooth-serial"


const EOT_CHAR = ";"


export type device = { id: string, name: string }


export const PUMP_CONTROLLER_DEVICE: device = {
  name: "PumpController (ESP32)",
  id: "0C:DC:7E:62:7C:B2"
}


export class BluetoothManager {
  isEnabled: boolean
  devices: Array<device>
  connected: boolean
  connecting: boolean
  device: device | null

  onRequestOrderStart: CallableFunction
  onNotifyOrderStarted: CallableFunction
  onNotifyOrderFinished: CallableFunction
  onNotifyOrderCanceled: CallableFunction

  constructor() {
    this.isEnabled = false
    this.devices = []
    this.connected = false
    this.connecting = false
    this.device = null

    this.onRequestOrderStart = () => {}
    this.onNotifyOrderStarted = () => {}
    this.onNotifyOrderFinished = () => {}
    this.onNotifyOrderCanceled = () => {}
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
      console.log("Received from PumpController: " + msg.data.trim())
      Toast.show({description: `Message received from device:\n\n\"${msg.data.trim()}\"`})

      this.handleMessage(JSON.parse(msg.data.trim().slice(0, -1)))
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
    .finally(() => {
      this.connecting = false
    })
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

  handleMessage(message: any) {
    switch (message.message_type) {
      case "request_order_start":
        this.onRequestOrderStart()
        break;
      
        case "notify_order_started":
          this.onNotifyOrderStarted()
          break;
        
        case "notify_order_finished":
        this.onNotifyOrderFinished()
        break;
      
        case "notify_order_canceled":
          this.onNotifyOrderCanceled()
          break;
        
        default:
          console.log("WARNING: received message with unknown type: " + JSON.stringify(message))
    }
    
  }
}
