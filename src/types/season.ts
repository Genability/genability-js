export enum SeasonName {
  SUMMER = 'Summer',
  WINTER = 'Winter'
}

export interface Season {
  seasonId: number;
  lseId: number;
  seasonGroupId: number;
  seasonName: SeasonName;
  seasonFromMonth: number;
  seasonFromDay: number;
  fromEdgePredominance: string;
  seasonToMonth: number;
  seasonToDay: number;
  toEdgePredominance: string;
}

export interface SeasonGroup {
  seasonGroupId: number;
  seasons: Season[];
}

/**
 * User Defined Type Guard for SeasonGroup
 */
export function isSeasonGroup(arg: SeasonGroup): arg is SeasonGroup {
  return arg.seasonGroupId !== undefined;
}
