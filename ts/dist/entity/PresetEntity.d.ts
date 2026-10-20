import { IncidentlensAmdEntityBase } from '../IncidentlensAmdEntityBase';
import type { IncidentlensAmdSDK } from '../IncidentlensAmdSDK';
import type { Control } from '../types';
import type { Preset, PresetListMatch } from '../IncidentlensAmdTypes';
declare class PresetEntity extends IncidentlensAmdEntityBase<Preset> {
    constructor(client: IncidentlensAmdSDK, entopts: any);
    make(this: PresetEntity): PresetEntity;
    list(this: any, reqmatch?: PresetListMatch, ctrl?: Control): Promise<PresetEntity[]>;
}
export { PresetEntity };
