import { getGraphClient } from '../lib/microsoft-graph';

async function findOneDriveInfo() {
  const client = await getGraphClient();
  
  // Get all drives
  const drives = await client.api('/drives').get();
  console.log('Available drives:', JSON.stringify(drives, null, 2));
  
  // Replace with your drive ID
  const driveId = drives.value[0].id;
  
  // Get root folder
  const root = await client.api(`/drives/${driveId}/root/children`).get();
  console.log('Root folders:', JSON.stringify(root, null, 2));
}

findOneDriveInfo();