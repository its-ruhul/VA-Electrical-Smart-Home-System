#include <WiFi.h>
#include <WebServer.h>

// Replace with your actual WiFi credentials
const char* ssid = "STAFF";
const char* password = "A6min@$ohr@";

// Initialize the web server on port 80 (default HTTP port)
WebServer server(80);

// Assign GPIO pins for the LEDs
const int led1Pin = 2; 
const int led2Pin = 4;

// Function that runs when the ESP32 receives a request at "/led"
void handleLEDCommand() {
  // 1. Send CORS Header to prevent browser from blocking React
  server.sendHeader("Access-Control-Allow-Origin", "*");

  // 2. Check if the URL has the correct variables (?id=X&state=Y)
  if (!server.hasArg("id") || !server.hasArg("state")) {
    server.send(400, "text/plain", "Bad Request: Missing id or state parameters");
    return;
  }

  // 3. Extract the variables
  String id = server.arg("id");
  String state = server.arg("state");

  // 4. Determine which pin to target
  int targetPin = -1;
  if (id == "1") targetPin = led1Pin;
  else if (id == "2") targetPin = led2Pin;
  else {
    server.send(400, "text/plain", "Invalid LED ID");
    return;
  }

  // 5. Determine the high/low status
  int pinStatus = (state == "on") ? HIGH : LOW;

  // 6. Execute the hardware command
  digitalWrite(targetPin, pinStatus);

  // 7. Send a success response back to React
  server.send(200, "text/plain", "Command executed successfully");
}

void setup() {
  Serial.begin(115200);

  // P: Pins
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  
  // Ensure LEDs start in the OFF state
  digitalWrite(led1Pin, LOW);
  digitalWrite(led2Pin, LOW);

  // W: WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
  Serial.print("Your ESP32 IP Address is: ");
  Serial.println(WiFi.localIP()); // Copy this IP into your React code

  // R: Routes
  server.on("/led", HTTP_GET, handleLEDCommand);

  // S: Server
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  // This keeps the server listening for incoming HTTP traffic
  server.handleClient();
}