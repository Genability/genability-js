export enum PredominanceRule {
  PREDOMINANT = "PREDOMINANT",
  SUBSERVIENT = "SUBSERVIENT"
}

export interface Season {
  seasonId: number;
  lseId?: number;
  seasonGroupId?: number;
  seasonName?: string;
  seasonFromMonth?: number;
  seasonFromDay?: number;
  fromEdgePredominance?: PredominanceRule;
  seasonToMonth?: number;
  seasonToDay?: number;
  toEdgePredominance?: PredominanceRule;
}

export interface SeasonGroup {
  seasonGroupId: number;
  seasons?: Season[];
}

/**
 * User Defined Type Guard for SeasonGroup, Season
 */
export function isSeasonGroup(arg: SeasonGroup): arg is SeasonGroup {
  return arg.seasonGroupId !== undefined;
}

export function isSeason(arg: Season): arg is Season {
  return arg.seasonId !== undefined
}
