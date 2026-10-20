

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IncidentlensAmdSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AnalyzeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when INCIDENTLENS_AMD_TEST_LIVE=TRUE.
  afterEach(liveDelay('INCIDENTLENS_AMD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IncidentlensAmdSDK.test()
    const ent = testsdk.Analyze()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IncidentlensAmdSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Analyze().create({"model":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.INCIDENTLENS_AMD_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'analyze.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"analysis":{"a":true,"h":"Analysis","n":"analysis","r":true,"t":"`$OBJECT`","key$":"analysis","index$":0},"anomalies":{"a":true,"h":"Anomalies","n":"anomalies","r":true,"t":"`$ARRAY`","key$":"anomalies","index$":1},"citationVerification":{"a":true,"h":"Citation Verification","n":"citationVerification","r":true,"t":"`$OBJECT`","key$":"citationVerification","index$":2},"events":{"a":true,"h":"Events","n":"events","r":false,"t":"`$ARRAY`","key$":"events","index$":3},"evidence":{"a":true,"h":"Evidence","n":"evidence","r":true,"t":"`$ARRAY`","key$":"evidence","index$":4},"model":{"a":true,"h":"Model","n":"model","r":false,"sh":"Optional AMD TokenFactory model override when the backend is configured.","t":"`$STRING`","key$":"model","index$":5},"presetId":{"a":true,"h":"Preset Id","n":"presetId","r":false,"t":"`$STRING`","key$":"presetId","index$":6},"rocmPerformance":{"a":true,"h":"Rocm Performance","n":"rocmPerformance","r":true,"t":"`$OBJECT`","key$":"rocmPerformance","index$":7},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":8},"telemetry":{"a":true,"h":"Telemetry","n":"telemetry","r":true,"t":"`$OBJECT`","key$":"telemetry","index$":9},"timeline":{"a":true,"h":"Timeline","n":"timeline","r":true,"t":"`$ARRAY`","key$":"timeline","index$":10}},"name":"analyze","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["events","model","presetId"],"co":{"id":"POST /api/analyze","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/analyze","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"analyze"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"analyze","name__orig":"analyze","Name":"Analyze","name_":"analyze","name-":"analyze","NAME":"ANALYZE","index$":0}, {"active":true,"entity":"analyze","key$":"BasicAnalyzeFlow","kind":"basic","name":"BasicAnalyzeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"analyze_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Analyze', {"POST /api/analyze":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Supply either a non-empty events array or a valid presetId.","properties":{"presetId":{"type":"string","enum":["premature-disconnect","retry-storm","cache-poisoning"],"key$":"presetId"},"events":{"type":"array","minItems":1,"items":{"type":"object","required":["id","timestamp","type"],"additionalProperties":true,"properties":{"id":{"type":"string","pattern":"^EVT-[0-9]{3,}$"},"timestamp":{"type":"integer","minimum":0},"type":{"type":"string"},"method":{"type":"string"},"route":{"type":"string"},"model":{"type":"string"},"streaming":{"type":"boolean"},"statusCode":{"type":"integer"},"chunkIndex":{"type":"integer"},"tokenCount":{"type":"integer"},"latencyMs":{"type":"integer"},"isDoneMarker":{"type":"boolean"},"attempt":{"type":"integer"},"backoffMs":{"type":"integer"},"reason":{"type":"string"},"error":{"type":"string"},"action":{"type":"string"},"targetKey":{"type":"string"}},"x-ref":"#/components/schemas/TraceEvent"},"key$":"events"},"model":{"type":"string","description":"Optional AMD TokenFactory model override when the backend is configured.","key$":"model"}},"x-ref":"#/components/schemas/AnalyzeRequest","index$":1},"examples":{"preset":{"value":{"presetId":"retry-storm"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const analyze_ref01_ent = client.Analyze()
    let analyze_ref01_data = setup.data.new.analyze['analyze_ref01']

    analyze_ref01_data = (await analyze_ref01_ent.create(analyze_ref01_data)).data()
    assert(null != analyze_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/analyze/AnalyzeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IncidentlensAmdSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['analyze01','analyze02','analyze03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'INCIDENTLENS_AMD_TEST_ANALYZE_ENTID': idmap,
    'INCIDENTLENS_AMD_TEST_LIVE': 'FALSE',
    'INCIDENTLENS_AMD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['INCIDENTLENS_AMD_TEST_ANALYZE_ENTID']

  const live = 'TRUE' === env.INCIDENTLENS_AMD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['INCIDENTLENS_AMD_TEST_ANALYZE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IncidentlensAmdSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.INCIDENTLENS_AMD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
