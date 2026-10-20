import { AnalyzeEntity } from './entity/AnalyzeEntity';
import { HealthEntity } from './entity/HealthEntity';
import { PresetEntity } from './entity/PresetEntity';
export type * from './IncidentlensAmdTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IncidentlensAmdEntityBase } from './IncidentlensAmdEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class IncidentlensAmdSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Analyze(entopts?: Record<string, any>): AnalyzeEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    Preset(entopts?: Record<string, any>): PresetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IncidentlensAmdSDK;
    tester(testopts?: any, sdkopts?: any): IncidentlensAmdSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IncidentlensAmdSDK;
export { stdutil, config, BaseFeature, IncidentlensAmdEntityBase, IncidentlensAmdSDK, SDK, };
export type { DirectResult };
