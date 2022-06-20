#include <Arduino.h>

#define LED 23
#define BUTTON 32


bool buttonPressed;
bool lightOn;

void setup() {
    Serial.begin(9600);
    pinMode(LED, OUTPUT);
    pinMode(BUTTON, INPUT_PULLUP);

    buttonPressed = false;
}



void loop() {
    if (!buttonPressed && digitalRead(BUTTON) == LOW) {
        lightOn = !lightOn;
        digitalWrite(LED, lightOn ? HIGH : LOW);
    }

    buttonPressed = digitalRead(BUTTON) == LOW;

    delay(50);
}
