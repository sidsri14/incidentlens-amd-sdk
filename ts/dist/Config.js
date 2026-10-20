"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'IncidentlensAmd',
        slug: "incidentlens-amd",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://incidentlens-amd.vercel.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            analyze: {},
            health: {},
            preset: {},
        }
    };
    entity = {
        "analyze": {
            "fields": [
                {
                    "name": "analysis",
                    "title": "Analysis",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "anomalies",
                    "title": "Anomalies",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "citationVerification",
                    "title": "Citation Verification",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "events",
                    "title": "Events",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "evidence",
                    "title": "Evidence",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "model",
                    "title": "Model",
                    "type": "`$STRING`",
                    "short": "Optional AMD TokenFactory model override when the backend is configured."
                },
                {
                    "name": "presetId",
                    "title": "Preset Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "rocmPerformance",
                    "title": "Rocm Performance",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "success",
                    "title": "Success",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "telemetry",
                    "title": "Telemetry",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "timeline",
                    "title": "Timeline",
                    "type": "`$ARRAY`",
                    "req": true
                }
            ],
            "name": "analyze",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/analyze",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "analyze"
                                }
                            ],
                            "parts": [
                                "api",
                                "analyze"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "health": {
            "fields": [
                {
                    "name": "amdConfigured",
                    "title": "Amd Configured",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "amdModel",
                    "title": "Amd Model",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "inferenceMode",
                    "title": "Inference Mode",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "service",
                    "title": "Service",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "health",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "parts": [
                                "health"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "preset": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "events",
                    "title": "Events",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "preset",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/presets",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "presets"
                                }
                            ],
                            "parts": [
                                "api",
                                "presets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.presets`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map