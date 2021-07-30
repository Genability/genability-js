import { 
  PriceChange,
  Price,
  isPriceChange,
  isPrice
} from './smart-price';
import { DetailLevel } from '../types/on-demand-cost-calculation';

const priceChangeJson = '{\
  "name":"Winter Off-Peak consumption charges",\
  "fromDateTime":"2013-02-15T18:04:16+00:00",\
  "toDateTime":"2013-02-16T06:00:00+00:00",\
  "rateAmount":0.071400,\
  "rateMeanDelta":-0.011900\
  }';

const priceJson = '{\
  "description":"Energy Star - Residential Refrigerators",\
  "masterTariffId":3156186,\
  "fromDateTime":"2013-02-15T18:04:16+00:00",\
  "toDateTime":"2013-02-18T18:04:16+00:00",\
  "detailLevel":"TOTAL",\
  "currency":"USD",\
  "rateMean":0.083300,\
  "rateStandardDeviation":0.039975\
}';

describe("Smart Price types", () => {
  it("works for Price Change Type", () => {
    const priceChange: PriceChange = JSON.parse(priceChangeJson);
    expect(priceChange.name).toEqual("Winter Off-Peak consumption charges");
    expect(priceChange.fromDateTime).toEqual("2013-02-15T18:04:16+00:00");
    expect(priceChange.toDateTime).toEqual("2013-02-16T06:00:00+00:00");
    expect(priceChange.rateAmount).toEqual(0.071400);
    expect(priceChange.rateMeanDelta).toEqual(-0.011900);
  })
  it("works for Price Type", () => {
    const price: Price = JSON.parse(priceJson);
    expect(price.description).toEqual("Energy Star - Residential Refrigerators");
    expect(price.masterTariffId).toEqual(3156186);
    expect(price.fromDateTime).toEqual("2013-02-15T18:04:16+00:00");
    expect(price.toDateTime).toEqual("2013-02-18T18:04:16+00:00");
    expect(price.currency).toEqual("USD");
    expect(price.detailLevel).toEqual(DetailLevel.TOTAL);
    expect(price.rateMean).toEqual(0.083300);
    expect(price.rateStandardDeviation).toEqual(0.039975);
  })
});
describe("Type Guard", () => {
  it("works for isPriceChange", () => {
    const priceChange: PriceChange = JSON.parse(priceChangeJson);
    expect(priceChange.name).toEqual("Winter Off-Peak consumption charges");
    expect(isPriceChange(priceChange)).toBeTruthy();
  });
  it("works for isPrice", () => {
    const price: Price = JSON.parse(priceJson);
    expect(price.description).toEqual("Energy Star - Residential Refrigerators");
    expect(isPrice(price)).toBeTruthy();
  });
});
