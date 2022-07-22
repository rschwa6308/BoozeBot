// Bluetooth Communication (classic)

#include "BluetoothSerial.h"
#include <cppQueue.h>

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif


#define MAX_MESSAGE_LENGTH 300
#define EOT_CHAR ';'
#define MESSAGE_QUEUE_SIZE 5


BluetoothSerial SerialBT;


cppQueue charBuffer(sizeof(char), MAX_MESSAGE_LENGTH, FIFO, true);
cppQueue messageQueue(sizeof(String*), MESSAGE_QUEUE_SIZE, FIFO, true);


// designed to be called once in main `setup()`
void setupBT() {
	SerialBT.begin("PumpController (ESP32)");	// Bluetooth device name
	Serial.println("The device started, now you can pair it with bluetooth!");
}


// designed to be called once every loop in main `loop()`
void loopBT() {
	// add incoming chars to the buffer
	if (SerialBT.available()) {
		char rcv = (char) SerialBT.read();
		if (rcv != -1) {
			// Serial.print(rcv);
			charBuffer.push(&rcv);
		}
	}

	// if EOT is received, flush the buffer to a string and add to message queue
	if (!charBuffer.isEmpty()) {
		char c;
		charBuffer.peekPrevious(&c);	// look at last entry in the buffer
		if (c == EOT_CHAR) {
			String msg;
			while (charBuffer.pop(&c)) {
				msg += c;
				Serial.println(msg);
			}
			Serial.printf("msg_ptr from loopBT(): %d\n", &msg);
			messageQueue.push(&msg);
		}
	}
}


boolean messageWaitingBT() {
	return !messageQueue.isEmpty();
}


String* getMessageBT() {
	String* msg_ptr;
	bool res = messageQueue.pop(&msg_ptr);
	if (res) {
		Serial.println("messageQueue.pop() succeeded!");
	} else {
		Serial.println("messageQueue.pop() failed!");
	}

	// TODO: figure out why the message string pointer is changing
	Serial.printf("msg_ptr from getMessageBT(): %d\n", msg_ptr);
	return msg_ptr;
}
