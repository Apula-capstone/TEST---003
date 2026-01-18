// APULA FIRE_OS V3.0 - Triple Sensor Logic
const int SENSORS[] = {A0, A1, A2};
const int PUMP = 7;

void setup() {
  Serial.begin(9600);
  for(int i=0; i<3; i++) pinMode(SENSORS[i], INPUT);
  pinMode(PUMP, OUTPUT);
}

void loop() {
  int fireCount = 0;
  for(int i=0; i<3; i++) {
    if(digitalRead(SENSORS[i]) == LOW) fireCount++;
  }

  // Logic: 1-2 sensors = Zone Alert; 3 sensors = TRIPLE FIRE
  if (fireCount == 3) Serial.println("FIRE:ALL");
  else if (fireCount > 0) Serial.println("FIRE:ZONE");

  if (Serial.available()) {
    char cmd = Serial.read();
    if (cmd == '1') digitalWrite(PUMP, HIGH);
    if (cmd == '0') digitalWrite(PUMP, LOW);
  }
  delay(100);
}