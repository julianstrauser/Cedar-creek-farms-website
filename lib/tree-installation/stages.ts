export type InstallationStageData = {
  id: string;
  step: number;
  title: string;
  body: string;
  disclaimer?: string;
};

export const INSTALLATION_STAGES: InstallationStageData[] = [
  {
    id: "choose-tree",
    step: 1,
    title: "Choose the Right Tree",
    body: "A successful planting begins before the tree ever leaves our farm. We help select the right species, size, and placement for your soil, sunlight, available space, and long-term goals.",
  },
  {
    id: "evaluate-property",
    step: 2,
    title: "Evaluate the Property",
    body: "We evaluate sunlight, drainage, overhead clearance, underground utilities, mature tree size, and distance from structures before selecting the planting location.",
  },
  {
    id: "prepare-transport",
    step: 3,
    title: "Prepare the Tree for Transport",
    body: "The tree is carefully dug with specialized equipment designed to preserve a strong root ball and reduce stress during relocation.",
  },
  {
    id: "planting-hole",
    step: 4,
    title: "Prepare the Planting Hole",
    body: "The planting hole is prepared to match the root ball. Proper depth is critical—the root flare should remain visible and should never be buried beneath excess soil.",
  },
  {
    id: "position-tree",
    step: 5,
    title: "Position the Tree",
    body: "We carefully position the tree for appearance, stability, and long-term health before confirming that it is level and planted at the proper depth.",
  },
  {
    id: "backfill",
    step: 6,
    title: "Backfill the Hole",
    body: "The hole is backfilled using the surrounding soil whenever possible. Water is added during the process to settle the soil naturally and reduce large air pockets.",
  },
  {
    id: "mulch",
    step: 7,
    title: "Mulch and Protect",
    body: "A wide mulch ring helps regulate soil temperature, retain moisture, and protect the root zone. Mulch should never be piled against the trunk.",
  },
  {
    id: "water-deeply",
    step: 8,
    title: "Water Deeply",
    body: "Newly transplanted trees require slow, deep watering. The root ball must remain evenly moist, but the surrounding soil should not remain waterlogged.",
    disclaimer:
      "Watering needs vary based on weather, soil, drainage, tree species, and tree size.",
  },
  {
    id: "establish-roots",
    step: 9,
    title: "Establish Healthy Roots",
    body: "Establishment takes time. Consistent watering, proper mulch, and regular monitoring allow new roots to expand into the surrounding soil.",
  },
  {
    id: "long-term-care",
    step: 10,
    title: "Long-Term Care",
    body: "Long-term success comes from proper care—not excessive intervention. Monitor moisture, protect the trunk, maintain the mulch ring, and prune strategically as the tree develops.",
  },
];

export const INSTALLATION_STAGE_COUNT = INSTALLATION_STAGES.length;
