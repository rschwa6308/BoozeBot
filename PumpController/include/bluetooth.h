// Header file for "bluetooth.cpp"



void setupBT();

void loopBT();

boolean messageWaitingBT();

char** getMessageBT();

void sendMessageBT(char** msg);

void sendStructuredMessageBT(DynamicJsonDocument msg_doc);

bool connectedBT();
