"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "analyze",
        "accessor": "Analyze",
        "op": "create",
        "method": "POST",
        "path": "/api/analyze",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "telemetry": {
                "totalEvents": 1,
                "durationMs": 1,
                "isStreaming": true,
                "hasDoneMarker": true,
                "chunkCount": 1,
                "totalTokens": 1,
                "timeToFirstTokenMs": 1,
                "avgChunkLatencyMs": 1,
                "maxChunkLatencyMs": 1,
                "anomalyCount": 1,
                "overallSeverity": "x"
            },
            "timeline": [
                {
                    "id": "x",
                    "timestamp": 1,
                    "type": "x",
                    "method": "x",
                    "route": "x",
                    "model": "x",
                    "streaming": true,
                    "statusCode": 1,
                    "chunkIndex": 1,
                    "tokenCount": 1,
                    "latencyMs": 1,
                    "isDoneMarker": true,
                    "attempt": 1,
                    "backoffMs": 1,
                    "reason": "x",
                    "error": "x",
                    "action": "x",
                    "targetKey": "x"
                }
            ],
            "anomalies": [
                {
                    "type": "x",
                    "eventId": "x",
                    "severity": "x",
                    "detail": "x",
                    "timestamp": 1
                }
            ],
            "evidence": [
                {
                    "id": "x",
                    "timestamp": 1,
                    "type": "x",
                    "summary": "x",
                    "raw": {
                        "id": "x",
                        "timestamp": 1,
                        "type": "x",
                        "method": "x",
                        "route": "x",
                        "model": "x",
                        "streaming": true,
                        "statusCode": 1,
                        "chunkIndex": 1,
                        "tokenCount": 1,
                        "latencyMs": 1,
                        "isDoneMarker": true,
                        "attempt": 1,
                        "backoffMs": 1,
                        "reason": "x",
                        "error": "x",
                        "action": "x",
                        "targetKey": "x"
                    }
                }
            ],
            "analysis": {
                "content": "x",
                "model": "x",
                "provider": "x",
                "simulated": true
            },
            "citationVerification": {
                "valid": true,
                "failureReason": "x",
                "totalCitations": 1,
                "uniqueValidCitations": [
                    "x"
                ],
                "invalidCitations": [
                    "x"
                ],
                "claimCount": 1,
                "uncitedClaims": [
                    "x"
                ],
                "wordCount": 1,
                "citationDensity": 1
            },
            "rocmPerformance": {
                "inferenceLatencyMs": 1,
                "deterministicParseMs": 1,
                "totalLatencyMs": 1,
                "usage": {
                    "prompt_tokens": 1,
                    "completion_tokens": 1,
                    "total_tokens": 1
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "health",
        "accessor": "Health",
        "op": "load",
        "method": "GET",
        "path": "/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": "ok",
            "service": "incidentlens-amd",
            "inferenceMode": "amd-tokenfactory",
            "amdConfigured": true,
            "amdModel": "x"
        },
        "idField": "id"
    },
    {
        "entity": "preset",
        "accessor": "Preset",
        "op": "list",
        "method": "GET",
        "path": "/api/presets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "presets": [
                {
                    "id": "x",
                    "title": "x",
                    "description": "x",
                    "events": [
                        {
                            "id": "x",
                            "timestamp": 1,
                            "type": "x",
                            "method": "x",
                            "route": "x",
                            "model": "x",
                            "streaming": true,
                            "statusCode": 1,
                            "chunkIndex": 1,
                            "tokenCount": 1,
                            "latencyMs": 1,
                            "isDoneMarker": true,
                            "attempt": 1,
                            "backoffMs": 1,
                            "reason": "x",
                            "error": "x",
                            "action": "x",
                            "targetKey": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map