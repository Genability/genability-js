import { 
  Territory,
  UsageType,
  CenterPoint,
  isTerritory,
  TerritoryItem,
  TerritoryLse,
  ItemType
} from './territory';

describe("Territory types", () => {
  it("works for UsageType", () => {
    const territory: Territory = JSON.parse('{"territoryId": 1,"usageType": "CLIMATE_ZONE"}');
    expect(territory.territoryId).toEqual(1);
    expect(territory.usageType).toEqual(UsageType.CLIMATE_ZONE);
  })
  it("works for ItemType", () => {
    const territory: Territory = JSON.parse('{"territoryId": 1,"itemTypes": ["STATE","CITY"]}');
    expect(territory.territoryId).toEqual(1);
    expect(territory.itemTypes).toEqual([ItemType.STATE, ItemType.CITY]);
  })
  it("works for CenterPoint", () => {
    const centerPoint: CenterPoint = JSON.parse('{"latitude": 38.81323759210526,"longitude": -121.25965298684213}');
    expect(centerPoint).toHaveProperty('latitude', 38.81323759210526);
    expect(centerPoint).toHaveProperty('longitude', -121.25965298684213);
  })
  it("works for TerritoryLse", () => {
    const territoryLseJson = '{\
      "territoryId": 1,\
      "lseId": 2\
      }';
    const territoryLse: TerritoryLse = JSON.parse(territoryLseJson);
    expect(territoryLse.territoryId).toEqual(1);
    expect(territoryLse.lseId).toEqual(2);
  })
  it("works for TerritoryItem", () => {
    const territoryItemJson = '{\
      "territoryItemId": 1,\
      "territoryType": "type"\
      }';
    const territoryItem: TerritoryItem = JSON.parse(territoryItemJson);
    expect(territoryItem.territoryItemId).toEqual(1);
    expect(territoryItem.territoryType).toEqual('type');
  })
  it("works for Territory", () => {
    const territoryJson = '{\
      "territoryId": 1,\
      "territoryName": "territoryName"\
      }';
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual('territoryName');
  })
  it("works for empty TerritoryItems", () => {
    const territoryJson = '{\
      "territoryId": 1,\
      "territoryName": "territoryName",\
      "lseId": 2,\
      "lseName": "lseName",\
      "items": []\
      }';
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual('territoryName');
    expect(territory.items).toEqual([]);
    expect(isTerritory(territory)).toEqual(true);
  })
  it("works for empty TerritoryLses", () => {
    const territoryJson = '{\
      "territoryId": 1,\
      "territoryName": "territoryName",\
      "lseId": 2,\
      "lseName": "lseName",\
      "territoryLses": []\
      }';
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual('territoryName');
    expect(territory.territoryLses).toEqual([]);
    expect(isTerritory(territory)).toEqual(true);
  })
  it("works for TerritoryLses", () => {
    const territoryLseJson = '{\
        "territoryId": 1,\
        "lseId": 2\
      }'
    const territoryJson = `{\
      "territoryId": 1,\
      "territoryName": "territoryName",\
      "lseId": 2,\
      "lseName": "lseName",\
      "territoryLses": [${territoryLseJson}]\
      }`;
    const territoryLse: TerritoryLse = JSON.parse(territoryLseJson);
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual('territoryName');
    expect(territory.lseName).toEqual('lseName');
    expect(territory.territoryLses).toEqual([territoryLse])
    expect(isTerritory(territory)).toEqual(true);
  })
  it("works for TerritoryItems", () => {
    const territoryItemJson = '{\
        "territoryItemId": 1,\
        "territoryType": "type"\
      }'
    const territoryJson = `{\
      "territoryId": 1,\
      "territoryName": "territoryName",\
      "lseId": 2,\
      "lseName": "lseName",\
      "items": [${territoryItemJson}]\
      }`;
    const territoryItem: TerritoryItem = JSON.parse(territoryItemJson);
    const territory: Territory = JSON.parse(territoryJson);
    expect(territory.territoryId).toEqual(1);
    expect(territory.territoryName).toEqual('territoryName');
    expect(territory.lseName).toEqual('lseName');
    expect(territory.items).toEqual([territoryItem])
    expect(isTerritory(territory)).toEqual(true);
  })
});
