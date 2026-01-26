#include <WiFi.h>
#include <WebSocketsServer.h>
#include <Preferences.h>

// ==========================================
// WIFI SETTINGS
// ==========================================
Preferences preferences;
String ssid = "";
String password = "";

// ==========================================
// PIN CONFIGURATION
// ==========================================
const int FLAME_ALPHA = 34;
const int FLAME_BETA  = 35;
const int FLAME_GAMMA = 32;
const int BUZZER_PIN  = 33; // Sounds when fire is detected
const int STATUS_LED  = 2;  // Built-in LED

// ==========================================
// MULTI-DEVICE SERVER (Port 81)
// ==========================================
WebSocketsServer webSocket = WebSocketsServer(81);

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connected from %s\n", num, ip.toString().c_str());
        webSocket.sendTXT(num, "CONNECTED_TO_APULA");
      }
      break;
    case WStype_TEXT:
      Serial.printf("[%u] Received: %s\n", num, payload);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  
  pinMode(FLAME_ALPHA, INPUT);
  pinMode(FLAME_BETA, INPUT);
  pinMode(FLAME_GAMMA, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);

  // Load stored credentials
  preferences.begin("apula-wifi", false);
  ssid = preferences.getString("ssid", "");
  password = preferences.getString("pass", "");

  if (ssid != "") {
    Serial.println("\nConnecting to stored Wi-Fi: " + ssid);
    WiFi.begin(ssid.c_str(), password.c_str());
    
    int counter = 0;
    while (WiFi.status() != WL_CONNECTED && counter < 20) {
      delay(500);
      Serial.print(".");
      digitalWrite(STATUS_LED, !digitalRead(STATUS_LED));
      counter++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      digitalWrite(STATUS_LED, HIGH);
      Serial.println("\nWiFi Connected!");
      Serial.print("IP Address: ");
      Serial.println(WiFi.localIP());
    } else {
      Serial.println("\nFailed to connect. Waiting for Serial Config...");
    }
  } else {
    Serial.println("\nNo Wi-Fi credentials stored. Please use the dashboard to Sync.");
  }

  // Start WebSocket Server
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
  
  Serial.println("APULA Multi-Device Server Started (Port 81)");
}

unsigned long lastUpdate = 0;
bool fireDetected = false;

void loop() {
  webSocket.loop();

  // Handle Serial Configuration (from dashboard)
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    if (input.startsWith("WIFI:")) {
      String data = input.substring(5);
      int commaIndex = data.indexOf(',');
      if (commaIndex != -1) {
        ssid = data.substring(0, commaIndex);
        password = data.substring(commaIndex + 1);
        
        // Save to preferences
        preferences.putString("ssid", ssid);
        preferences.putString("pass", password);
        
        Serial.println("CREDENTIALS_SAVED");
        Serial.println("REBOOTING...");
        delay(1000);
        ESP.restart();
      }
    }
  }

  // Read Sensors (Low = Fire for most IR sensors)
  int s1 = digitalRead(FLAME_ALPHA);
  int s2 = digitalRead(FLAME_BETA);
  int s3 = digitalRead(FLAME_GAMMA);

  // Fire Logic
  if (s1 == LOW || s2 == LOW || s3 == LOW) {
    fireDetected = true;
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(STATUS_LED, (millis() / 100) % 2); // Rapid flash
  } else {
    fireDetected = false;
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(STATUS_LED, HIGH);
  }

  // Broadcast to all connected devices every 300ms
  if (millis() - lastUpdate > 300) {
    // Format: SENSORS:Alpha,Beta,Gamma
    // We invert the signal for the dashboard (1 = Fire, 0 = Safe)
    String data = "SENSORS:" + String(s1 == LOW ? 1 : 0) + "," 
                           + String(s2 == LOW ? 1 : 0) + "," 
                           + String(s3 == LOW ? 1 : 0);
    
    webSocket.broadcastTXT(data);
    lastUpdate = millis();
    
    if(fireDetected) {
      Serial.println("!!! FIRE DETECTED !!! -> " + data);
    }
  }
}