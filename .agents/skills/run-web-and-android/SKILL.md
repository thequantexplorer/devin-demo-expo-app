---
name: run-web-and-android
description: Run the Errands Expo app on the web in Chrome and on the Android emulator (Expo Go), then take screenshots. Use when asked to run, test or screenshot the app.
---

# Run Errands on web and Android

The app is plain Expo with Expo Router. It runs in Expo Go, so there is no native Android build and no Gradle.

## 1. Install and test

```bash
npm ci
npm run typecheck
npm test
```

## 2. Web

```bash
npx expo start --web --port 8081
```

Open http://localhost:8081 in Chrome. Screens are at their file names, for example `/about`.

## 3. Android emulator

Skip any step that is already done (`adb devices` lists `emulator-5554`).

Install the SDK and create an emulator (about 1 minute):

```bash
export ANDROID_HOME="$HOME/android-sdk"
mkdir -p "$ANDROID_HOME/cmdline-tools" && cd "$ANDROID_HOME/cmdline-tools"
curl -fsSL https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -o tools.zip
unzip -q tools.zip -d tmp && mv tmp/cmdline-tools latest && rm -rf tools.zip tmp
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
yes | sdkmanager --licenses > /dev/null
sdkmanager "platform-tools" "emulator" "system-images;android-34;google_apis;x86_64"
echo "no" | avdmanager create avd -n devin -k "system-images;android-34;google_apis;x86_64" --device "pixel_6"
```

Start it with a window on the desktop, so it can be watched and recorded:

```bash
ls -l /dev/kvm   # if your user cannot read/write it: sudo chmod 666 /dev/kvm
DISPLAY=:0 emulator -avd devin -no-audio -no-snapshot -no-metrics -gpu swiftshader_indirect > /tmp/emulator.log 2>&1 &
adb wait-for-device
until [ "$(adb shell getprop sys.boot_completed | tr -d '\r')" = "1" ]; do sleep 5; done
```

The first boot takes about 5 minutes. The machine has only 2 CPU cores, so Android may then show
"System UI isn't responding" or "Process system isn't responding". Tap **Wait**, give it a minute,
and turn off animations:

```bash
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
```

Then, from the repo root, start Metro and open the app in Expo Go. Expo installs Expo Go on the emulator the first time:

```bash
npx expo start --android --port 8081
```

The same Metro server also serves the web app at http://localhost:8081, so you can keep one server for both.
If Expo Go opens on its own home screen instead of the app, run
`adb shell am start -a android.intent.action.VIEW -d "exp://10.0.2.2:8081" host.exp.exponent`.

## 4. Drive the app and take screenshots

- Find what is on screen: `adb shell uiautomator dump /sdcard/u.xml && adb shell cat /sdcard/u.xml`.
  Each control's `accessibilityLabel` shows as `content-desc`, with its `bounds`.
- Tap: `adb shell input tap X Y`. Type into a focused text box: `adb shell input text "Milk"`.
- Screenshot: `adb exec-out screencap -p > android.png`.
- On the web, use Chrome and take a screenshot of the browser window.

Attach the screenshots to the PR description and to your reply.
