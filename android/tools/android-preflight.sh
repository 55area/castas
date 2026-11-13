#!/usr/bin/env bash
set -euo pipefail

if [[ $# -gt 1 ]]; then
  printf 'Usage: %s [adb-serial]\n' "$0" >&2
  exit 2
fi

sdk=${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}
if [[ -z "$sdk" ]]; then
  printf 'Set ANDROID_HOME to the SDK directory in the host shell.\n' >&2
  exit 2
fi

adb="$sdk/platform-tools/adb"
emulator="$sdk/emulator/emulator"
if [[ ! -x "$adb" ]]; then
  printf 'Android Platform-Tools is missing from %s.\n' "$sdk" >&2
  exit 2
fi

printf 'SDK %s\n' "$sdk"
"${JAVA_HOME:+$JAVA_HOME/bin/}java" -version
if [[ -x "$emulator" ]]; then
  if ! "$emulator" -accel-check; then
    printf 'Run this check in the same host environment that launches the AVD. Use a physical device if acceleration is unavailable.\n' >&2
    [[ $# -eq 1 ]] || exit 1
  fi
else
  printf 'The emulator is unavailable in this SDK. Connect a physical device.\n' >&2
  [[ $# -eq 1 ]] || exit 1
fi

"$adb" devices -l
if [[ $# -eq 0 ]]; then
  printf 'Pass the intended serial to verify that the device is ready.\n'
  exit 0
fi

serial=$1
device_state=$(timeout 10 "$adb" -s "$serial" get-state 2>/dev/null || true)
if [[ "$device_state" != device ]]; then
  printf 'ADB target %s is not ready (%s).\n' "$serial" "${device_state:-unreachable}" >&2
  exit 1
fi
boot=$(timeout 10 "$adb" -s "$serial" shell getprop sys.boot_completed | tr -d '\r')
if [[ "$boot" != 1 ]]; then
  printf 'ADB target %s is connected but Android is still booting.\n' "$serial" >&2
  exit 1
fi
api=$(timeout 10 "$adb" -s "$serial" shell getprop ro.build.version.sdk | tr -d '\r')
printf 'Ready %s, Android API %s\n' "$serial" "$api"
