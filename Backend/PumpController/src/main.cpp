#include <Arduino.h>
#include <ArduinoJson.h>

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


#define PUMP_SPEED 2.5		// pump flow rate (measured in mL/s)


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


bool currentlyHandlingOrder;	// flag that indicates if an order is currently being handled
long currentOrderStartTime;		// time that the current order started (measured in milliseconds)
int currentOrder[6];			// array that keeps track of how long each pump should be run (measured in milliseconds)

bool kiosk_order_confirmed;		// flag that indicates when the kiosk is in a "order confirmed" state


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

	digitalWrite(GREEN_LED, LOW);
	digitalWrite(RED_LED, LOW);

	setupBT();	// initialize bluetooth serial service
}



void handleButtons() {
	greenButtonPressed = digitalRead(GREEN_BUTTON) == LOW;
	redButtonPressed = digitalRead(RED_BUTTON) == LOW;
	
	if (!greenButtonOld && greenButtonPressed) {
		Serial.print("GREEN BUTTON DOWN\n");
		digitalWrite(GREEN_LED, HIGH);		// DEBUG
		
		// send REQUEST_ORDER_START message if kiosk is ready for it
		if (kiosk_order_confirmed) {
			DynamicJsonDocument doc(1024);
			doc["message_type"] = "request_order_start";
			doc["message_content"] = "";	// no content
			sendStructuredMessageBT(doc);
		}
	}

	if (greenButtonOld && !greenButtonPressed) {
		Serial.print("GREEN BUTTON UP\n");
		digitalWrite(GREEN_LED, LOW);		// DEBUG
	}

	if (!redButtonOld && redButtonPressed) {
		Serial.print("RED BUTTON DOWN\n");
		digitalWrite(RED_LED, HIGH);		// DEBUG

		// cancel order
		currentlyHandlingOrder = false;
		for (int i = 0; i < 6; i++) {
			// SHUT IT DOWN!!!
			digitalWrite(getRelayChannelPin(i + 1), LOW);
		}

		// send notification to kiosk
		DynamicJsonDocument doc(1024);
		doc["message_type"] = "notify_order_canceled";
		doc["message_content"] = "";	// no content
		sendStructuredMessageBT(doc);
	}

	if (redButtonOld && !redButtonPressed) {
		Serial.print("RED BUTTON UP\n");
		digitalWrite(RED_LED, LOW);			// DEBUG

	}

	greenButtonOld = greenButtonPressed;
	redButtonOld = redButtonPressed;


	// handle button LED states
	digitalWrite(GREEN_LED, kiosk_order_confirmed ? HIGH : LOW);
	digitalWrite(RED_LED, currentlyHandlingOrder ? HIGH : LOW);
}


int getMakespan(const int ingredientAmounts[6]) {
	int max = -1;
	for (int i = 0; i < 6; i++) {
		if (ingredientAmounts[i] > max) {
			max = ingredientAmounts[i];
		}
	}
	return max;
}



void handleMessage(char* msg) {
	// Serial.printf("handleMessage(\"%s\")\n", msg);

	// if an order is currently in progress, ignore all incoming messages
	if (currentlyHandlingOrder) {
		return;
	}

	DynamicJsonDocument doc(1024);
	deserializeJson(doc, msg);

	const char* msg_type = doc["message_type"];
	// Serial.printf("message_type = \"%s\"\n", msg_type);

	if (strcmp(msg_type, "signal_order_start") == 0) {
		const int ingredientAmounts[6] = {
			doc["message_content"]["ingredient_amounts"][0],
			doc["message_content"]["ingredient_amounts"][1],
			doc["message_content"]["ingredient_amounts"][2],
			doc["message_content"]["ingredient_amounts"][3],
			doc["message_content"]["ingredient_amounts"][4],
			doc["message_content"]["ingredient_amounts"][5]
		};

		currentlyHandlingOrder = true;
		currentOrderStartTime = millis();	// note the time that the order started

		for (int i = 0; i < 6; i++) {
			// compute how long each pump needs to stay on
			currentOrder[i] = 1000 * ingredientAmounts[i] / PUMP_SPEED;

			// turn on pumps that have work to do
			if (currentOrder[i] > 0) {
				Serial.printf("Running pump #%d for %d seconds...\n", i+1, currentOrder[i]/1000);
				digitalWrite(getRelayChannelPin(i + 1), HIGH);
			}
		}

		// send notification to kiosk
		DynamicJsonDocument doc(1024);
		JsonObject message_content = doc.createNestedObject("message_content");
		doc["message_type"] = "notify_order_started";
		message_content["eta"] = getMakespan(currentOrder);
		sendStructuredMessageBT(doc);
	}
	
	else if (strcmp(msg_type, "signal_manual_control") == 0) {
		const int pumpNumber = doc["message_content"]["pump_number"];
		const bool newState = doc["message_content"]["state"];

		Serial.printf("Manual Control Signal: turning pump #%d %s\n", pumpNumber, newState ? "ON" : "OFF");
		digitalWrite(getRelayChannelPin(pumpNumber), newState ? HIGH : LOW);
	}

	else if (strcmp(msg_type, "notify_UI_state") == 0) {
		const char* UIState = doc["message_content"]["UI_state"];
		if (strcmp(UIState, "order_confirmed") == 0) {
			kiosk_order_confirmed = true;
		} else {
			kiosk_order_confirmed = false;
		}
		Serial.print("kiosk_order_confirmed: ");
		Serial.println(kiosk_order_confirmed ? "true" : "false");
	}
	
	else {
		Serial.printf("WARNING: unknown message type: %s\n", msg_type);
	}

	free(msg);		// no memory leaks pls
}



void handleOrder() {
	if (!currentlyHandlingOrder) {
		return;		// NoOp
	}

	long elapsed = millis() - currentOrderStartTime;

	bool orderFinished = true;

	for (int i = 0; i < 6; i++) {
		if (currentOrder[i] == 0) {
			continue;
		}

		orderFinished = false;

		// if pump has run for long enough, turn it off
		if (elapsed >= currentOrder[i]) {
			currentOrder[i] = 0;
			Serial.printf("Turning off pump #%d\n", i+1);
			digitalWrite(getRelayChannelPin(i+1), LOW);
		}
	}

	if (orderFinished) {
		Serial.println("ORDER FINISHED!!!");
		currentlyHandlingOrder = false;

		// send notification to kiosk
		DynamicJsonDocument doc(1024);
		doc["message_type"] = "notify_order_finished";
		doc["message_content"] = "";	// no content
		sendStructuredMessageBT(doc);
	}
}



void loop() {

	handleButtons();	// step the button-handling loop
	
	loopBT();			// step the bluetooth loop

	handleOrder();		// step the order-handling loop
	
	// if there is a message waiting, consume and handle it
	if (messageWaitingBT()) {
		char** msg_ptr = getMessageBT();
		try {
			handleMessage(*msg_ptr);
		}
		catch (...) {
			Serial.println("ERROR: an error occurred while handling message");
		}
	}

	// turn off green LED if not connected at all
	if (!connectedBT()) {
		kiosk_order_confirmed = false;
	}

	delay(10);			// wait a few milliseconds
}


