// Typed models for the IncidentlensAmd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Analyze {
  analysis: Record<string, any>
  anomalies: any[]
  citationVerification: Record<string, any>
  events?: any[]
  evidence: any[]
  model?: string
  presetId?: string
  rocmPerformance: Record<string, any>
  success: boolean
  telemetry: Record<string, any>
  timeline: any[]
}

export interface AnalyzeCreateData {
  events?: any[]
  model?: string
  presetId?: string
}

export interface Health {
  amdConfigured: boolean
  amdModel: string
  inferenceMode: string
  service: string
  status: string
}

export interface HealthLoadMatch {
  amdConfigured?: boolean
  amdModel?: string
  inferenceMode?: string
  service?: string
  status?: string
}

export interface Preset {
  description: string
  events: any[]
  id: string
  title: string
}

export interface PresetListMatch {
  description?: string
  events?: any[]
  id?: string
  title?: string
}

