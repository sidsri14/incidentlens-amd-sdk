import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { IncidentlensAmdSDK } = require('../ts/dist/IncidentlensAmdSDK.js');

const client = new IncidentlensAmdSDK();

const health = await client.Health().load();
assert.equal(health.data().status, 'ok');
assert.equal(health.data().service, 'incidentlens-amd');

const presets = await client.Preset().list();
assert.equal(presets.length, 3);
assert.ok(presets.every((preset) => preset.data().events.length > 0));

const analysis = await client.Analyze().create({ presetId: 'retry-storm' });
assert.equal(analysis.data().success, true);
assert.equal(analysis.data().citationVerification.valid, true);
assert.equal(analysis.data().telemetry.overallSeverity, 'HIGH');

let invalidStatus;
try {
  await client.Analyze().create({});
} catch (error) {
  invalidStatus = error.status;
}
assert.equal(invalidStatus, 400);

console.log(JSON.stringify({
  health: health.data().status,
  presetCount: presets.length,
  analysisSuccess: analysis.data().success,
  citationsValid: analysis.data().citationVerification.valid,
  invalidRequestStatus: invalidStatus,
}, null, 2));
