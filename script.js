let device;
let characteristic;

async function connect() {
  try {
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(
      '0000ffe0-0000-1000-8000-00805f9b34fb'
    );

    characteristic = await service.getCharacteristic(
      '0000ffe1-0000-1000-8000-00805f9b34fb'
    );

    alert("✅ Conectado al robot");
  } catch (e) {
    alert("❌ Error al conectar");
    console.error(e);
  }
}

function send(letter) {
  if (!characteristic) {
    alert("⚠️ No conectado");
    return;
  }

  const data = new TextEncoder().encode(letter);
  characteristic.writeValue(data);
}
