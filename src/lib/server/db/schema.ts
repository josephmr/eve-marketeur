import {
  pgTable,
  pgSchema,
  integer,
  varchar,
  index,
  boolean,
  text,
  doublePrecision,
  char,
  numeric,
  real,
  serial,
  uniqueIndex,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";

export const evesde = pgSchema("evesde");
export const app = pgSchema("app");

export const invTraitsTraitIDSeq = evesde.sequence("invTraits_traitID_seq", {
  startWith: "1",
  increment: "1",
  minValue: "1",
  maxValue: "2147483647",
  cache: "1",
  cycle: false,
});

export const agtAgentTypes = evesde.table("agtAgentTypes", {
  agentTypeID: integer().primaryKey().notNull(),
  agentType: varchar({ length: 50 }),
});

export const agtAgents = evesde.table(
  "agtAgents",
  {
    agentID: integer().primaryKey().notNull(),
    divisionID: integer(),
    corporationID: integer(),
    locationID: integer(),
    level: integer(),
    quality: integer(),
    agentTypeID: integer(),
    isLocator: boolean(),
  },
  (table) => [
    index("ix_evesde_agtAgents_corporationID").using(
      "btree",
      table.corporationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_agtAgents_locationID").using(
      "btree",
      table.locationID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const agtAgentsInSpace = evesde.table(
  "agtAgentsInSpace",
  {
    agentID: integer().primaryKey().notNull(),
    dungeonID: integer(),
    solarSystemID: integer(),
    spawnPointID: integer(),
    typeID: integer(),
  },
  (table) => [
    index("ix_evesde_agtAgentsInSpace_solarSystemID").using(
      "btree",
      table.solarSystemID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const certCerts = evesde.table("certCerts", {
  certID: integer().primaryKey().notNull(),
  description: text(),
  groupID: integer(),
  name: varchar({ length: 255 }),
});

export const certMasteries = evesde.table("certMasteries", {
  typeID: integer(),
  masteryLevel: integer(),
  certID: integer(),
});

export const certSkills = evesde.table(
  "certSkills",
  {
    certID: integer(),
    skillID: integer(),
    certLevelInt: integer(),
    skillLevel: integer(),
    certLevelText: varchar({ length: 8 }),
  },
  (table) => [
    index("ix_evesde_certSkills_skillID").using(
      "btree",
      table.skillID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const chrAncestries = evesde.table("chrAncestries", {
  ancestryID: integer().primaryKey().notNull(),
  ancestryName: varchar({ length: 100 }),
  bloodlineID: integer(),
  description: varchar({ length: 1000 }),
  perception: integer(),
  willpower: integer(),
  charisma: integer(),
  memory: integer(),
  intelligence: integer(),
  iconID: integer(),
  shortDescription: varchar({ length: 500 }),
});

export const chrAttributes = evesde.table("chrAttributes", {
  attributeID: integer().primaryKey().notNull(),
  attributeName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  iconID: integer(),
  shortDescription: varchar({ length: 500 }),
  notes: varchar({ length: 500 }),
});

export const chrBloodlines = evesde.table("chrBloodlines", {
  bloodlineID: integer().primaryKey().notNull(),
  bloodlineName: varchar({ length: 100 }),
  raceID: integer(),
  description: varchar({ length: 1000 }),
  maleDescription: varchar({ length: 1000 }),
  femaleDescription: varchar({ length: 1000 }),
  shipTypeID: integer(),
  corporationID: integer(),
  perception: integer(),
  willpower: integer(),
  charisma: integer(),
  memory: integer(),
  intelligence: integer(),
  iconID: integer(),
  shortDescription: varchar({ length: 500 }),
  shortMaleDescription: varchar({ length: 500 }),
  shortFemaleDescription: varchar({ length: 500 }),
});

export const chrFactions = evesde.table("chrFactions", {
  factionID: integer().primaryKey().notNull(),
  factionName: varchar({ length: 100 }),
  description: varchar({ length: 2000 }),
  raceIDs: integer(),
  solarSystemID: integer(),
  corporationID: integer(),
  sizeFactor: doublePrecision(),
  stationCount: integer(),
  stationSystemCount: integer(),
  militiaCorporationID: integer(),
  iconID: integer(),
});

export const chrRaces = evesde.table("chrRaces", {
  raceID: integer().primaryKey().notNull(),
  raceName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  iconID: integer(),
  shortDescription: varchar({ length: 500 }),
});

export const crpActivities = evesde.table("crpActivities", {
  activityID: integer().primaryKey().notNull(),
  activityName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
});

export const crpNpcCorporations = evesde.table("crpNPCCorporations", {
  corporationID: integer().primaryKey().notNull(),
  size: char({ length: 1 }),
  extent: char({ length: 1 }),
  solarSystemID: integer(),
  investorID1: integer(),
  investorShares1: integer(),
  investorID2: integer(),
  investorShares2: integer(),
  investorID3: integer(),
  investorShares3: integer(),
  investorID4: integer(),
  investorShares4: integer(),
  friendID: integer(),
  enemyID: integer(),
  publicShares: integer(),
  initialPrice: integer(),
  minSecurity: doublePrecision(),
  scattered: boolean(),
  fringe: integer(),
  corridor: integer(),
  hub: integer(),
  border: integer(),
  factionID: integer(),
  sizeFactor: doublePrecision(),
  stationCount: integer(),
  stationSystemCount: integer(),
  description: varchar({ length: 4000 }),
  iconID: integer(),
});

export const crpNpcDivisions = evesde.table("crpNPCDivisions", {
  divisionID: integer().primaryKey().notNull(),
  divisionName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  leaderType: varchar({ length: 100 }),
});

export const dgmAttributeCategories = evesde.table("dgmAttributeCategories", {
  categoryID: integer().primaryKey().notNull(),
  categoryName: varchar({ length: 50 }),
  categoryDescription: varchar({ length: 200 }),
});

export const dgmAttributeTypes = evesde.table("dgmAttributeTypes", {
  attributeID: integer().primaryKey().notNull(),
  attributeName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  iconID: integer(),
  defaultValue: doublePrecision(),
  published: boolean(),
  displayName: varchar({ length: 150 }),
  unitID: integer(),
  stackable: boolean(),
  highIsGood: boolean(),
  categoryID: integer(),
});

export const dgmEffects = evesde.table("dgmEffects", {
  effectID: integer().primaryKey().notNull(),
  effectName: varchar({ length: 400 }),
  effectCategory: integer(),
  preExpression: integer(),
  postExpression: integer(),
  description: varchar({ length: 1000 }),
  guid: varchar({ length: 60 }),
  iconID: integer(),
  isOffensive: boolean(),
  isAssistance: boolean(),
  durationAttributeID: integer(),
  trackingSpeedAttributeID: integer(),
  dischargeAttributeID: integer(),
  rangeAttributeID: integer(),
  falloffAttributeID: integer(),
  disallowAutoRepeat: boolean(),
  published: boolean(),
  displayName: varchar({ length: 100 }),
  isWarpSafe: boolean(),
  rangeChance: boolean(),
  electronicChance: boolean(),
  propulsionChance: boolean(),
  distribution: integer(),
  sfxName: varchar({ length: 20 }),
  npcUsageChanceAttributeID: integer(),
  npcActivationChanceAttributeID: integer(),
  fittingUsageChanceAttributeID: integer(),
  modifierInfo: text(),
});

export const dgmExpressions = evesde.table("dgmExpressions", {
  expressionID: integer().primaryKey().notNull(),
  operandID: integer(),
  arg1: integer(),
  arg2: integer(),
  expressionValue: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  expressionName: varchar({ length: 500 }),
  expressionTypeID: integer(),
  expressionGroupID: integer(),
  expressionAttributeID: integer(),
});

export const eveGraphics = evesde.table("eveGraphics", {
  graphicID: integer().primaryKey().notNull(),
  sofFactionName: varchar({ length: 100 }),
  graphicFile: varchar({ length: 256 }),
  sofHullName: varchar({ length: 100 }),
  sofRaceName: varchar({ length: 100 }),
  description: text(),
});

export const eveIcons = evesde.table("eveIcons", {
  iconID: integer().primaryKey().notNull(),
  iconFile: varchar({ length: 500 }),
  description: text(),
});

export const eveUnits = evesde.table("eveUnits", {
  unitID: integer().primaryKey().notNull(),
  unitName: varchar({ length: 100 }),
  displayName: varchar({ length: 50 }),
  description: varchar({ length: 1000 }),
});

export const industryActivityMaterials = evesde.table(
  "industryActivityMaterials",
  {
    typeID: integer(),
    activityID: integer(),
    materialTypeID: integer(),
    quantity: integer(),
  },
  (table) => [
    index("industryActivityMaterials_idx1").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops"),
      table.activityID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivityMaterials_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const industryActivityProbabilities = evesde.table(
  "industryActivityProbabilities",
  {
    typeID: integer(),
    activityID: integer(),
    productTypeID: integer(),
    probability: numeric({ precision: 3, scale: 2 }),
  },
  (table) => [
    index("ix_evesde_industryActivityProbabilities_productTypeID").using(
      "btree",
      table.productTypeID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivityProbabilities_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const industryActivityProducts = evesde.table(
  "industryActivityProducts",
  {
    typeID: integer(),
    activityID: integer(),
    productTypeID: integer(),
    quantity: integer(),
  },
  (table) => [
    index("ix_evesde_industryActivityProducts_productTypeID").using(
      "btree",
      table.productTypeID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivityProducts_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const industryActivityRaces = evesde.table(
  "industryActivityRaces",
  {
    typeID: integer(),
    activityID: integer(),
    productTypeID: integer(),
    raceID: integer(),
  },
  (table) => [
    index("ix_evesde_industryActivityRaces_productTypeID").using(
      "btree",
      table.productTypeID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivityRaces_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const industryActivitySkills = evesde.table(
  "industryActivitySkills",
  {
    typeID: integer(),
    activityID: integer(),
    skillID: integer(),
    level: integer(),
  },
  (table) => [
    index("industryActivitySkills_idx1").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops"),
      table.activityID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivitySkills_skillID").using(
      "btree",
      table.skillID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_industryActivitySkills_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const industryBlueprints = evesde.table("industryBlueprints", {
  typeID: integer().primaryKey().notNull(),
  maxProductionLimit: integer(),
});

export const invCategories = evesde.table("invCategories", {
  categoryID: integer().primaryKey().notNull(),
  categoryName: varchar({ length: 100 }),
  iconID: integer(),
  published: boolean(),
});

export const invControlTowerResourcePurposes = evesde.table(
  "invControlTowerResourcePurposes",
  {
    purpose: integer().primaryKey().notNull(),
    purposeText: varchar({ length: 100 }),
  }
);

export const invFlags = evesde.table("invFlags", {
  flagID: integer().primaryKey().notNull(),
  flagName: varchar({ length: 200 }),
  flagText: varchar({ length: 100 }),
  orderID: integer(),
});

export const invGroups = evesde.table(
  "invGroups",
  {
    groupID: integer().primaryKey().notNull(),
    categoryID: integer(),
    groupName: varchar({ length: 100 }),
    iconID: integer(),
    useBasePrice: boolean(),
    anchored: boolean(),
    anchorable: boolean(),
    fittableNonSingleton: boolean(),
    published: boolean(),
  },
  (table) => [
    index("ix_evesde_invGroups_categoryID").using(
      "btree",
      table.categoryID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const invItems = evesde.table(
  "invItems",
  {
    itemID: integer().primaryKey().notNull(),
    typeID: integer().notNull(),
    ownerID: integer().notNull(),
    locationID: integer().notNull(),
    flagID: integer().notNull(),
    quantity: integer().notNull(),
  },
  (table) => [
    index("items_IX_OwnerLocation").using(
      "btree",
      table.ownerID.asc().nullsLast().op("int4_ops"),
      table.locationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_invItems_locationID").using(
      "btree",
      table.locationID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const invMarketGroups = evesde.table("invMarketGroups", {
  marketGroupID: integer().primaryKey().notNull(),
  parentGroupID: integer(),
  marketGroupName: varchar({ length: 100 }),
  description: varchar({ length: 3000 }),
  iconID: integer(),
  hasTypes: boolean(),
});

export const invMetaGroups = evesde.table("invMetaGroups", {
  metaGroupID: integer().primaryKey().notNull(),
  metaGroupName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  iconID: integer(),
});

export const invMetaTypes = evesde.table("invMetaTypes", {
  typeID: integer().primaryKey().notNull(),
  parentTypeID: integer(),
  metaGroupID: integer(),
});

export const invNames = evesde.table("invNames", {
  itemID: integer().primaryKey().notNull(),
  itemName: varchar({ length: 200 }).notNull(),
});

export const invPositions = evesde.table("invPositions", {
  itemID: integer().primaryKey().notNull(),
  x: doublePrecision().notNull(),
  y: doublePrecision().notNull(),
  z: doublePrecision().notNull(),
  yaw: real(),
  pitch: real(),
  roll: real(),
});

export const invTraits = evesde.table("invTraits", {
  traitID: serial().primaryKey().notNull(),
  typeID: integer(),
  skillID: integer(),
  bonus: doublePrecision(),
  bonusText: text(),
  unitID: integer(),
});

export const invTypes = evesde.table(
  "invTypes",
  {
    typeID: integer().primaryKey().notNull(),
    groupID: integer(),
    typeName: varchar({ length: 100 }),
    description: text(),
    mass: doublePrecision(),
    volume: doublePrecision(),
    capacity: doublePrecision(),
    portionSize: integer(),
    raceID: integer(),
    basePrice: numeric({ precision: 19, scale: 4 }),
    published: boolean(),
    marketGroupID: integer(),
    iconID: integer(),
    soundID: integer(),
    graphicID: integer(),
  },
  (table) => [
    index("ix_evesde_invTypes_groupID").using(
      "btree",
      table.groupID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const invUniqueNames = evesde.table(
  "invUniqueNames",
  {
    itemID: integer().primaryKey().notNull(),
    itemName: varchar({ length: 200 }).notNull(),
    groupID: integer(),
  },
  (table) => [
    index("invUniqueNames_IX_GroupName").using(
      "btree",
      table.groupID.asc().nullsLast().op("int4_ops"),
      table.itemName.asc().nullsLast().op("int4_ops")
    ),
    uniqueIndex("ix_evesde_invUniqueNames_itemName").using(
      "btree",
      table.itemName.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const invVolumes = evesde.table("invVolumes", {
  typeID: integer().primaryKey().notNull(),
  volume: integer(),
});

export const mapCelestialGraphics = evesde.table("mapCelestialGraphics", {
  celestialID: integer().primaryKey().notNull(),
  heightMap1: integer(),
  heightMap2: integer(),
  shaderPreset: integer(),
  population: boolean(),
});

export const mapCelestialStatistics = evesde.table("mapCelestialStatistics", {
  celestialID: integer().primaryKey().notNull(),
  temperature: doublePrecision(),
  spectralClass: varchar({ length: 10 }),
  luminosity: doublePrecision(),
  age: doublePrecision(),
  life: doublePrecision(),
  orbitRadius: doublePrecision(),
  eccentricity: doublePrecision(),
  massDust: doublePrecision(),
  massGas: doublePrecision(),
  fragmented: boolean(),
  density: doublePrecision(),
  surfaceGravity: doublePrecision(),
  escapeVelocity: doublePrecision(),
  orbitPeriod: doublePrecision(),
  rotationRate: doublePrecision(),
  locked: boolean(),
  pressure: doublePrecision(),
  radius: doublePrecision(),
  mass: integer(),
});

export const mapConstellations = evesde.table("mapConstellations", {
  regionID: integer(),
  constellationID: integer().primaryKey().notNull(),
  constellationName: varchar({ length: 100 }),
  x: doublePrecision(),
  y: doublePrecision(),
  z: doublePrecision(),
  xMin: doublePrecision(),
  xMax: doublePrecision(),
  yMin: doublePrecision(),
  yMax: doublePrecision(),
  zMin: doublePrecision(),
  zMax: doublePrecision(),
  factionID: integer(),
  radius: doublePrecision(),
});

export const mapDenormalize = evesde.table(
  "mapDenormalize",
  {
    itemID: integer().primaryKey().notNull(),
    typeID: integer(),
    groupID: integer(),
    solarSystemID: integer(),
    constellationID: integer(),
    regionID: integer(),
    orbitID: integer(),
    x: doublePrecision(),
    y: doublePrecision(),
    z: doublePrecision(),
    radius: doublePrecision(),
    itemName: varchar({ length: 100 }),
    security: doublePrecision(),
    celestialIndex: integer(),
    orbitIndex: integer(),
  },
  (table) => [
    index("ix_evesde_mapDenormalize_constellationID").using(
      "btree",
      table.constellationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapDenormalize_orbitID").using(
      "btree",
      table.orbitID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapDenormalize_regionID").using(
      "btree",
      table.regionID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapDenormalize_solarSystemID").using(
      "btree",
      table.solarSystemID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapDenormalize_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
    index("mapDenormalize_IX_groupConstellation").using(
      "btree",
      table.groupID.asc().nullsLast().op("int4_ops"),
      table.constellationID.asc().nullsLast().op("int4_ops")
    ),
    index("mapDenormalize_IX_groupRegion").using(
      "btree",
      table.groupID.asc().nullsLast().op("int4_ops"),
      table.regionID.asc().nullsLast().op("int4_ops")
    ),
    index("mapDenormalize_IX_groupSystem").using(
      "btree",
      table.groupID.asc().nullsLast().op("int4_ops"),
      table.solarSystemID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const mapJumps = evesde.table("mapJumps", {
  stargateID: integer().primaryKey().notNull(),
  destinationID: integer(),
});

export const mapLandmarks = evesde.table("mapLandmarks", {
  landmarkID: integer().primaryKey().notNull(),
  landmarkName: varchar({ length: 100 }),
  description: text(),
  locationID: integer(),
  x: doublePrecision(),
  y: doublePrecision(),
  z: doublePrecision(),
  iconID: integer(),
});

export const mapLocationScenes = evesde.table("mapLocationScenes", {
  locationID: integer().primaryKey().notNull(),
  graphicID: integer(),
});

export const mapLocationWormholeClasses = evesde.table(
  "mapLocationWormholeClasses",
  {
    locationID: integer().primaryKey().notNull(),
    wormholeClassID: integer(),
  }
);

export const mapRegions = evesde.table("mapRegions", {
  regionID: integer().primaryKey().notNull(),
  regionName: varchar({ length: 100 }),
  x: doublePrecision(),
  y: doublePrecision(),
  z: doublePrecision(),
  xMin: doublePrecision(),
  xMax: doublePrecision(),
  yMin: doublePrecision(),
  yMax: doublePrecision(),
  zMin: doublePrecision(),
  zMax: doublePrecision(),
  factionID: integer(),
  nebula: integer(),
  radius: doublePrecision(),
});

export const mapSolarSystems = evesde.table(
  "mapSolarSystems",
  {
    regionID: integer(),
    constellationID: integer(),
    solarSystemID: integer().primaryKey().notNull(),
    solarSystemName: varchar({ length: 100 }),
    x: doublePrecision(),
    y: doublePrecision(),
    z: doublePrecision(),
    xMin: doublePrecision(),
    xMax: doublePrecision(),
    yMin: doublePrecision(),
    yMax: doublePrecision(),
    zMin: doublePrecision(),
    zMax: doublePrecision(),
    luminosity: doublePrecision(),
    border: boolean(),
    fringe: boolean(),
    corridor: boolean(),
    hub: boolean(),
    international: boolean(),
    regional: boolean(),
    constellation: boolean(),
    security: doublePrecision(),
    factionID: integer(),
    radius: doublePrecision(),
    sunTypeID: integer(),
    securityClass: varchar({ length: 2 }),
  },
  (table) => [
    index("ix_evesde_mapSolarSystems_constellationID").using(
      "btree",
      table.constellationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapSolarSystems_regionID").using(
      "btree",
      table.regionID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_mapSolarSystems_security").using(
      "btree",
      table.security.asc().nullsLast().op("float8_ops")
    ),
  ]
);

export const mapUniverse = evesde.table("mapUniverse", {
  universeID: integer().primaryKey().notNull(),
  universeName: varchar({ length: 100 }),
  x: doublePrecision(),
  y: doublePrecision(),
  z: doublePrecision(),
  xMin: doublePrecision(),
  xMax: doublePrecision(),
  yMin: doublePrecision(),
  yMax: doublePrecision(),
  zMin: doublePrecision(),
  zMax: doublePrecision(),
  radius: doublePrecision(),
});

export const planetSchematics = evesde.table("planetSchematics", {
  schematicID: integer().primaryKey().notNull(),
  schematicName: varchar({ length: 255 }),
  cycleTime: integer(),
});

export const ramActivities = evesde.table("ramActivities", {
  activityID: integer().primaryKey().notNull(),
  activityName: varchar({ length: 100 }),
  iconNo: varchar({ length: 5 }),
  description: varchar({ length: 1000 }),
  published: boolean(),
});

export const ramAssemblyLineTypes = evesde.table("ramAssemblyLineTypes", {
  assemblyLineTypeID: integer().primaryKey().notNull(),
  assemblyLineTypeName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  baseTimeMultiplier: doublePrecision(),
  baseMaterialMultiplier: doublePrecision(),
  baseCostMultiplier: doublePrecision(),
  volume: doublePrecision(),
  activityID: integer(),
  minCostPerHour: doublePrecision(),
});

export const skinLicense = evesde.table("skinLicense", {
  licenseTypeID: integer().primaryKey().notNull(),
  duration: integer(),
  skinID: integer(),
});

export const skinMaterials = evesde.table("skinMaterials", {
  skinMaterialID: integer().primaryKey().notNull(),
  displayNameID: integer(),
  materialSetID: integer(),
});

export const skinShip = evesde.table(
  "skinShip",
  {
    skinID: integer(),
    typeID: integer(),
  },
  (table) => [
    index("ix_evesde_skinShip_skinID").using(
      "btree",
      table.skinID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_skinShip_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const skins = evesde.table("skins", {
  skinID: integer().primaryKey().notNull(),
  internalName: varchar({ length: 70 }),
  skinMaterialID: integer(),
});

export const staOperations = evesde.table("staOperations", {
  activityID: integer(),
  operationID: integer().primaryKey().notNull(),
  operationName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
  fringe: integer(),
  corridor: integer(),
  hub: integer(),
  border: integer(),
  ratio: integer(),
  caldariStationTypeID: integer(),
  minmatarStationTypeID: integer(),
  amarrStationTypeID: integer(),
  gallenteStationTypeID: integer(),
  joveStationTypeID: integer(),
});

export const staServices = evesde.table("staServices", {
  serviceID: integer().primaryKey().notNull(),
  serviceName: varchar({ length: 100 }),
  description: varchar({ length: 1000 }),
});

export const staStationTypes = evesde.table("staStationTypes", {
  stationTypeID: integer().primaryKey().notNull(),
  dockEntryX: doublePrecision(),
  dockEntryY: doublePrecision(),
  dockEntryZ: doublePrecision(),
  dockOrientationX: doublePrecision(),
  dockOrientationY: doublePrecision(),
  dockOrientationZ: doublePrecision(),
  operationID: integer(),
  officeSlots: integer(),
  reprocessingEfficiency: doublePrecision(),
  conquerable: boolean(),
});

export const staStations = evesde.table(
  "staStations",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    stationID: bigint({ mode: "number" }).primaryKey().notNull(),
    security: doublePrecision(),
    dockingCostPerVolume: doublePrecision(),
    maxShipVolumeDockable: doublePrecision(),
    officeRentalCost: integer(),
    operationID: integer(),
    stationTypeID: integer(),
    corporationID: integer(),
    solarSystemID: integer(),
    constellationID: integer(),
    regionID: integer(),
    stationName: varchar({ length: 100 }),
    x: doublePrecision(),
    y: doublePrecision(),
    z: doublePrecision(),
    reprocessingEfficiency: doublePrecision(),
    reprocessingStationsTake: doublePrecision(),
    reprocessingHangarFlag: integer(),
  },
  (table) => [
    index("ix_evesde_staStations_constellationID").using(
      "btree",
      table.constellationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_staStations_corporationID").using(
      "btree",
      table.corporationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_staStations_operationID").using(
      "btree",
      table.operationID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_staStations_regionID").using(
      "btree",
      table.regionID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_staStations_solarSystemID").using(
      "btree",
      table.solarSystemID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_staStations_stationTypeID").using(
      "btree",
      table.stationTypeID.asc().nullsLast().op("int4_ops")
    ),
  ]
);

export const trnTranslationColumns = evesde.table("trnTranslationColumns", {
  tcGroupID: integer(),
  tcID: integer().primaryKey().notNull(),
  tableName: varchar({ length: 256 }).notNull(),
  columnName: varchar({ length: 128 }).notNull(),
  masterID: varchar({ length: 128 }),
});

export const trnTranslationLanguages = evesde.table("trnTranslationLanguages", {
  numericLanguageID: integer().primaryKey().notNull(),
  languageID: varchar({ length: 50 }),
  languageName: varchar({ length: 200 }),
});

export const warCombatZoneSystems = evesde.table("warCombatZoneSystems", {
  solarSystemID: integer().primaryKey().notNull(),
  combatZoneID: integer(),
});

export const warCombatZones = evesde.table("warCombatZones", {
  combatZoneID: integer().primaryKey().notNull(),
  combatZoneName: varchar({ length: 100 }),
  factionID: integer(),
  centerSystemID: integer(),
  description: varchar({ length: 500 }),
});

export const agtResearchAgents = evesde.table(
  "agtResearchAgents",
  {
    agentID: integer().notNull(),
    typeID: integer().notNull(),
  },
  (table) => [
    index("ix_evesde_agtResearchAgents_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
    primaryKey({
      columns: [table.agentID, table.typeID],
      name: "agtResearchAgents_pkey",
    }),
  ]
);

export const crpNpcCorporationResearchFields = evesde.table(
  "crpNPCCorporationResearchFields",
  {
    skillID: integer().notNull(),
    corporationID: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.skillID, table.corporationID],
      name: "crpNPCCorporationResearchFields_pkey",
    }),
  ]
);

export const crpNpcCorporationTrades = evesde.table(
  "crpNPCCorporationTrades",
  {
    corporationID: integer().notNull(),
    typeID: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.corporationID, table.typeID],
      name: "crpNPCCorporationTrades_pkey",
    }),
  ]
);

export const mapRegionJumps = evesde.table(
  "mapRegionJumps",
  {
    fromRegionID: integer().notNull(),
    toRegionID: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.fromRegionID, table.toRegionID],
      name: "mapRegionJumps_pkey",
    }),
  ]
);

export const planetSchematicsPinMap = evesde.table(
  "planetSchematicsPinMap",
  {
    schematicID: integer().notNull(),
    pinTypeID: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.schematicID, table.pinTypeID],
      name: "planetSchematicsPinMap_pkey",
    }),
  ]
);

export const staOperationServices = evesde.table(
  "staOperationServices",
  {
    operationID: integer().notNull(),
    serviceID: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.operationID, table.serviceID],
      name: "staOperationServices_pkey",
    }),
  ]
);

export const crpNpcCorporationDivisions = evesde.table(
  "crpNPCCorporationDivisions",
  {
    corporationID: integer().notNull(),
    divisionID: integer().notNull(),
    size: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.corporationID, table.divisionID],
      name: "crpNPCCorporationDivisions_pkey",
    }),
  ]
);

export const dgmTypeEffects = evesde.table(
  "dgmTypeEffects",
  {
    typeID: integer().notNull(),
    effectID: integer().notNull(),
    isDefault: boolean(),
  },
  (table) => [
    primaryKey({
      columns: [table.typeID, table.effectID],
      name: "dgmTypeEffects_pkey",
    }),
  ]
);

export const industryActivity = evesde.table(
  "industryActivity",
  {
    typeID: integer().notNull(),
    activityID: integer().notNull(),
    time: integer(),
  },
  (table) => [
    index("ix_evesde_industryActivity_activityID").using(
      "btree",
      table.activityID.asc().nullsLast().op("int4_ops")
    ),
    primaryKey({
      columns: [table.typeID, table.activityID],
      name: "industryActivity_pkey",
    }),
  ]
);

export const invTypeMaterials = evesde.table(
  "invTypeMaterials",
  {
    typeID: integer().notNull(),
    materialTypeID: integer().notNull(),
    quantity: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.typeID, table.materialTypeID],
      name: "invTypeMaterials_pkey",
    }),
  ]
);

export const ramInstallationTypeContents = evesde.table(
  "ramInstallationTypeContents",
  {
    installationTypeID: integer().notNull(),
    assemblyLineTypeID: integer().notNull(),
    quantity: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.installationTypeID, table.assemblyLineTypeID],
      name: "ramInstallationTypeContents_pkey",
    }),
  ]
);

export const dgmTypeAttributes = evesde.table(
  "dgmTypeAttributes",
  {
    typeID: integer().notNull(),
    attributeID: integer().notNull(),
    valueInt: integer(),
    valueFloat: doublePrecision(),
  },
  (table) => [
    index("ix_evesde_dgmTypeAttributes_attributeID").using(
      "btree",
      table.attributeID.asc().nullsLast().op("int4_ops")
    ),
    primaryKey({
      columns: [table.typeID, table.attributeID],
      name: "dgmTypeAttributes_pkey",
    }),
  ]
);

export const invTypeReactions = evesde.table(
  "invTypeReactions",
  {
    reactionTypeID: integer().notNull(),
    input: boolean().notNull(),
    typeID: integer().notNull(),
    quantity: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.reactionTypeID, table.input, table.typeID],
      name: "invTypeReactions_pkey",
    }),
  ]
);

export const mapConstellationJumps = evesde.table(
  "mapConstellationJumps",
  {
    fromRegionID: integer(),
    fromConstellationID: integer().notNull(),
    toConstellationID: integer().notNull(),
    toRegionID: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.fromConstellationID, table.toConstellationID],
      name: "mapConstellationJumps_pkey",
    }),
  ]
);

export const planetSchematicsTypeMap = evesde.table(
  "planetSchematicsTypeMap",
  {
    schematicID: integer().notNull(),
    typeID: integer().notNull(),
    quantity: integer(),
    isInput: boolean(),
  },
  (table) => [
    primaryKey({
      columns: [table.schematicID, table.typeID],
      name: "planetSchematicsTypeMap_pkey",
    }),
  ]
);

export const trnTranslations = evesde.table(
  "trnTranslations",
  {
    tcID: integer().notNull(),
    keyID: integer().notNull(),
    languageID: varchar({ length: 50 }).notNull(),
    text: text().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tcID, table.keyID, table.languageID],
      name: "trnTranslations_pkey",
    }),
  ]
);

export const ramAssemblyLineTypeDetailPerCategory = evesde.table(
  "ramAssemblyLineTypeDetailPerCategory",
  {
    assemblyLineTypeID: integer().notNull(),
    categoryID: integer().notNull(),
    timeMultiplier: doublePrecision(),
    materialMultiplier: doublePrecision(),
    costMultiplier: doublePrecision(),
  },
  (table) => [
    primaryKey({
      columns: [table.assemblyLineTypeID, table.categoryID],
      name: "ramAssemblyLineTypeDetailPerCategory_pkey",
    }),
  ]
);

export const ramAssemblyLineTypeDetailPerGroup = evesde.table(
  "ramAssemblyLineTypeDetailPerGroup",
  {
    assemblyLineTypeID: integer().notNull(),
    groupID: integer().notNull(),
    timeMultiplier: doublePrecision(),
    materialMultiplier: doublePrecision(),
    costMultiplier: doublePrecision(),
  },
  (table) => [
    primaryKey({
      columns: [table.assemblyLineTypeID, table.groupID],
      name: "ramAssemblyLineTypeDetailPerGroup_pkey",
    }),
  ]
);

export const translationTables = evesde.table(
  "translationTables",
  {
    sourceTable: varchar({ length: 200 }).notNull(),
    destinationTable: varchar({ length: 200 }),
    translatedKey: varchar({ length: 200 }).notNull(),
    tcGroupID: integer(),
    tcID: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.sourceTable, table.translatedKey],
      name: "translationTables_pkey",
    }),
  ]
);

export const invContrabandTypes = evesde.table(
  "invContrabandTypes",
  {
    factionID: integer().notNull(),
    typeID: integer().notNull(),
    standingLoss: doublePrecision(),
    confiscateMinSec: doublePrecision(),
    fineByValue: doublePrecision(),
    attackMinSec: doublePrecision(),
  },
  (table) => [
    index("ix_evesde_invContrabandTypes_typeID").using(
      "btree",
      table.typeID.asc().nullsLast().op("int4_ops")
    ),
    primaryKey({
      columns: [table.factionID, table.typeID],
      name: "invContrabandTypes_pkey",
    }),
  ]
);

export const invControlTowerResources = evesde.table(
  "invControlTowerResources",
  {
    controlTowerTypeID: integer().notNull(),
    resourceTypeID: integer().notNull(),
    purpose: integer(),
    quantity: integer(),
    minSecurityLevel: doublePrecision(),
    factionID: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.controlTowerTypeID, table.resourceTypeID],
      name: "invControlTowerResources_pkey",
    }),
  ]
);

export const mapSolarSystemJumps = evesde.table(
  "mapSolarSystemJumps",
  {
    fromRegionID: integer(),
    fromConstellationID: integer(),
    fromSolarSystemID: integer().notNull(),
    toSolarSystemID: integer().notNull(),
    toConstellationID: integer(),
    toRegionID: integer(),
  },
  (table) => [
    primaryKey({
      columns: [table.fromSolarSystemID, table.toSolarSystemID],
      name: "mapSolarSystemJumps_pkey",
    }),
  ]
);

export const ramAssemblyLineStations = evesde.table(
  "ramAssemblyLineStations",
  {
    stationID: integer().notNull(),
    assemblyLineTypeID: integer().notNull(),
    quantity: integer(),
    stationTypeID: integer(),
    ownerID: integer(),
    solarSystemID: integer(),
    regionID: integer(),
  },
  (table) => [
    index("ix_evesde_ramAssemblyLineStations_ownerID").using(
      "btree",
      table.ownerID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_ramAssemblyLineStations_regionID").using(
      "btree",
      table.regionID.asc().nullsLast().op("int4_ops")
    ),
    index("ix_evesde_ramAssemblyLineStations_solarSystemID").using(
      "btree",
      table.solarSystemID.asc().nullsLast().op("int4_ops")
    ),
    primaryKey({
      columns: [table.stationID, table.assemblyLineTypeID],
      name: "ramAssemblyLineStations_pkey",
    }),
  ]
);
