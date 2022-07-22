#include <Arduino.h>
#include "bluetooth.h"


#define GREEN_BUTTON 32
#define RED_BUTTON 33

#define GREEN_LED 25
#define RED_LED 26

#define RELAY_CHANNEL_1 23
#define RELAY_CHANNEL_2 22
#define RELAY_CHANNEL_3 19
#define RELAY_CHANNEL_4 18
#define RELAY_CHANNEL_5 17	// "UART 2 TX"
#define RELAY_CHANNEL_6 16	// "UART 2 RX"


uint8_t getRelayChannelPin(int channel) {
	switch (channel) {
	case 1:
		return RELAY_CHANNEL_1;
	case 2:
		return RELAY_CHANNEL_2;
	case 3:
		return RELAY_CHANNEL_3;
	case 4:
		return RELAY_CHANNEL_4;
	case 5:
		return RELAY_CHANNEL_5;
	case 6:
		return RELAY_CHANNEL_6;
	
	default:
		return -1;
	}
}


bool greenButtonPressed;
bool redButtonPressed;

bool greenButtonOld;
bool redButtonOld;


int activePumpNumber;


void setup() {
	Serial.begin(115200);

	// inputs
	pinMode(GREEN_BUTTON, INPUT_PULLUP);
	pinMode(RED_BUTTON, INPUT_PULLUP);

	// outputs
	pinMode(GREEN_LED, OUTPUT);
	pinMode(RED_LED, OUTPUT);

	pinMode(RELAY_CHANNEL_1, OUTPUT);
	pinMode(RELAY_CHANNEL_2, OUTPUT);
	pinMode(RELAY_CHANNEL_3, OUTPUT);
	pinMode(RELAY_CHANNEL_4, OUTPUT);
	pinMode(RELAY_CHANNEL_5, OUTPUT);
	pinMode(RELAY_CHANNEL_6, OUTPUT);

	greenButtonOld = false;
	redButtonOld = false;

	activePumpNumber = 1;

	digitalWrite(GREEN_LED, LOW);
	digitalWrite(RED_LED, LOW);

	setupBT();	// initialize bluetooth serial service
}



void handleButtons() {
	// TODO: create a queue for button input events

	greenButtonPressed = digitalRead(GREEN_BUTTON) == LOW;
	redButtonPressed = digitalRead(RED_BUTTON) == LOW;
	
	if (!greenButtonOld && greenButtonPressed) {
		Serial.print("GREEN BUTTON DOWN\n");
		// digitalWrite(GREEN_LED, HIGH);
	}

	if (greenButtonOld && !greenButtonPressed) {
		Serial.print("GREEN BUTTON UP\n");
		// digitalWrite(GREEN_LED, LOW);
	}

	if (!redButtonOld && redButtonPressed) {
		Serial.print("RED BUTTON DOWN\n");
		// digitalWrite(RED_LED, HIGH);
	}

	if (redButtonOld && !redButtonPressed) {
		Serial.print("RED BUTTON UP\n");
	}

	greenButtonOld = greenButtonPressed;
	redButtonOld = redButtonPressed;
}



void handleMessage(String* msg_ptr) {
	String msg = *msg_ptr;
	Serial.printf("Received a message of length %d: \"%s\"\n", msg.length(), msg);
}



void loop() {

	handleButtons();
	
	loopBT();		// step the bluetooth loop function

	// if there is a message waiting, consume and handle it
	if (messageWaitingBT()) {
		String* msg_ptr = getMessageBT();
		handleMessage(msg_ptr);
	}

	delay(50);
}


