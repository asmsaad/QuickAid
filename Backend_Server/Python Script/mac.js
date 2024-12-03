const os = require('os');

// Get IP addresses
const networkInterfaces = os.networkInterfaces();
const ipAddresses = [];

// Loop through network interfaces
for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    // Filter IPv4 addresses that are not internal (localhost)
    if (iface.family === 'IPv4' && !iface.internal) {
      ipAddresses.push({ name: interfaceName, address: iface.address });
    }
  }
}

// Get MAC addresses
const macAddresses = [];
for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    // Avoid internal interfaces and duplicates
    if (!iface.internal && iface.mac !== '00:00:00:00:00:00') {
      macAddresses.push({ name: interfaceName, mac: iface.mac });
    }
  }
}

// Print results
console.log('IP Addresses:', ipAddresses);
console.log('MAC Addresses:', macAddresses);
