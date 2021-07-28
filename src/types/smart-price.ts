export interface PriceChange {
  name: string;
  fromDateTime: string;
  toDateTime: string;
  rateAmount: number;
  rateMeanDelta: number;
}

export interface Price {
  description: string;
  masterTariffId: number;
  fromDateTime: string;
  toDateTime: string;
  detailLevel: string;
  currency: string;
  rateMean: number;
  rateStandardDeviation: number;
  priceChanges: PriceChange[];
}

/**
 * User Defined Type Guard for Price
 */
export function isPrice(arg: Price): arg is Price {
  return arg.description !== undefined &&
    arg.masterTariffId !== undefined &&
    arg.fromDateTime !== undefined &&
    arg.toDateTime !== undefined &&
    arg.detailLevel !== undefined &&
    arg.currency !== undefined &&
    arg.rateMean !== undefined &&
    arg.rateStandardDeviation !== undefined
}

/**
 * User Defined Type Guard for PriceChange
 */
export function isPriceChange(arg: PriceChange): arg is PriceChange {
  return arg.name !== undefined &&
        arg.fromDateTime !== undefined &&
        arg.toDateTime !== undefined &&
        arg.rateAmount !== undefined &&
        arg.rateMeanDelta !== undefined;
}
