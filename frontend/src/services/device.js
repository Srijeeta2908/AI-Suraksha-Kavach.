function generateDeviceId() {
  return (
    "device_" +
    Date.now() +
    "_" +
    Math.random().toString(36).substring(2, 15)
  );
}

export function getDeviceId() {
  let deviceId = localStorage.getItem(
    "ai_suraksha_device_id"
  );

  if (!deviceId) {
    deviceId = generateDeviceId();

    localStorage.setItem(
      "ai_suraksha_device_id",
      deviceId
    );
  }

  return deviceId;
}