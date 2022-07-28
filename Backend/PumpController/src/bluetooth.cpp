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
cppQueue messageQueue(sizeof(char*), MESSAGE_QUEUE_SIZE, FIFO, true);



// designed to be called once in main `setup()`
void setupBT() {
	SerialBT.begin("PumpController (ESP32)");	// Bluetooth device name
	Serial.println("The device started, now you can pair it with bluetooth!");
}


// designed to be called once every loop in main `loop()`
void loopBT() {
	// add incoming chars to the buffer
	// stop after consuming a set number to avoid blocking main loop
	int chars_read = 0;
	while (SerialBT.available() && chars_read < 64) {
		char rcv = (char) SerialBT.read();
		if (rcv != -1) {
			charBuffer.push(&rcv);
			chars_read++;
		}

		// if EOT is received, flush the buffer to a string and add to message queue
		if (rcv == EOT_CHAR) {
			char* msg = (char*) malloc(sizeof(char) * charBuffer.getRemainingCount());
			char c;
			int i = 0;
			while (charBuffer.pop(&c)) {
				msg[i] = c;
				i++;
			}
			msg[i-1] = '\0';			// overwrite EOT character with null terminator
			Serial.println(msg);
			char** msg_ptr = &msg;
			messageQueue.push(&msg_ptr);
		}
	}

}


boolean messageWaitingBT() {
	return !messageQueue.isEmpty();
}


char** getMessageBT() {
	char** msg_ptr;
	messageQueue.pop(&msg_ptr);
	return msg_ptr;
}
