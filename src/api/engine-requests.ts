import type { Drive, Engine } from '@/types/api';
import { isDrive, isEngine } from '@/types/guards';
import type { EngineStatus } from '@/types/types';
import { Paths } from '@/types/types';

import { ApiRequest } from './requests';

export class EngineRequests extends ApiRequest {
  constructor() {
    super();
  }

  public async startStopEngine(
    id: number,
    status: EngineStatus,
    signal?: AbortSignal
  ): Promise<Engine> {
    return this.patch(`${Paths.Engine}?id=${id}&status=${status}`, {}, isEngine, signal);
  }

  public async switchEngine(id: number, signal?: AbortSignal): Promise<Drive> {
    return this.patch(`${Paths.Engine}?id=${id}&status=drive`, {}, isDrive, signal);
  }
}
