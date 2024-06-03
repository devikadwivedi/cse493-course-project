#include <Wire.h>
#include <SPI.h>
#include <Keyboard.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>

// Used for software SPI
#define LIS3DH_CLK 13
#define LIS3DH_MISO 12
#define LIS3DH_MOSI 11
// Used for hardware & software SPI
#define LIS3DH_CS 10

// software SPI
//Adafruit_LIS3DH lis = Adafruit_LIS3DH(LIS3DH_CS, LIS3DH_MOSI, LIS3DH_MISO, LIS3DH_CLK);
// hardware SPI
//Adafruit_LIS3DH lis = Adafruit_LIS3DH(LIS3DH_CS);
// I2C
Adafruit_LIS3DH lis = Adafruit_LIS3DH();

// constants for vibromotor
const int VIBROMOTOR_OUTPUT_PIN = 6;
unsigned long _vibroMotorStartTimeStamp = -1;  // Vibromotor timing
const int VIBROMOTOR_DURATION_MS = 200;

// constants for RGB LED
const int RGB_RED_PIN = 10;
const int RGB_GREEN_PIN  = 9;
const int RGB_BLUE_PIN  = 8;

void setup(void) {
  // Setup pin modes
  pinMode(RGB_RED_PIN, OUTPUT);
  pinMode(RGB_GREEN_PIN, OUTPUT);
  pinMode(RGB_BLUE_PIN, OUTPUT);
  pinMode(VIBROMOTOR_OUTPUT_PIN, OUTPUT);
  
  Serial.begin(115200);
  // while (!Serial) delay(10);     // will pause Zero, Leonardo, etc until serial console opens

  if (! lis.begin(0x18)) {   // change this to 0x19 for alternative i2c address
    Serial.println("Couldnt start");
    while (1) yield();
  }

  Keyboard.begin();

  // lis.setDataRate(LIS3DH_DATARATE_50_HZ);
  Serial.print("Data rate set to: ");
  switch (lis.getDataRate()) {
    case LIS3DH_DATARATE_1_HZ: Serial.println("1 Hz"); break;
    case LIS3DH_DATARATE_10_HZ: Serial.println("10 Hz"); break;
    case LIS3DH_DATARATE_25_HZ: Serial.println("25 Hz"); break;
    case LIS3DH_DATARATE_50_HZ: Serial.println("50 Hz"); break;
    case LIS3DH_DATARATE_100_HZ: Serial.println("100 Hz"); break;
    case LIS3DH_DATARATE_200_HZ: Serial.println("200 Hz"); break;
    case LIS3DH_DATARATE_400_HZ: Serial.println("400 Hz"); break;

    case LIS3DH_DATARATE_POWERDOWN: Serial.println("Powered Down"); break;
    case LIS3DH_DATARATE_LOWPOWER_5KHZ: Serial.println("5 Khz Low Power"); break;
    case LIS3DH_DATARATE_LOWPOWER_1K6HZ: Serial.println("16 Khz Low Power"); break;
  }

  // Set initial color
  setColor(200, 200, 200);
}

void loop() {
  if (Serial.available() > 0) {
    String rcvdSerialData = Serial.readStringUntil('\n');
    Serial.print("Arduino Received: ");
    Serial.println(rcvdSerialData);
    int state = rcvdSerialData.toInt();
    if (state == 0) {
      //info page
      setColor(0, 0, 200);
    } else if (state == 1) {
      //game page
      setColor(0, 0, 0);
    } else if (state == 2) {
      //win page
      setColor(0, 200, 0);
    } else if (state == 3) {
      //lose page
      setColor(200, 0, 0);
    } else {
      Serial.print("Wrong state");
    }
  }
  
  lis.read();      // get X Y and Z data at once

  /* Or....get a new sensor event, normalized */
  sensors_event_t event;
  lis.getEvent(&event);


  if (event.acceleration.y < -4.0) { // forward movement
    Keyboard.press('z');
    delay(100);
    Keyboard.releaseAll();

    // Vibrate motor when button hit
    digitalWrite(VIBROMOTOR_OUTPUT_PIN, HIGH);
    _vibroMotorStartTimeStamp = millis();
    // Serial.println("forward");
  } else if (event.acceleration.x > 3.0) { // left movement
    Keyboard.press('a');
    delay(100);
    Keyboard.releaseAll();
    // Serial.println("right");
  } else if (event.acceleration.x < -3.0) { // right movement
    Keyboard.press('s');
    delay(100);
    Keyboard.releaseAll();
    // Serial.println("left");
  }

  // Check for vibromotor output
  if(_vibroMotorStartTimeStamp != -1){
    if(millis() - _vibroMotorStartTimeStamp > VIBROMOTOR_DURATION_MS){
      _vibroMotorStartTimeStamp = -1;
      digitalWrite(VIBROMOTOR_OUTPUT_PIN, LOW);
    }
  }

  delay(200);
}

/**
 * setColor takes in values between 0 - 255 for the amount of red, green, and blue, respectively
 * where 255 is the maximum amount of that color and 0 is none of that color. You can illuminate
 * all colors by intermixing different combinations of red, green, and blue
 * 
 * This function is based on https://gist.github.com/jamesotron/766994
 */
void setColor(int red, int green, int blue)
{
  analogWrite(RGB_RED_PIN, red);
  analogWrite(RGB_GREEN_PIN, green);
  analogWrite(RGB_BLUE_PIN, blue);  
}