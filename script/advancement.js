/**
 * ADVANCEMENT TREE GENERATOR - MINECRAFT JAVA EDITION
 * 100% Vanilla-compliant JSON Generator, Drag & Drop Canvas, 57 Triggers, ZIP Exporter
 */

// ==========================================
// 1. OFFICIAL 57 MINECRAFT JAVA TRIGGERS
// ==========================================
const MINECRAFT_TRIGGERS = [
  { id: "minecraft:inventory_changed", name: "Inventory Changed", desc: "Triggered when player inventory items change", type: "items" },
  { id: "minecraft:recipe_unlocked", name: "Recipe Unlocked", desc: "Triggered when a recipe is unlocked in the recipe book", type: "recipe" },
  { id: "minecraft:recipe_crafted", name: "Recipe Crafted", desc: "Triggered when a recipe is crafted by the player", type: "recipe" },
  { id: "minecraft:crafter_recipe_crafted", name: "Crafter Recipe Crafted", desc: "Triggered when an automated crafter block crafts an item", type: "recipe" },
  { id: "minecraft:player_killed_entity", name: "Player Killed Entity", desc: "Triggered when the player kills any entity/mob", type: "entity" },
  { id: "minecraft:entity_killed_player", name: "Entity Killed Player", desc: "Triggered when a mob kills the player", type: "entity" },
  { id: "minecraft:player_hurt_entity", name: "Player Hurt Entity", desc: "Triggered when the player hurts an entity", type: "entity" },
  { id: "minecraft:entity_hurt_player", name: "Entity Hurt Player", desc: "Triggered when an entity hurts the player", type: "damage" },
  { id: "minecraft:location", name: "Location", desc: "Triggered periodically based on player location/biome/dimension", type: "location" },
  { id: "minecraft:tick", name: "Tick", desc: "Triggered on every single tick (useful for root advancements)", type: "tick" },
  { id: "minecraft:consume_item", name: "Consume Item", desc: "Triggered when player eats or drinks an item", type: "item" },
  { id: "minecraft:placed_block", name: "Placed Block", desc: "Triggered when player places a block", type: "block" },
  { id: "minecraft:bred_animals", name: "Bred Animals", desc: "Triggered when player breeds two animals", type: "breed" },
  { id: "minecraft:brewed_potion", name: "Brewed Potion", desc: "Triggered when a brewing stand finishes brewing a potion", type: "potion" },
  { id: "minecraft:cured_zombie_villager", name: "Cured Zombie Villager", desc: "Triggered when player cures a zombie villager", type: "entity" },
  { id: "minecraft:enchanted_item", name: "Enchanted Item", desc: "Triggered when player enchants an item at an enchanting table", type: "enchant" },
  { id: "minecraft:enter_block", name: "Enter Block", desc: "Triggered when player enters a block (e.g. portal, water, honey)", type: "block" },
  { id: "minecraft:fall_from_height", name: "Fall From Height", desc: "Triggered when player lands after falling from a height", type: "distance" },
  { id: "minecraft:fishing_rod_hooked", name: "Fishing Rod Hooked", desc: "Triggered when player reels in an item or entity with fishing rod", type: "item" },
  { id: "minecraft:hero_of_the_village", name: "Hero of the Village", desc: "Triggered when a raid is defeated and player gets Hero of the Village", type: "location" },
  { id: "minecraft:impossible", name: "Impossible", desc: "Cannot be unlocked naturally; unlocked only via /advancement command", type: "none" },
  { id: "minecraft:item_durability_changed", name: "Item Durability Changed", desc: "Triggered when an item durability decreases or increases", type: "item" },
  { id: "minecraft:item_used_on_block", name: "Item Used On Block", desc: "Triggered when player uses an item on a block (e.g. hoe on dirt)", type: "item_block" },
  { id: "minecraft:kill_mob_near_sculk_catalyst", name: "Kill Mob Near Sculk Catalyst", desc: "Triggered when mob killed in sculk catalyst range", type: "entity" },
  { id: "minecraft:levitation", name: "Levitation", desc: "Triggered when player receives levitation effect (e.g. Shulker)", type: "distance" },
  { id: "minecraft:lightning_strike", name: "Lightning Strike", desc: "Triggered when lightning strikes near player or summoned by trident", type: "entity" },
  { id: "minecraft:nether_travel", name: "Nether Travel", desc: "Triggered when player travels through a Nether portal across distance", type: "distance" },
  { id: "minecraft:player_generates_container_loot", name: "Container Loot Generated", desc: "Triggered when a naturally generated chest loot table is opened", type: "loot" },
  { id: "minecraft:player_interacted_with_entity", name: "Player Interacted With Entity", desc: "Triggered when right-clicking on an entity with an item", type: "entity_item" },
  { id: "minecraft:shot_crosshairs", name: "Shot Crosshairs", desc: "Triggered when projectile hits an entity in player crosshair", type: "entity" },
  { id: "minecraft:slept_in_bed", name: "Slept in Bed", desc: "Triggered when player successfully sleeps in a bed", type: "location" },
  { id: "minecraft:slide_down_block", name: "Slide Down Block", desc: "Triggered when sliding down a honey block", type: "block" },
  { id: "minecraft:summoned_entity", name: "Summoned Entity", desc: "Triggered when spawning Iron Golem, Snow Golem, or Wither", type: "entity" },
  { id: "minecraft:tame_animal", name: "Tame Animal", desc: "Triggered when taming a horse, wolf, cat, parrot, llama", type: "entity" },
  { id: "minecraft:target_hit", name: "Target Block Hit", desc: "Triggered when a projectile hits a target block", type: "block" },
  { id: "minecraft:throw_item", name: "Throw Item", desc: "Triggered when throwing an item", type: "item" },
  { id: "minecraft:thrown_item_picked_up_by_entity", name: "Thrown Item Picked Up", desc: "Triggered when an entity picks up a thrown item (e.g. Piglin bartering)", type: "entity_item" },
  { id: "minecraft:used_ender_eye", name: "Used Ender Eye", desc: "Triggered when throwing an Eye of Ender", type: "distance" },
  { id: "minecraft:used_totem", name: "Used Totem of Undying", desc: "Triggered when player avoids death using a Totem of Undying", type: "item" },
  { id: "minecraft:using_item", name: "Using Item", desc: "Triggered continuously while holding right-click on an item (bow, shield, spyglass)", type: "item" },
  { id: "minecraft:villager_trade", name: "Villager Trade", desc: "Triggered when completing a trade with a villager or wandering trader", type: "trade" },
  { id: "minecraft:voluntary_exile", name: "Voluntary Exile", desc: "Triggered when killing a Raid Captain (Bad Omen effect)", type: "location" },
  { id: "minecraft:allay_drop_item_on_block", name: "Allay Drop Item On Block", desc: "Triggered when an Allay drops an item on a block", type: "item_block" },
  { id: "minecraft:avoid_vibration", name: "Avoid Vibration", desc: "Triggered when sneaking to avoid triggering a Sculk Sensor", type: "location" },
  { id: "minecraft:chiseled_bookshelf_interaction", name: "Chiseled Bookshelf Interaction", desc: "Triggered when inserting or removing a book from chiseled bookshelf", type: "block" },
  { id: "minecraft:construct_beacon", name: "Construct Beacon", desc: "Triggered when activating a beacon pyramid", type: "beacon" },
  { id: "minecraft:effects_changed", name: "Effects Changed", desc: "Triggered when active status effects on player change", type: "effects" },
  { id: "minecraft:fall_after_explosion", name: "Fall After Explosion", desc: "Triggered when falling safely using a Wind Charge explosion", type: "distance" },
  { id: "minecraft:default_block_use", name: "Default Block Use", desc: "Triggered when interacting with interactable blocks (e.g. crafter, bell)", type: "block" }
];

// ==========================================
// 2. STATE & CONFIGURATION
// ==========================================
const state = {
  namespace: "custom",
  advancements: [],
  selectedId: null,
  scale: 1,
  panX: 400,
  panY: 250,
  isPanning: false,
  startPanX: 0,
  startPanY: 0,
  dragNodeId: null,
  dragStartX: 0,
  dragStartY: 0,
  dragNodeInitialX: 0,
  dragNodeInitialY: 0,
  itemsList: [],
  assetsBaseUrl: "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/26.2/assets/minecraft/textures/"
};

// ==========================================
// 3. INITIAL SAMPLE DATA
// ==========================================
const sampleAdvancements = [
  {
    id: "root",
    parent: null,
    x: 100,
    y: 200,
    display: {
      title: "Minecraft Adventure",
      description: "The journey begins! Welcome to the custom questline.",
      icon: "minecraft:grass_block",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false,
      background: "minecraft:textures/gui/advancements/backgrounds/adventure.png"
    },
    criteria: [
      {
        id: "crafting_table",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:crafting_table" }]
        }
      }
    ],
    requirementsMode: "AND", // "AND", "OR", "CUSTOM"
    customRequirements: [],
    rewards: {
      experience: 10,
      recipes: ["minecraft:wooden_pickaxe", "minecraft:wooden_sword"],
      function: "",
      loot: []
    }
  },
  {
    id: "mine_stone",
    parent: "root",
    x: 340,
    y: 120,
    display: {
      title: "Stone Age",
      description: "Mine stone with your new wooden pickaxe.",
      icon: "minecraft:cobblestone",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "cobblestone",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:cobblestone" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 20,
      recipes: ["minecraft:stone_pickaxe"],
      function: "",
      loot: []
    }
  },
  {
    id: "acquire_iron",
    parent: "mine_stone",
    x: 580,
    y: 120,
    display: {
      title: "Acquire Hardware",
      description: "Smelt an iron ingot in a furnace.",
      icon: "minecraft:iron_ingot",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "iron",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:iron_ingot" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 50,
      recipes: ["minecraft:iron_sword", "minecraft:shield"],
      function: "",
      loot: []
    }
  },
  {
    id: "suit_up",
    parent: "acquire_iron",
    x: 820,
    y: 60,
    display: {
      title: "Suit Up!",
      description: "Protect yourself with a piece of iron armor.",
      icon: "minecraft:iron_chestplate",
      frame: "goal",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "iron_chestplate",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:iron_chestplate" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 100,
      recipes: [],
      function: "",
      loot: []
    }
  },
  {
    id: "diamonds",
    parent: "acquire_iron",
    x: 820,
    y: 180,
    display: {
      title: "DIAMONDS!",
      description: "Acquire rare diamonds from the depths.",
      icon: "minecraft:diamond",
      frame: "challenge",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "diamond",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:diamond" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 500,
      recipes: ["minecraft:diamond_sword", "minecraft:diamond_pickaxe"],
      function: "",
      loot: []
    }
  },
  {
    id: "bake_bread",
    parent: "root",
    x: 340,
    y: 300,
    display: {
      title: "Bake Bread",
      description: "Turn wheat into a delicious loaf of bread.",
      icon: "minecraft:bread",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "bread",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:bread" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 15,
      recipes: [],
      function: "",
      loot: []
    }
  }
];

// ==========================================
// 4. ITEM & TEXTURE ASSET MANAGER
// ==========================================
async function loadItemsDatabase() {
  try {
    const res = await fetch('../items.json');
    if (res.ok) {
      const data = await res.json();
      state.itemsList = data.values || [];
    }
  } catch (err) {
    console.warn("Could not load items.json, using fallback list.", err);
    state.itemsList = [
      "minecraft:grass_block", "minecraft:stone", "minecraft:cobblestone",
      "minecraft:dirt", "minecraft:diamond", "minecraft:diamond_sword",
      "minecraft:iron_ingot", "minecraft:iron_chestplate", "minecraft:bread",
      "minecraft:golden_apple", "minecraft:elytra", "minecraft:nether_star",
      "minecraft:ender_pearl", "minecraft:totem_of_undying", "minecraft:bow"
    ];
  }
}

function getItemTextureUrl(itemId) {
  if (!itemId) itemId = "minecraft:grass_block";
  const cleanId = itemId.replace("minecraft:", "");
  
  // Try item folder first, fallback handled via onerror
  return `${state.assetsBaseUrl}item/${cleanId}.png`;
}

function handleImageError(img, itemId) {
  if (!img.dataset.triedBlock) {
    img.dataset.triedBlock = "true";
    const cleanId = itemId.replace("minecraft:", "");
    img.src = `${state.assetsBaseUrl}block/${cleanId}.png`;
  } else if (!img.dataset.triedSvg) {
    img.dataset.triedSvg = "true";
    img.src = createFallbackIcon(itemId);
  }
}

function createFallbackIcon(itemId) {
  const char = (itemId || "M").replace("minecraft:", "").charAt(0).toUpperCase();
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23777" stroke="%23333" stroke-width="2"/><text x="16" y="22" fill="%23ffa600" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">${char}</text></svg>`;
}

// ==========================================
// 5. CANVAS & NAVIGATION CONTROLLER
// ==========================================
const canvasViewport = document.getElementById('canvasViewport');
const canvasContent = document.getElementById('canvasContent');
const nodesLayer = document.getElementById('nodesLayer');
const connectionsSvg = document.getElementById('connectionsSvg');
const canvasBgLayer = document.getElementById('canvasBgLayer');

function updateCanvasTransform() {
  canvasContent.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
  if (canvasBgLayer) {
    canvasBgLayer.style.transform = `translate(${state.panX % 64}px, ${state.panY % 64}px) scale(${state.scale})`;
  }
  document.getElementById('hudZoomText').textContent = `${Math.round(state.scale * 100)}%`;
}

function initCanvasEvents() {
  // Panning with mouse drag on canvas background or middle button
  canvasViewport.addEventListener('mousedown', (e) => {
    if (e.target === canvasViewport || e.target === canvasBgLayer || e.button === 1) {
      state.isPanning = true;
      state.startPanX = e.clientX - state.panX;
      state.startPanY = e.clientY - state.panY;
      canvasViewport.classList.add('panning');
      e.preventDefault();
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (state.isPanning) {
      state.panX = e.clientX - state.startPanX;
      state.panY = e.clientY - state.startPanY;
      updateCanvasTransform();
    } else if (state.dragNodeId) {
      const dx = (e.clientX - state.dragStartX) / state.scale;
      const dy = (e.clientY - state.dragStartY) / state.scale;
      const node = state.advancements.find(a => a.id === state.dragNodeId);
      if (node) {
        node.x = Math.round(state.dragNodeInitialX + dx);
        node.y = Math.round(state.dragNodeInitialY + dy);
        renderNodePosition(node);
        renderConnections();
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (state.isPanning) {
      state.isPanning = false;
      canvasViewport.classList.remove('panning');
    }
    if (state.dragNodeId) {
      const el = document.getElementById(`node-${state.dragNodeId}`);
      if (el) el.classList.remove('dragging');
      state.dragNodeId = null;
    }
  });

  // Zooming via Wheel around mouse pointer
  canvasViewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    const newScale = Math.min(Math.max(state.scale * zoomFactor, 0.3), 2.5);
    
    // Zoom centered on cursor
    const rect = canvasViewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    state.panX = mouseX - (mouseX - state.panX) * (newScale / state.scale);
    state.panY = mouseY - (mouseY - state.panY) * (newScale / state.scale);
    state.scale = newScale;
    updateCanvasTransform();
  }, { passive: false });

  // Double Click on empty canvas to create a new advancement node
  canvasViewport.addEventListener('dblclick', (e) => {
    if (e.target === canvasViewport || e.target === canvasBgLayer) {
      const rect = canvasViewport.getBoundingClientRect();
      const clickX = (e.clientX - rect.left - state.panX) / state.scale;
      const clickY = (e.clientY - rect.top - state.panY) / state.scale;
      
      createNewAdvancement(clickX, clickY);
    }
  });
}

function zoomIn() {
  state.scale = Math.min(state.scale * 1.2, 2.5);
  updateCanvasTransform();
}

function zoomOut() {
  state.scale = Math.max(state.scale / 1.2, 0.3);
  updateCanvasTransform();
}

function resetView() {
  state.scale = 1;
  state.panX = 350;
  state.panY = 200;
  updateCanvasTransform();
}

// ==========================================
// 6. TREE LAYOUT & RENDERING
// ==========================================
function renderAll() {
  renderNodes();
  renderConnections();
  updateSidebar();
}

function renderNodes() {
  nodesLayer.innerHTML = '';
  state.advancements.forEach(node => {
    const el = createNodeElement(node);
    nodesLayer.appendChild(el);
  });
}

function createNodeElement(node) {
  const div = document.createElement('div');
  div.id = `node-${node.id}`;
  div.className = `adv-node ${state.selectedId === node.id ? 'selected' : ''}`;
  div.style.left = `${node.x}px`;
  div.style.top = `${node.y}px`;

  const frameType = node.display?.frame || 'task';
  const iconUrl = getItemTextureUrl(node.display?.icon);
  const isRoot = !node.parent;

  div.innerHTML = `
    <div class="node-frame-wrapper">
      <div class="node-frame frame-${frameType}"></div>
      <img class="node-icon" src="${iconUrl}" alt="${node.id}" onerror="handleImageError(this, '${node.display?.icon || ''}')">
      ${isRoot ? '<div class="node-badge-root">ROOT</div>' : ''}
    </div>
    <div class="node-title-label">${escapeHtml(node.display?.title || node.id)}</div>
  `;

  // Selection
  div.addEventListener('click', (e) => {
    e.stopPropagation();
    selectAdvancement(node.id);
  });

  // Dragging individual node
  div.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // left click
      e.stopPropagation();
      state.dragNodeId = node.id;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      state.dragNodeInitialX = node.x;
      state.dragNodeInitialY = node.y;
      div.classList.add('dragging');
      selectAdvancement(node.id);
    }
  });

  return div;
}

function renderNodePosition(node) {
  const el = document.getElementById(`node-${node.id}`);
  if (el) {
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
  }
}

// ==========================================
// 7. ORTHOGONAL DASHED CONNECTION LINES
// ==========================================
function renderConnections() {
  connectionsSvg.innerHTML = '';
  
  state.advancements.forEach(node => {
    if (!node.parent) return;
    const parentNode = state.advancements.find(a => a.id === node.parent);
    if (!parentNode) return;

    // Center coordinates
    const x1 = parentNode.x;
    const y1 = parentNode.y;
    const x2 = node.x;
    const y2 = node.y;

    // Step-wise orthogonal path (horizontal-vertical-horizontal)
    const midX = x1 + (x2 - x1) / 2;
    const d = `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;

    const isSelected = state.selectedId === node.id || state.selectedId === parentNode.id;

    // Outer dark border stroke
    const borderPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    borderPath.setAttribute("d", d);
    borderPath.setAttribute("class", `connection-line ${isSelected ? 'selected' : ''}`);
    connectionsSvg.appendChild(borderPath);

    // Inner dashed core stroke
    const corePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    corePath.setAttribute("d", d);
    corePath.setAttribute("class", `connection-line-core ${isSelected ? 'selected' : ''}`);
    connectionsSvg.appendChild(corePath);
  });
}

// ==========================================
// 8. AUTO-LAYOUT TREE ALGORITHM
// ==========================================
function autoLayoutTree() {
  const roots = state.advancements.filter(a => !a.parent || !state.advancements.some(p => p.id === a.parent));
  if (roots.length === 0 && state.advancements.length > 0) {
    roots.push(state.advancements[0]);
  }

  let currentY = 140;
  const H_SPACING = 240;
  const V_SPACING = 150;

  function layoutSubtree(node, depth) {
    node.x = 100 + depth * H_SPACING;
    const children = state.advancements.filter(a => a.parent === node.id);

    if (children.length === 0) {
      node.y = currentY;
      currentY += V_SPACING;
      return;
    }

    const startY = currentY;
    children.forEach(child => {
      layoutSubtree(child, depth + 1);
    });

    const firstChildY = children[0].y;
    const lastChildY = children[children.length - 1].y;
    node.y = Math.round((firstChildY + lastChildY) / 2);
  }

  roots.forEach(root => {
    layoutSubtree(root, 0);
    currentY += 80;
  });

  renderAll();
  showToast("🌳 Auto-Layout tree rearranged perfectly!");
}

// ==========================================
// 9. ADVANCEMENT CRUD
// ==========================================
function selectAdvancement(id) {
  state.selectedId = id;
  document.querySelectorAll('.adv-node').forEach(el => {
    el.classList.toggle('selected', el.id === `node-${id}`);
  });
  renderConnections();
  updateSidebar();
}

function createNewAdvancement(x, y, parentId) {
  const newNum = state.advancements.length + 1;
  const newId = `advancement_${newNum}`;
  const parent = parentId !== undefined ? parentId : state.selectedId;

  const newAdv = {
    id: newId,
    parent: parent || null,
    x: Math.round(x !== undefined ? x : 400),
    y: Math.round(y !== undefined ? y : 300),
    display: {
      title: `Advancement ${newNum}`,
      description: "Unlock this quest by completing the criteria.",
      icon: "minecraft:iron_sword",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false
    },
    criteria: [
      {
        id: "requirement_1",
        trigger: "minecraft:inventory_changed",
        conditions: {
          items: [{ items: "minecraft:iron_sword" }]
        }
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: {
      experience: 10,
      recipes: [],
      function: "",
      loot: []
    }
  };

  state.advancements.push(newAdv);
  renderAll();
  selectAdvancement(newId);
  showToast(`✨ Created advancement "${newAdv.display.title}"`);
}

function addChildToSelected() {
  if (!state.selectedId) {
    showToast("⚠️ Select a node first to add a child!");
    return;
  }
  const parent = state.advancements.find(a => a.id === state.selectedId);
  if (!parent) return;

  const childX = parent.x + 240;
  const childY = parent.y + 20;
  createNewAdvancement(childX, childY, parent.id);
}

function addRootAdvancement() {
  const roots = state.advancements.filter(a => !a.parent);
  const newNum = state.advancements.length + 1;
  const newAdv = {
    id: `root_${roots.length + 1}`,
    parent: null,
    x: 100,
    y: 100 + roots.length * 200,
    display: {
      title: `New Quest Line ${roots.length + 1}`,
      description: "A brand new root quest category.",
      icon: "minecraft:nether_star",
      frame: "task",
      show_toast: true,
      announce_to_chat: true,
      hidden: false,
      background: "minecraft:textures/gui/advancements/backgrounds/adventure.png"
    },
    criteria: [
      {
        id: "tick_root",
        trigger: "minecraft:tick",
        conditions: {}
      }
    ],
    requirementsMode: "AND",
    customRequirements: [],
    rewards: { experience: 0, recipes: [], function: "", loot: [] }
  };

  state.advancements.push(newAdv);
  renderAll();
  selectAdvancement(newAdv.id);
  showToast(`🌟 Created new Root advancement!`);
}

function deleteSelectedAdvancement() {
  if (!state.selectedId) return;
  const idToDelete = state.selectedId;

  // Re-link children to grandparent or null
  const nodeToDelete = state.advancements.find(a => a.id === idToDelete);
  const grandParent = nodeToDelete ? nodeToDelete.parent : null;

  state.advancements.forEach(a => {
    if (a.parent === idToDelete) {
      a.parent = grandParent;
    }
  });

  state.advancements = state.advancements.filter(a => a.id !== idToDelete);
  state.selectedId = state.advancements.length > 0 ? state.advancements[0].id : null;
  renderAll();
  showToast("🗑️ Advancement deleted.");
}

// ==========================================
// 10. SIDEBAR EDITOR CONTROLLER
// ==========================================
function updateSidebar() {
  const container = document.getElementById('sidebarContent');
  if (!container) return;

  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) {
    container.innerHTML = `
      <div style="text-align: center; color: #666; margin-top: 50px;">
        <p>No advancement selected.</p>
        <p style="font-size: 11px; margin-top: 8px;">Click a node or double-click canvas to create one.</p>
      </div>
    `;
    return;
  }

  const isRoot = !node.parent;

  // Build parent options
  let parentOptionsHtml = `<option value="" ${isRoot ? 'selected' : ''}>-- [ROOT / NO PARENT] --</option>`;
  state.advancements.forEach(a => {
    if (a.id !== node.id) {
      parentOptionsHtml += `<option value="${a.id}" ${node.parent === a.id ? 'selected' : ''}>${escapeHtml(a.display?.title || a.id)} (${a.id})</option>`;
    }
  });

  // Criteria HTML
  let criteriaHtml = '';
  node.criteria.forEach((crit, idx) => {
    const triggerObj = MINECRAFT_TRIGGERS.find(t => t.id === crit.trigger) || { name: crit.trigger, desc: "" };
    
    // Dynamic fields for criteria conditions
    let conditionInputsHtml = '';
    if (crit.trigger === "minecraft:inventory_changed") {
      const currentItem = crit.conditions?.items?.[0]?.items || "minecraft:diamond";
      conditionInputsHtml = `
        <div class="gui-row">
          <label class="gui-label">Item Required:</label>
          <input type="text" class="gui-input" value="${escapeHtml(currentItem)}" onchange="updateCriteriaItem(${idx}, this.value)">
        </div>
      `;
    } else if (crit.trigger === "minecraft:recipe_unlocked" || crit.trigger === "minecraft:recipe_crafted") {
      const recipeId = crit.conditions?.recipe || "minecraft:wooden_pickaxe";
      conditionInputsHtml = `
        <div class="gui-row">
          <label class="gui-label">Recipe ID:</label>
          <input type="text" class="gui-input" value="${escapeHtml(recipeId)}" onchange="updateCriteriaRecipe(${idx}, this.value)">
        </div>
      `;
    } else if (crit.trigger === "minecraft:player_killed_entity") {
      const entityType = crit.conditions?.entity?.type || "minecraft:zombie";
      conditionInputsHtml = `
        <div class="gui-row">
          <label class="gui-label">Entity Type:</label>
          <input type="text" class="gui-input" value="${escapeHtml(entityType)}" onchange="updateCriteriaEntity(${idx}, this.value)">
        </div>
      `;
    } else if (crit.trigger === "minecraft:location") {
      const biome = crit.conditions?.biome || "";
      const dimension = crit.conditions?.dimension || "";
      conditionInputsHtml = `
        <div class="gui-row">
          <label class="gui-label">Biome (optional):</label>
          <input type="text" class="gui-input" placeholder="e.g. minecraft:desert" value="${escapeHtml(biome)}" onchange="updateCriteriaLocation(${idx}, 'biome', this.value)">
        </div>
        <div class="gui-row">
          <label class="gui-label">Dimension (optional):</label>
          <input type="text" class="gui-input" placeholder="e.g. minecraft:the_nether" value="${escapeHtml(dimension)}" onchange="updateCriteriaLocation(${idx}, 'dimension', this.value)">
        </div>
      `;
    }

    // Trigger select options
    let triggerSelectHtml = '';
    MINECRAFT_TRIGGERS.forEach(trig => {
      triggerSelectHtml += `<option value="${trig.id}" ${crit.trigger === trig.id ? 'selected' : ''}>${trig.name} (${trig.id})</option>`;
    });

    criteriaHtml += `
      <div class="criteria-item">
        <div class="criteria-item-header">
          <span class="criteria-name-tag">#${idx + 1} ${escapeHtml(crit.id)}</span>
          <button class="btn-del-criteria" onclick="removeCriteria(${idx})">✕ Del</button>
        </div>
        <div class="gui-row">
          <label class="gui-label">Criteria ID:</label>
          <input type="text" class="gui-input" value="${escapeHtml(crit.id)}" onchange="updateCriteriaId(${idx}, this.value)">
        </div>
        <div class="gui-row">
          <label class="gui-label">Trigger Event (57 Official):</label>
          <select class="gui-select" onchange="updateCriteriaTrigger(${idx}, this.value)">
            ${triggerSelectHtml}
          </select>
        </div>
        ${conditionInputsHtml}
      </div>
    `;
  });

  // Recipes list string
  const recipesStr = (node.rewards?.recipes || []).join(", ");

  container.innerHTML = `
    <!-- DISPLAY SETTINGS -->
    <div class="gui-group">
      <div class="gui-group-title">
        <span>📜 DISPLAY & METADATA</span>
        <span class="badge">${node.id}</span>
      </div>

      <div class="gui-row">
        <label class="gui-label">Advancement ID:</label>
        <input type="text" class="gui-input" id="inpNodeId" value="${escapeHtml(node.id)}" onchange="updateSelectedField('id', this.value)">
      </div>

      <div class="gui-row">
        <label class="gui-label">Title:</label>
        <input type="text" class="gui-input" value="${escapeHtml(node.display?.title || '')}" oninput="updateDisplayField('title', this.value)">
      </div>

      <div class="gui-row">
        <label class="gui-label">Description:</label>
        <textarea class="gui-textarea" oninput="updateDisplayField('description', this.value)">${escapeHtml(node.display?.description || '')}</textarea>
      </div>

      <div class="gui-row">
        <label class="gui-label">Icon (Item):</label>
        <div class="icon-picker-box">
          <div class="slot-icon-display" onclick="openItemPickerModal()" title="Click to pick an item">
            <img src="${getItemTextureUrl(node.display?.icon)}" alt="icon" onerror="handleImageError(this, '${node.display?.icon || ''}')">
          </div>
          <input type="text" class="gui-input" style="flex: 1;" value="${escapeHtml(node.display?.icon || 'minecraft:grass_block')}" onchange="updateDisplayField('icon', this.value)">
        </div>
      </div>

      <div class="gui-row">
        <label class="gui-label">Frame Type:</label>
        <div class="frame-radio-group">
          <div class="frame-radio-btn ${node.display?.frame === 'task' ? 'active' : ''}" onclick="setFrameType('task')">
            <span>Square</span>
            <strong>Task</strong>
          </div>
          <div class="frame-radio-btn ${node.display?.frame === 'goal' ? 'active' : ''}" onclick="setFrameType('goal')">
            <span>Circle</span>
            <strong>Goal</strong>
          </div>
          <div class="frame-radio-btn ${node.display?.frame === 'challenge' ? 'active' : ''}" onclick="setFrameType('challenge')">
            <span>Diamond</span>
            <strong>Challenge</strong>
          </div>
        </div>
      </div>

      <div class="gui-row row-horizontal" style="margin-top: 10px;">
        <label class="gui-label">Show Toast Notification:</label>
        <label class="mc-switch">
          <input type="checkbox" ${node.display?.show_toast !== false ? 'checked' : ''} onchange="updateDisplayField('show_toast', this.checked)">
          <div class="mc-switch-slider"></div>
        </label>
      </div>

      <div class="gui-row row-horizontal">
        <label class="gui-label">Announce to Chat:</label>
        <label class="mc-switch">
          <input type="checkbox" ${node.display?.announce_to_chat !== false ? 'checked' : ''} onchange="updateDisplayField('announce_to_chat', this.checked)">
          <div class="mc-switch-slider"></div>
        </label>
      </div>

      <div class="gui-row row-horizontal">
        <label class="gui-label">Hidden until unlocked:</label>
        <label class="mc-switch">
          <input type="checkbox" ${node.display?.hidden ? 'checked' : ''} onchange="updateDisplayField('hidden', this.checked)">
          <div class="mc-switch-slider"></div>
        </label>
      </div>

      <div class="gui-row" style="margin-top: 10px;">
        <label class="gui-label">Parent / Connected Node:</label>
        <select class="gui-select" onchange="updateSelectedParent(this.value)">
          ${parentOptionsHtml}
        </select>
      </div>

      <div class="gui-row">
        <label class="gui-label">Custom Parent Path (External/Vanilla):</label>
        <input type="text" class="gui-input" placeholder="e.g. minecraft:recipes/root" value="${escapeHtml(node.customParent || '')}" onchange="updateSelectedField('customParent', this.value)">
      </div>

      ${isRoot ? `
        <div class="gui-row" style="margin-top: 8px;">
          <label class="gui-label">Root Background Texture:</label>
          <input type="text" class="gui-input" value="${escapeHtml(node.display?.background || 'minecraft:textures/gui/advancements/backgrounds/adventure.png')}" onchange="updateDisplayField('background', this.value)">
        </div>
      ` : ''}
    </div>

    <!-- CRITERIA & TRIGGERS -->
    <div class="gui-group">
      <div class="gui-group-title">
        <span>⚡ CRITERIA & TRIGGERS (${node.criteria.length})</span>
        <button class="mc-btn btn-primary" style="padding: 3px 8px; font-size: 11px;" onclick="addCriteria()">+ Add</button>
      </div>

      <div id="criteriaListContainer">
        ${criteriaHtml}
      </div>

      <div class="gui-row" style="margin-top: 10px;">
        <label class="gui-label">Requirements Logic (AND / OR):</label>
        <select class="gui-select" onchange="updateRequirementsMode(this.value)">
          <option value="AND" ${node.requirementsMode === 'AND' ? 'selected' : ''}>AND - All criteria must be fulfilled</option>
          <option value="OR" ${node.requirementsMode === 'OR' ? 'selected' : ''}>OR - Any single criterion unlocks advancement</option>
        </select>
      </div>
    </div>

    <!-- REWARDS -->
    <div class="gui-group">
      <div class="gui-group-title">
        <span>🎁 REWARDS</span>
      </div>

      <div class="gui-row">
        <label class="gui-label">Experience (XP):</label>
        <input type="number" class="gui-input" value="${node.rewards?.experience || 0}" onchange="updateRewardField('experience', parseInt(this.value) || 0)">
      </div>

      <div class="gui-row">
        <label class="gui-label">Recipes Unlocked (comma separated):</label>
        <input type="text" class="gui-input" placeholder="minecraft:diamond_sword, minecraft:shield" value="${escapeHtml(recipesStr)}" onchange="updateRewardRecipes(this.value)">
      </div>

      <div class="gui-row">
        <label class="gui-label">Function to Run (.mcfunction):</label>
        <input type="text" class="gui-input" placeholder="namespace:quest/reward_player" value="${escapeHtml(node.rewards?.function || '')}" onchange="updateRewardField('function', this.value)">
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="gui-group">
      <div class="gui-group-title">
        <span>⚙️ QUICK ACTIONS</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button class="mc-btn btn-primary" onclick="addChildToSelected()">➕ Add Child Node to This</button>
        <button class="mc-btn btn-danger" onclick="deleteSelectedAdvancement()">🗑️ Delete This Advancement</button>
      </div>
    </div>
  `;
}

// Field updates
function updateSelectedField(field, value) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) return;

  if (field === 'id') {
    const oldId = node.id;
    const cleanId = value.trim().replace(/\s+/g, '_').toLowerCase();
    if (!cleanId) return;
    
    // Check collision
    if (state.advancements.some(a => a.id === cleanId && a !== node)) {
      showToast("⚠️ ID already exists! Please use a unique ID.");
      return;
    }

    node.id = cleanId;
    state.selectedId = cleanId;

    // Update children parent references
    state.advancements.forEach(a => {
      if (a.parent === oldId) a.parent = cleanId;
    });
  } else {
    node[field] = value;
  }

  renderAll();
}

function updateDisplayField(field, value) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) return;
  if (!node.display) node.display = {};
  node.display[field] = value;
  renderAll();
}

function setFrameType(type) {
  updateDisplayField('frame', type);
}

function updateSelectedParent(parentId) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) return;
  node.parent = parentId || null;
  renderAll();
}

// Criteria updates
function addCriteria() {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) return;
  const num = node.criteria.length + 1;
  node.criteria.push({
    id: `requirement_${num}`,
    trigger: "minecraft:inventory_changed",
    conditions: {
      items: [{ items: "minecraft:diamond" }]
    }
  });
  renderAll();
}

function removeCriteria(idx) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (!node) return;
  if (node.criteria.length <= 1) {
    showToast("⚠️ An advancement must have at least 1 criterion!");
    return;
  }
  node.criteria.splice(idx, 1);
  renderAll();
}

function updateCriteriaId(idx, val) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    node.criteria[idx].id = val.trim();
  }
}

function updateCriteriaTrigger(idx, val) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    node.criteria[idx].trigger = val;
    // Reset conditions default based on trigger
    if (val === "minecraft:inventory_changed") {
      node.criteria[idx].conditions = { items: [{ items: "minecraft:diamond" }] };
    } else if (val === "minecraft:recipe_unlocked" || val === "minecraft:recipe_crafted") {
      node.criteria[idx].conditions = { recipe: "minecraft:iron_sword" };
    } else if (val === "minecraft:player_killed_entity") {
      node.criteria[idx].conditions = { entity: { type: "minecraft:zombie" } };
    } else if (val === "minecraft:location") {
      node.criteria[idx].conditions = { biome: "minecraft:plains" };
    } else {
      node.criteria[idx].conditions = {};
    }
    updateSidebar();
  }
}

function updateCriteriaItem(idx, itemVal) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    node.criteria[idx].conditions = { items: [{ items: itemVal.trim() }] };
  }
}

function updateCriteriaRecipe(idx, recipeVal) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    node.criteria[idx].conditions = { recipe: recipeVal.trim() };
  }
}

function updateCriteriaEntity(idx, entityVal) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    node.criteria[idx].conditions = { entity: { type: entityVal.trim() } };
  }
}

function updateCriteriaLocation(idx, prop, val) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node && node.criteria[idx]) {
    if (!node.criteria[idx].conditions) node.criteria[idx].conditions = {};
    if (val.trim()) {
      node.criteria[idx].conditions[prop] = val.trim();
    } else {
      delete node.criteria[idx].conditions[prop];
    }
  }
}

function updateRequirementsMode(mode) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node) {
    node.requirementsMode = mode;
  }
}

// Reward updates
function updateRewardField(field, val) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node) {
    if (!node.rewards) node.rewards = {};
    node.rewards[field] = val;
  }
}

function updateRewardRecipes(recipesStr) {
  const node = state.advancements.find(a => a.id === state.selectedId);
  if (node) {
    if (!node.rewards) node.rewards = {};
    node.rewards.recipes = recipesStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }
}

// ==========================================
// 11. ITEM PICKER MODAL
// ==========================================
let itemPickerFilter = "";

function openItemPickerModal() {
  const modal = document.getElementById('itemPickerModal');
  const searchInput = document.getElementById('itemSearchInput');
  modal.classList.add('open');
  searchInput.value = "";
  itemPickerFilter = "";
  renderItemPickerGrid();
  searchInput.focus();
}

function closeItemPickerModal() {
  document.getElementById('itemPickerModal').classList.remove('open');
}

function renderItemPickerGrid() {
  const grid = document.getElementById('itemGrid');
  grid.innerHTML = '';

  const filter = itemPickerFilter.toLowerCase().trim();
  const matched = state.itemsList.filter(item => item.toLowerCase().includes(filter)).slice(0, 150);

  matched.forEach(itemId => {
    const btn = document.createElement('div');
    btn.className = 'item-slot-btn';
    btn.title = itemId;
    const url = getItemTextureUrl(itemId);

    btn.innerHTML = `<img src="${url}" alt="${itemId}" onerror="handleImageError(this, '${itemId}')">`;
    btn.addEventListener('click', () => {
      selectItemForCurrentNode(itemId);
      closeItemPickerModal();
    });

    grid.appendChild(btn);
  });
}

function selectItemForCurrentNode(itemId) {
  updateDisplayField('icon', itemId);
}

function initItemPickerEvents() {
  const searchInput = document.getElementById('itemSearchInput');
  searchInput.addEventListener('input', (e) => {
    itemPickerFilter = e.target.value;
    renderItemPickerGrid();
  });
}

// ==========================================
// 12. JSON GENERATION (VANILLA COMPLIANT)
// ==========================================
function generateAdvancementJson(node) {
  const json = {};

  // Display
  if (node.display) {
    json.display = {
      icon: {
        item: node.display.icon || "minecraft:grass_block"
      },
      title: {
        text: node.display.title || node.id
      },
      description: {
        text: node.display.description || ""
      },
      frame: node.display.frame || "task",
      show_toast: node.display.show_toast !== false,
      announce_to_chat: node.display.announce_to_chat !== false,
      hidden: !!node.display.hidden
    };

    if (!node.parent && node.display.background) {
      json.display.background = node.display.background;
    }
  }

  // Parent
  if (node.customParent) {
    json.parent = node.customParent;
  } else if (node.parent) {
    json.parent = `${state.namespace}:${node.parent}`;
  }

  // Criteria
  json.criteria = {};
  node.criteria.forEach(crit => {
    json.criteria[crit.id] = {
      trigger: crit.trigger,
      conditions: crit.conditions || {}
    };
  });

  // Requirements matrix
  if (node.requirementsMode === "OR" && node.criteria.length > 1) {
    json.requirements = node.criteria.map(c => [c.id]);
  } else if (node.customRequirements && node.customRequirements.length > 0) {
    json.requirements = node.customRequirements;
  }

  // Rewards
  if (node.rewards) {
    const rewards = {};
    if (node.rewards.experience > 0) rewards.experience = node.rewards.experience;
    if (node.rewards.recipes && node.rewards.recipes.length > 0) rewards.recipes = node.rewards.recipes;
    if (node.rewards.function && node.rewards.function.trim().length > 0) rewards.function = node.rewards.function.trim();
    if (node.rewards.loot && node.rewards.loot.length > 0) rewards.loot = node.rewards.loot;

    if (Object.keys(rewards).length > 0) {
      json.rewards = rewards;
    }
  }

  return json;
}

// ==========================================
// 13. JSON INSPECTOR & MODAL
// ==========================================
function openJsonModal() {
  const modal = document.getElementById('jsonPreviewModal');
  const codeViewer = document.getElementById('jsonCodeViewer');
  const node = state.advancements.find(a => a.id === state.selectedId) || state.advancements[0];
  
  if (!node) {
    codeViewer.textContent = "No advancement selected.";
    return;
  }

  const json = generateAdvancementJson(node);
  codeViewer.textContent = JSON.stringify(json, null, 2);
  modal.classList.add('open');
}

function closeJsonModal() {
  document.getElementById('jsonPreviewModal').classList.remove('open');
}

function copyJsonToClipboard() {
  const codeViewer = document.getElementById('jsonCodeViewer');
  navigator.clipboard.writeText(codeViewer.textContent).then(() => {
    showToast("📋 JSON copied to clipboard!");
  });
}

// ==========================================
// 14. DATA PACK EXPORT (.ZIP)
// ==========================================
/**
 * Lightweight Zero-Dependency Client-Side Zip Encoder
 */
class SimpleZip {
  constructor() {
    this.files = [];
  }

  addFile(filename, content) {
    const encoder = new TextEncoder();
    const data = typeof content === 'string' ? encoder.encode(content) : content;
    this.files.push({ name: filename, data: data });
  }

  generateBlob() {
    let localHeaders = [];
    let centralHeaders = [];
    let offset = 0;

    this.files.forEach(file => {
      const nameBytes = new TextEncoder().encode(file.name);
      const crc = this.crc32(file.data);
      const size = file.data.length;

      // Local file header (30 bytes + name length)
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const view = new DataView(localHeader.buffer);
      view.setUint32(0, 0x04034b50, true); // Local file header signature
      view.setUint16(4, 20, true);         // Version needed
      view.setUint16(6, 0, true);          // General purpose bit flag
      view.setUint16(8, 0, true);          // Compression method (0 = uncompressed)
      view.setUint16(10, 0, true);         // Mod time
      view.setUint16(12, 0, true);         // Mod date
      view.setUint32(14, crc, true);       // CRC32
      view.setUint32(18, size, true);      // Compressed size
      view.setUint32(22, size, true);      // Uncompressed size
      view.setUint16(26, nameBytes.length, true); // Filename length
      view.setUint16(28, 0, true);         // Extra field length
      localHeader.set(nameBytes, 30);

      // Central directory header (46 bytes + name length)
      const centralHeader = new Uint8Array(46 + nameBytes.length);
      const cView = new DataView(centralHeader.buffer);
      cView.setUint32(0, 0x02014b50, true); // Central header signature
      cView.setUint16(4, 20, true);         // Version made by
      cView.setUint16(6, 20, true);         // Version needed
      cView.setUint16(8, 0, true);          // Bit flag
      cView.setUint16(10, 0, true);         // Compression method
      cView.setUint16(12, 0, true);         // Mod time
      cView.setUint16(14, 0, true);         // Mod date
      cView.setUint32(16, crc, true);       // CRC32
      cView.setUint32(20, size, true);      // Compressed size
      cView.setUint32(24, size, true);      // Uncompressed size
      cView.setUint16(28, nameBytes.length, true);
      cView.setUint16(30, 0, true);         // Extra field length
      cView.setUint16(32, 0, true);         // File comment length
      cView.setUint16(34, 0, true);         // Disk number start
      cView.setUint16(36, 0, true);         // Internal attributes
      cView.setUint32(38, 0, true);         // External attributes
      cView.setUint32(42, offset, true);    // Relative offset of local header
      centralHeader.set(nameBytes, 46);

      localHeaders.push(localHeader, file.data);
      centralHeaders.push(centralHeader);

      offset += localHeader.length + file.data.length;
    });

    const centralDirOffset = offset;
    let centralDirSize = 0;
    centralHeaders.forEach(c => centralDirSize += c.length);

    // End of central directory record (22 bytes)
    const eocd = new Uint8Array(22);
    const eView = new DataView(eocd.buffer);
    eView.setUint32(0, 0x06054b50, true);
    eView.setUint16(4, 0, true);
    eView.setUint16(6, 0, true);
    eView.setUint16(8, this.files.length, true);
    eView.setUint16(10, this.files.length, true);
    eView.setUint32(12, centralDirSize, true);
    eView.setUint32(16, centralDirOffset, true);
    eView.setUint16(20, 0, true);

    const allParts = [...localHeaders, ...centralHeaders, eocd];
    return new Blob(allParts, { type: 'application/zip' });
  }

  crc32(data) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ this.crcTable[(crc ^ data[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }
}

SimpleZip.prototype.crcTable = (() => {
  let c, table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }
  return table;
})();

async function downloadDataPackZip() {
  const ns = (state.namespace || "custom").trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '');
  const zip = new SimpleZip();

  // pack.mcmeta
  const mcmeta = {
    pack: {
      pack_format: 48, // Minecraft 1.21
      description: "Custom Advancement Data Pack generated with BlockEngine"
    }
  };
  zip.addFile("pack.mcmeta", JSON.stringify(mcmeta, null, 2));

  // Each advancement JSON
  state.advancements.forEach(node => {
    const json = generateAdvancementJson(node);
    const filePath = `data/${ns}/advancement/${node.id}.json`;
    zip.addFile(filePath, JSON.stringify(json, null, 2));
  });

  const blob = zip.generateBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ns}_datapack.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`📦 Data Pack "${ns}_datapack.zip" downloaded!`);
}

// ==========================================
// 15. PROJECT SAVE & LOAD (.JSON)
// ==========================================
function saveProjectFile() {
  const project = {
    version: "1.0",
    namespace: state.namespace,
    advancements: state.advancements
  };

  const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `advancement_tree_${state.namespace}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("💾 Project saved to JSON file!");
}

function loadProjectFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.advancements && Array.isArray(data.advancements)) {
        state.namespace = data.namespace || "custom";
        state.advancements = data.advancements;
        state.selectedId = state.advancements.length > 0 ? state.advancements[0].id : null;
        renderAll();
        showToast("📂 Project loaded successfully!");
      } else {
        // Try importing as single vanilla JSON
        importVanillaAdvancement(data, file.name.replace(".json", ""));
      }
    } catch (err) {
      showToast("❌ Invalid JSON file format!");
      console.error(err);
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function importVanillaAdvancement(json, filename) {
  const newId = filename || `imported_${Date.now()}`;
  const criteriaList = [];

  if (json.criteria) {
    Object.keys(json.criteria).forEach(k => {
      criteriaList.push({
        id: k,
        trigger: json.criteria[k].trigger || "minecraft:tick",
        conditions: json.criteria[k].conditions || {}
      });
    });
  }

  const newAdv = {
    id: newId,
    parent: json.parent ? json.parent.split(':').pop() : null,
    x: 400,
    y: 300,
    display: {
      title: json.display?.title?.text || json.display?.title || newId,
      description: json.display?.description?.text || json.display?.description || "",
      icon: json.display?.icon?.item || "minecraft:grass_block",
      frame: json.display?.frame || "task",
      show_toast: json.display?.show_toast !== false,
      announce_to_chat: json.display?.announce_to_chat !== false,
      hidden: !!json.display?.hidden,
      background: json.display?.background || ""
    },
    criteria: criteriaList.length > 0 ? criteriaList : [{ id: "req_1", trigger: "minecraft:tick", conditions: {} }],
    requirementsMode: (json.requirements && json.requirements.length > 1 && json.requirements[0].length === 1) ? "OR" : "AND",
    customRequirements: json.requirements || [],
    rewards: json.rewards || { experience: 0, recipes: [], function: "", loot: [] }
  };

  state.advancements.push(newAdv);
  renderAll();
  selectAdvancement(newId);
  showToast(`📥 Imported vanilla advancement "${newAdv.display.title}"!`);
}

// ==========================================
// 16. TOAST NOTIFICATIONS & UTILS
// ==========================================
function showToast(message) {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'mc-toast';
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function createToastContainer() {
  const div = document.createElement('div');
  div.id = 'toastContainer';
  div.className = 'toast-container';
  document.body.appendChild(div);
  return div;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// ==========================================
// 17. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadItemsDatabase();
  state.advancements = JSON.parse(JSON.stringify(sampleAdvancements));
  state.selectedId = state.advancements[0].id;

  initCanvasEvents();
  initItemPickerEvents();
  updateCanvasTransform();
  renderAll();
});
