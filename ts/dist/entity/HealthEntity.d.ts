import { IncidentlensAmdEntityBase } from '../IncidentlensAmdEntityBase';
import type { IncidentlensAmdSDK } from '../IncidentlensAmdSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../IncidentlensAmdTypes';
declare class HealthEntity extends IncidentlensAmdEntityBase<Health> {
    constructor(client: IncidentlensAmdSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
