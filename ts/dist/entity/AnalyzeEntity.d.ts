import { IncidentlensAmdEntityBase } from '../IncidentlensAmdEntityBase';
import type { IncidentlensAmdSDK } from '../IncidentlensAmdSDK';
import type { Control } from '../types';
import type { Analyze, AnalyzeCreateData } from '../IncidentlensAmdTypes';
declare class AnalyzeEntity extends IncidentlensAmdEntityBase<Analyze> {
    constructor(client: IncidentlensAmdSDK, entopts: any);
    make(this: AnalyzeEntity): AnalyzeEntity;
    create(this: any, reqdata?: AnalyzeCreateData, ctrl?: Control): Promise<AnalyzeEntity>;
}
export { AnalyzeEntity };
