// Bluetooth Communication (classic)

#include "BluetoothSerial.h"

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial SerialBT;

void setupBT() {
	SerialBT.begin("PumpController (ESP32)");	// Bluetooth device name
	Serial.println("The device started, now you can pair it with bluetooth!");
}


void loopBT() {
	if (Serial.available()) {
		SerialBT.write(Serial.read());
	}
	if (SerialBT.available()) {
		Serial.write(SerialBT.read());
	}
	// delay(20);
}
