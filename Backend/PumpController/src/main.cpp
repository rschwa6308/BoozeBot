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


void loop() {

	// if (digitalRead(GREEN_BUTTON) == LOW) {
	// 	digitalWrite(GREEN_LED, HIGH);
	// 	Serial.println("GREEN BUTTON PRESSED");
	// } else {
	// 	digitalWrite(GREEN_LED, LOW);
	// }

	// Serial.println("GREEN BUTTON: " + digitalRead(GREEN_BUTTON));
	// Serial.println("RED BUTTON: " + digitalRead(RED_BUTTON));

	bool greenButtonNew = digitalRead(GREEN_BUTTON) == LOW;
	bool redButtonNew = digitalRead(RED_BUTTON) == LOW;
	
	if (!greenButtonOld && greenButtonNew) {
		Serial.print("GREEN BUTTON DOWN\n");

		digitalWrite(GREEN_LED, HIGH);
		digitalWrite(getRelayChannelPin(activePumpNumber), HIGH);
	}

	if (greenButtonOld && !greenButtonNew) {
		Serial.print("GREEN BUTTON UP\n");

		digitalWrite(GREEN_LED, LOW);
		digitalWrite(getRelayChannelPin(activePumpNumber), LOW);
	}

	if (!redButtonOld && redButtonNew) {
		Serial.print("RED BUTTON DOWN\n");

		digitalWrite(RED_LED, HIGH);
	}

	if (redButtonOld && !redButtonNew) {
		Serial.print("RED BUTTON UP\n");

		digitalWrite(RED_LED, LOW);

		activePumpNumber++;
		if (activePumpNumber > 6) {
			activePumpNumber = 1;
		}
		Serial.printf("Controlling Pump %d\n", activePumpNumber);
	}

	greenButtonOld = greenButtonNew;
	redButtonOld = redButtonNew;

	loopBT();		// step the bluetooth loop function

	delay(50);
}