import type { FunctionReturnType } from 'convex/server';
import type { api } from '../_generated/api';

export type HistoryData = FunctionReturnType<typeof api.history.get>;

export type HistoryDataItem = HistoryData[number];
