#include <Arduino.h>

#define LED 14
#define BUTTON 32
#define RELAY_CHANNEL_1 13


bool buttonPressed;
bool lightOn;

void setup() {
    Serial.begin(9600);

    // inputs
    pinMode(BUTTON, INPUT_PULLUP);

    // outputs
    pinMode(LED, OUTPUT);
    pinMode(RELAY_CHANNEL_1, OUTPUT);

    buttonPressed = false;
}



void loop() {

    if (digitalRead(BUTTON) == LOW) {
        Serial.print("BUTTON PRESSED\n");
        digitalWrite(LED, HIGH);
        digitalWrite(RELAY_CHANNEL_1, HIGH);
    } else {
        digitalWrite(LED, LOW);
        digitalWrite(RELAY_CHANNEL_1, LOW);

    }

    // if (!buttonPressed && digitalRead(BUTTON) == LOW) {
    //     lightOn = !lightOn;
    //     // digitalWrite(LED, lightOn ? HIGH : LOW);
    //     Serial.print("BUTTON PRESSED");
    // }

    // buttonPressed = digitalRead(BUTTON) == LOW;

    delay(50);
}
