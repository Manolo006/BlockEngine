/**
 * EXECUTE COMMAND BUILDER - MINECRAFT JAVA EDITION
 * Block-Based /execute Pipeline Builder, Presets & NBT Reference
 */

// ==========================================
// 1. SUBCOMMAND DEFINITIONS & SCHEMAS
// ==========================================
const SUBCOMMAND_TYPES = {
  // --- CONTEXT ---
  as: {
    category: "context",
    name: "as <targets>",
    desc: "Changes the executing entity (affects @s, permissions)",
    defaultParams: { targets: "@a" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Target:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@a, @e[type=zombie], @p">
      </div>
    `,
    compile: (params) => `as ${params.targets || '@a'}`
  },
  at: {
    category: "context",
    name: "at <targets>",
    desc: "Executes at the position, rotation, and dimension of the target",
    defaultParams: { targets: "@s" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Target:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@s, @p, @a">
      </div>
    `,
    compile: (params) => `at ${params.targets || '@s'}`
  },
  in: {
    category: "context",
    name: "in <dimension>",
    desc: "Changes the execution dimension without altering coordinates",
    defaultParams: { dimension: "minecraft:overworld" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Dimension:</label>
        <select class="cmd-select" onchange="${onChange}('dimension', this.value)">
          <option value="minecraft:overworld" ${params.dimension === 'minecraft:overworld' ? 'selected' : ''}>minecraft:overworld</option>
          <option value="minecraft:the_nether" ${params.dimension === 'minecraft:the_nether' ? 'selected' : ''}>minecraft:the_nether</option>
          <option value="minecraft:the_end" ${params.dimension === 'minecraft:the_end' ? 'selected' : ''}>minecraft:the_end</option>
        </select>
      </div>
    `,
    compile: (params) => `in ${params.dimension || 'minecraft:overworld'}`
  },
  on: {
    category: "context",
    name: "on <relation>",
    desc: "Changes executing entity to a related entity (Java 1.19.4+)",
    defaultParams: { relation: "attacker" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Relation:</label>
        <select class="cmd-select" onchange="${onChange}('relation', this.value)">
          <option value="attacker" ${params.relation === 'attacker' ? 'selected' : ''}>attacker (Last entity that damaged this)</option>
          <option value="controller" ${params.relation === 'controller' ? 'selected' : ''}>controller (Entity controlling this mount)</option>
          <option value="leasher" ${params.relation === 'leasher' ? 'selected' : ''}>leasher (Entity holding the lead)</option>
          <option value="origin" ${params.relation === 'origin' ? 'selected' : ''}>origin (Summoner or shooter of projectile)</option>
          <option value="owner" ${params.relation === 'owner' ? 'selected' : ''}>owner (Tameable animal owner)</option>
          <option value="passengers" ${params.relation === 'passengers' ? 'selected' : ''}>passengers (Entities riding this)</option>
          <option value="target" ${params.relation === 'target' ? 'selected' : ''}>target (Entity mob is attacking)</option>
          <option value="vehicle" ${params.relation === 'vehicle' ? 'selected' : ''}>vehicle (Entity this is riding)</option>
        </select>
      </div>
    `,
    compile: (params) => `on ${params.relation || 'attacker'}`
  },
  summon: {
    category: "context",
    name: "summon <entity>",
    desc: "Spawns a new entity and executes context as it (Java 1.20+)",
    defaultParams: { entity: "minecraft:marker" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Entity ID:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.entity)}" oninput="${onChange}('entity', this.value)" placeholder="minecraft:marker, minecraft:armor_stand">
      </div>
    `,
    compile: (params) => `summon ${params.entity || 'minecraft:marker'}`
  },

  // --- POSITION & ROTATION ---
  positioned: {
    category: "position",
    name: "positioned <pos>",
    desc: "Changes execution position coordinates",
    defaultParams: { mode: "coords", pos: "~ ~1 ~", targets: "@s", heightmap: "world_surface" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Mode:</label>
        <select class="cmd-select" onchange="${onChange}('mode', this.value)">
          <option value="coords" ${params.mode === 'coords' ? 'selected' : ''}>Coordinates (~ ~ ~)</option>
          <option value="as" ${params.mode === 'as' ? 'selected' : ''}>as Target</option>
          <option value="over" ${params.mode === 'over' ? 'selected' : ''}>over Heightmap</option>
        </select>
      </div>
      ${params.mode === 'coords' ? `
        <div class="input-pill-group">
          <label>Position:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
        </div>
      ` : params.mode === 'as' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@p, @e[type=armor_stand]">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Heightmap:</label>
          <select class="cmd-select" onchange="${onChange}('heightmap', this.value)">
            <option value="world_surface" ${params.heightmap === 'world_surface' ? 'selected' : ''}>world_surface</option>
            <option value="motion_blocking" ${params.heightmap === 'motion_blocking' ? 'selected' : ''}>motion_blocking</option>
            <option value="motion_blocking_no_leaves" ${params.heightmap === 'motion_blocking_no_leaves' ? 'selected' : ''}>motion_blocking_no_leaves</option>
            <option value="ocean_floor" ${params.heightmap === 'ocean_floor' ? 'selected' : ''}>ocean_floor</option>
          </select>
        </div>
      `}
    `,
    compile: (params) => {
      if (params.mode === 'as') return `positioned as ${params.targets || '@s'}`;
      if (params.mode === 'over') return `positioned over ${params.heightmap || 'world_surface'}`;
      return `positioned ${params.pos || '~ ~ ~'}`;
    }
  },
  align: {
    category: "position",
    name: "align <axes>",
    desc: "Truncates coordinates to block corners (floors coordinates)",
    defaultParams: { axes: "xyz" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Axes to Align:</label>
        <select class="cmd-select" onchange="${onChange}('axes', this.value)">
          <option value="xyz" ${params.axes === 'xyz' ? 'selected' : ''}>xyz (All axes)</option>
          <option value="xz" ${params.axes === 'xz' ? 'selected' : ''}>xz (Horizontal plane)</option>
          <option value="x" ${params.axes === 'x' ? 'selected' : ''}>x</option>
          <option value="y" ${params.axes === 'y' ? 'selected' : ''}>y</option>
          <option value="z" ${params.axes === 'z' ? 'selected' : ''}>z</option>
          <option value="xy" ${params.axes === 'xy' ? 'selected' : ''}>xy</option>
          <option value="yz" ${params.axes === 'yz' ? 'selected' : ''}>yz</option>
        </select>
      </div>
    `,
    compile: (params) => `align ${params.axes || 'xyz'}`
  },
  anchored: {
    category: "position",
    name: "anchored (feet|eyes)",
    desc: "Sets anchor point for facing and raycasting",
    defaultParams: { anchor: "eyes" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Anchor:</label>
        <select class="cmd-select" onchange="${onChange}('anchor', this.value)">
          <option value="eyes" ${params.anchor === 'eyes' ? 'selected' : ''}>eyes (Eye height)</option>
          <option value="feet" ${params.anchor === 'feet' ? 'selected' : ''}>feet (Feet position)</option>
        </select>
      </div>
    `,
    compile: (params) => `anchored ${params.anchor || 'eyes'}`
  },
  facing: {
    category: "position",
    name: "facing (<pos> | entity <targets> <anchor>)",
    desc: "Rotates execution towards a coordinate or entity",
    defaultParams: { mode: "pos", pos: "~ ~ ~", targets: "@p", anchor: "eyes" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Mode:</label>
        <select class="cmd-select" onchange="${onChange}('mode', this.value)">
          <option value="pos" ${params.mode === 'pos' ? 'selected' : ''}>Coordinate Position</option>
          <option value="entity" ${params.mode === 'entity' ? 'selected' : ''}>Entity</option>
        </select>
      </div>
      ${params.mode === 'pos' ? `
        <div class="input-pill-group">
          <label>Position:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@p">
        </div>
        <div class="input-pill-group">
          <label>Anchor:</label>
          <select class="cmd-select" onchange="${onChange}('anchor', this.value)">
            <option value="eyes" ${params.anchor === 'eyes' ? 'selected' : ''}>eyes</option>
            <option value="feet" ${params.anchor === 'feet' ? 'selected' : ''}>feet</option>
          </select>
        </div>
      `}
    `,
    compile: (params) => {
      if (params.mode === 'entity') return `facing entity ${params.targets || '@p'} ${params.anchor || 'eyes'}`;
      return `facing ${params.pos || '~ ~ ~'}`;
    }
  },
  rotated: {
    category: "position",
    name: "rotated (<rot> | as <targets>)",
    desc: "Sets rotation angles (yaw & pitch) or copies from entity",
    defaultParams: { mode: "as", rot: "~ 0", targets: "@p" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <label>Mode:</label>
        <select class="cmd-select" onchange="${onChange}('mode', this.value)">
          <option value="as" ${params.mode === 'as' ? 'selected' : ''}>as Target</option>
          <option value="rot" ${params.mode === 'rot' ? 'selected' : ''}>Angles (~yaw ~pitch)</option>
        </select>
      </div>
      ${params.mode === 'as' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@p">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Yaw Pitch:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.rot)}" oninput="${onChange}('rot', this.value)" placeholder="~ 0">
        </div>
      `}
    `,
    compile: (params) => {
      if (params.mode === 'rot') return `rotated ${params.rot || '~ 0'}`;
      return `rotated as ${params.targets || '@p'}`;
    }
  },

  // --- STORE ---
  store: {
    category: "store",
    name: "store (result|success) ...",
    desc: "Stores command numeric return value into score, NBT, storage, or bossbar",
    defaultParams: {
      mode: "result", // result | success
      targetType: "score", // score | block | entity | bossbar | storage
      target: "@s",
      objective: "my_score",
      pos: "~ ~ ~",
      path: "Pos[0]",
      storage: "custom:data",
      bossbar: "minecraft:custom_bar",
      bossbarMode: "value",
      type: "int",
      scale: "1"
    },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.mode === 'result' ? 'active-if' : 'active-unless'}" onclick="${onChange}('mode', '${params.mode === 'result' ? 'success' : 'result'}')">
          ${params.mode.toUpperCase()}
        </button>
      </div>
      <div class="input-pill-group">
        <label>Target Type:</label>
        <select class="cmd-select" onchange="${onChange}('targetType', this.value)">
          <option value="score" ${params.targetType === 'score' ? 'selected' : ''}>score (Scoreboard)</option>
          <option value="entity" ${params.targetType === 'entity' ? 'selected' : ''}>entity (Entity NBT)</option>
          <option value="block" ${params.targetType === 'block' ? 'selected' : ''}>block (Block NBT)</option>
          <option value="storage" ${params.targetType === 'storage' ? 'selected' : ''}>storage (Command Storage)</option>
          <option value="bossbar" ${params.targetType === 'bossbar' ? 'selected' : ''}>bossbar</option>
        </select>
      </div>

      ${params.targetType === 'score' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.target)}" oninput="${onChange}('target', this.value)" placeholder="@s">
        </div>
        <div class="input-pill-group">
          <label>Objective:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.objective)}" oninput="${onChange}('objective', this.value)" placeholder="objective_name">
        </div>
      ` : params.targetType === 'entity' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.target)}" oninput="${onChange}('target', this.value)" placeholder="@s">
        </div>
        <div class="input-pill-group">
          <label>NBT Path:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.path)}" oninput="${onChange}('path', this.value)" placeholder="Health, Motion[0]">
        </div>
        <div class="input-pill-group">
          <label>Type:</label>
          <select class="cmd-select" onchange="${onChange}('type', this.value)">
            <option value="byte" ${params.type === 'byte' ? 'selected' : ''}>byte</option>
            <option value="short" ${params.type === 'short' ? 'selected' : ''}>short</option>
            <option value="int" ${params.type === 'int' ? 'selected' : ''}>int</option>
            <option value="long" ${params.type === 'long' ? 'selected' : ''}>long</option>
            <option value="float" ${params.type === 'float' ? 'selected' : ''}>float</option>
            <option value="double" ${params.type === 'double' ? 'selected' : ''}>double</option>
          </select>
        </div>
        <div class="input-pill-group">
          <label>Scale:</label>
          <input type="text" class="cmd-input" style="width: 50px;" value="${escapeHtml(params.scale)}" oninput="${onChange}('scale', this.value)" placeholder="1">
        </div>
      ` : params.targetType === 'block' ? `
        <div class="input-pill-group">
          <label>Pos:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
        </div>
        <div class="input-pill-group">
          <label>NBT Path:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.path)}" oninput="${onChange}('path', this.value)" placeholder="Items[0].Count">
        </div>
        <div class="input-pill-group">
          <label>Type:</label>
          <select class="cmd-select" onchange="${onChange}('type', this.value)">
            <option value="int" ${params.type === 'int' ? 'selected' : ''}>int</option>
            <option value="float" ${params.type === 'float' ? 'selected' : ''}>float</option>
            <option value="double" ${params.type === 'double' ? 'selected' : ''}>double</option>
          </select>
        </div>
        <div class="input-pill-group">
          <label>Scale:</label>
          <input type="text" class="cmd-input" style="width: 50px;" value="${escapeHtml(params.scale)}" oninput="${onChange}('scale', this.value)" placeholder="1">
        </div>
      ` : params.targetType === 'storage' ? `
        <div class="input-pill-group">
          <label>Storage:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.storage)}" oninput="${onChange}('storage', this.value)" placeholder="namespace:key">
        </div>
        <div class="input-pill-group">
          <label>Path:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.path)}" oninput="${onChange}('path', this.value)" placeholder="my.data.count">
        </div>
        <div class="input-pill-group">
          <label>Scale:</label>
          <input type="text" class="cmd-input" style="width: 50px;" value="${escapeHtml(params.scale)}" oninput="${onChange}('scale', this.value)" placeholder="1">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Bossbar ID:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.bossbar)}" oninput="${onChange}('bossbar', this.value)" placeholder="minecraft:custom_bar">
        </div>
        <div class="input-pill-group">
          <label>Mode:</label>
          <select class="cmd-select" onchange="${onChange}('bossbarMode', this.value)">
            <option value="value" ${params.bossbarMode === 'value' ? 'selected' : ''}>value (Current value)</option>
            <option value="max" ${params.bossbarMode === 'max' ? 'selected' : ''}>max (Max value)</option>
          </select>
        </div>
      `}
    `,
    compile: (params) => {
      const mode = params.mode || 'result';
      if (params.targetType === 'score') {
        return `store ${mode} score ${params.target || '@s'} ${params.objective || 'score'}`;
      } else if (params.targetType === 'entity') {
        return `store ${mode} entity ${params.target || '@s'} ${params.path || 'Health'} ${params.type || 'int'} ${params.scale || '1'}`;
      } else if (params.targetType === 'block') {
        return `store ${mode} block ${params.pos || '~ ~ ~'} ${params.path || 'Items[0].Count'} ${params.type || 'int'} ${params.scale || '1'}`;
      } else if (params.targetType === 'storage') {
        return `store ${mode} storage ${params.storage || 'custom:data'} ${params.path || 'val'} ${params.type || 'int'} ${params.scale || '1'}`;
      } else if (params.targetType === 'bossbar') {
        return `store ${mode} bossbar ${params.bossbar || 'minecraft:custom'} ${params.bossbarMode || 'value'}`;
      }
      return `store ${mode} score @s score`;
    }
  },

  // --- CONDITIONS (if / unless) ---
  condition_block: {
    category: "condition",
    name: "if/unless block <pos> <block>",
    desc: "Checks if a block matches ID/blockstate at coordinates",
    defaultParams: { condition: "if", pos: "~ ~-1 ~", block: "minecraft:diamond_block" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <span style="font-weight: bold; color: #ffaa00; font-size: 11px;">BLOCK</span>
      </div>
      <div class="input-pill-group">
        <label>Pos:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~-1 ~">
      </div>
      <div class="input-pill-group">
        <label>Block ID:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.block)}" oninput="${onChange}('block', this.value)" placeholder="minecraft:stone">
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} block ${params.pos || '~ ~-1 ~'} ${params.block || 'minecraft:stone'}`
  },

  condition_entity: {
    category: "condition",
    name: "if/unless entity <targets>",
    desc: "Checks if specified entity exists / is matched",
    defaultParams: { condition: "if", targets: "@e[type=zombie,distance=..10]" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <span style="font-weight: bold; color: #ffaa00; font-size: 11px;">ENTITY</span>
      </div>
      <div class="input-pill-group">
        <label>Target:</label>
        <input type="text" class="cmd-input" style="min-width: 200px;" value="${escapeHtml(params.targets)}" oninput="${onChange}('targets', this.value)" placeholder="@e[type=zombie,distance=..10]">
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} entity ${params.targets || '@e'}`
  },

  condition_score: {
    category: "condition",
    name: "if/unless score ...",
    desc: "Compares scoreboard scores between entities or matches integer range",
    defaultParams: {
      condition: "if",
      mode: "matches", // matches | compare
      target: "@s",
      objective: "points",
      range: "10..",
      op: ">=",
      source: "#target",
      sourceObjective: "points"
    },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <label>Mode:</label>
        <select class="cmd-select" onchange="${onChange}('mode', this.value)">
          <option value="matches" ${params.mode === 'matches' ? 'selected' : ''}>matches Range (e.g. 5..10)</option>
          <option value="compare" ${params.mode === 'compare' ? 'selected' : ''}>compare with Score</option>
        </select>
      </div>
      <div class="input-pill-group">
        <label>Target:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.target)}" oninput="${onChange}('target', this.value)" placeholder="@s">
      </div>
      <div class="input-pill-group">
        <label>Objective:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.objective)}" oninput="${onChange}('objective', this.value)" placeholder="objective">
      </div>

      ${params.mode === 'matches' ? `
        <div class="input-pill-group">
          <label>Range:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.range)}" oninput="${onChange}('range', this.value)" placeholder="10.., 1..5, 0">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Op:</label>
          <select class="cmd-select" onchange="${onChange}('op', this.value)">
            <option value="=" ${params.op === '=' ? 'selected' : ''}>=</option>
            <option value="<" ${params.op === '<' ? 'selected' : ''}>&lt;</option>
            <option value="<=" ${params.op === '<=' ? 'selected' : ''}>&lt;=</option>
            <option value=">" ${params.op === '>' ? 'selected' : ''}>&gt;</option>
            <option value=">=" ${params.op === '>=' ? 'selected' : ''}>&gt;=</option>
          </select>
        </div>
        <div class="input-pill-group">
          <label>Source Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.source)}" oninput="${onChange}('source', this.value)" placeholder="#global">
        </div>
        <div class="input-pill-group">
          <label>Source Objective:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.sourceObjective)}" oninput="${onChange}('sourceObjective', this.value)" placeholder="objective">
        </div>
      `}
    `,
    compile: (params) => {
      const cond = params.condition || 'if';
      if (params.mode === 'compare') {
        return `${cond} score ${params.target || '@s'} ${params.objective || 'score'} ${params.op || '='} ${params.source || '#source'} ${params.sourceObjective || params.objective || 'score'}`;
      }
      return `${cond} score ${params.target || '@s'} ${params.objective || 'score'} matches ${params.range || '1..'}`;
    }
  },

  condition_data: {
    category: "condition",
    name: "if/unless data (block|entity|storage)",
    desc: "Checks if an NBT path exists and is not null/empty",
    defaultParams: { condition: "if", type: "entity", target: "@s", pos: "~ ~ ~", storage: "custom:data", path: "SelectedItem" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <label>Data Type:</label>
        <select class="cmd-select" onchange="${onChange}('type', this.value)">
          <option value="entity" ${params.type === 'entity' ? 'selected' : ''}>entity</option>
          <option value="block" ${params.type === 'block' ? 'selected' : ''}>block</option>
          <option value="storage" ${params.type === 'storage' ? 'selected' : ''}>storage</option>
        </select>
      </div>
      ${params.type === 'entity' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.target)}" oninput="${onChange}('target', this.value)" placeholder="@s">
        </div>
      ` : params.type === 'block' ? `
        <div class="input-pill-group">
          <label>Pos:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Storage:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.storage)}" oninput="${onChange}('storage', this.value)" placeholder="custom:data">
        </div>
      `}
      <div class="input-pill-group">
        <label>NBT Path:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.path)}" oninput="${onChange}('path', this.value)" placeholder="SelectedItem, Pos[0], CustomName">
      </div>
    `,
    compile: (params) => {
      const cond = params.condition || 'if';
      if (params.type === 'block') return `${cond} data block ${params.pos || '~ ~ ~'} ${params.path || 'Items'}`;
      if (params.type === 'storage') return `${cond} data storage ${params.storage || 'custom:data'} ${params.path || 'val'}`;
      return `${cond} data entity ${params.target || '@s'} ${params.path || 'SelectedItem'}`;
    }
  },

  condition_biome: {
    category: "condition",
    name: "if/unless biome <pos> <biome>",
    desc: "Checks if a coordinate is inside a specific biome (Java 1.19+)",
    defaultParams: { condition: "if", pos: "~ ~ ~", biome: "minecraft:desert" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <span style="font-weight: bold; color: #ffaa00; font-size: 11px;">BIOME</span>
      </div>
      <div class="input-pill-group">
        <label>Pos:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
      </div>
      <div class="input-pill-group">
        <label>Biome:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.biome)}" oninput="${onChange}('biome', this.value)" placeholder="minecraft:plains">
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} biome ${params.pos || '~ ~ ~'} ${params.biome || 'minecraft:plains'}`
  },

  condition_dimension: {
    category: "condition",
    name: "if/unless dimension <dimension>",
    desc: "Checks if current execution context is in dimension (Java 1.19+)",
    defaultParams: { condition: "if", dimension: "minecraft:the_nether" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <label>Dimension:</label>
        <select class="cmd-select" onchange="${onChange}('dimension', this.value)">
          <option value="minecraft:overworld" ${params.dimension === 'minecraft:overworld' ? 'selected' : ''}>minecraft:overworld</option>
          <option value="minecraft:the_nether" ${params.dimension === 'minecraft:the_nether' ? 'selected' : ''}>minecraft:the_nether</option>
          <option value="minecraft:the_end" ${params.dimension === 'minecraft:the_end' ? 'selected' : ''}>minecraft:the_end</option>
        </select>
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} dimension ${params.dimension || 'minecraft:overworld'}`
  },

  condition_loaded: {
    category: "condition",
    name: "if/unless loaded <pos>",
    desc: "Checks if chunks at given coordinates are loaded (Java 1.19+)",
    defaultParams: { condition: "if", pos: "~ ~ ~" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <span style="font-weight: bold; color: #ffaa00; font-size: 11px;">LOADED CHUNK</span>
      </div>
      <div class="input-pill-group">
        <label>Pos:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} loaded ${params.pos || '~ ~ ~'}`
  },

  condition_predicate: {
    category: "condition",
    name: "if/unless predicate <predicate>",
    desc: "Evaluates a custom datapack predicate JSON file",
    defaultParams: { condition: "if", predicate: "custom:is_raining_and_night" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <label>Predicate Path:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.predicate)}" oninput="${onChange}('predicate', this.value)" placeholder="namespace:predicate_name">
      </div>
    `,
    compile: (params) => `${params.condition || 'if'} predicate ${params.predicate || 'custom:pred'}`
  },

  condition_items: {
    category: "condition",
    name: "if/unless items (block|entity) (1.20.5+)",
    desc: "Checks items in container slots or entity equipment (Java 1.20.5+)",
    defaultParams: {
      condition: "if",
      type: "entity",
      target: "@s",
      pos: "~ ~ ~",
      slots: "weapon.mainhand",
      predicate: "minecraft:diamond_sword"
    },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group">
        <button type="button" class="toggle-pill ${params.condition === 'if' ? 'active-if' : 'active-unless'}" onclick="${onChange}('condition', '${params.condition === 'if' ? 'unless' : 'if'}')">
          ${params.condition.toUpperCase()}
        </button>
        <label>Target Type:</label>
        <select class="cmd-select" onchange="${onChange}('type', this.value)">
          <option value="entity" ${params.type === 'entity' ? 'selected' : ''}>entity</option>
          <option value="block" ${params.type === 'block' ? 'selected' : ''}>block</option>
        </select>
      </div>
      ${params.type === 'entity' ? `
        <div class="input-pill-group">
          <label>Target:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.target)}" oninput="${onChange}('target', this.value)" placeholder="@s">
        </div>
      ` : `
        <div class="input-pill-group">
          <label>Pos:</label>
          <input type="text" class="cmd-input" value="${escapeHtml(params.pos)}" oninput="${onChange}('pos', this.value)" placeholder="~ ~ ~">
        </div>
      `}
      <div class="input-pill-group">
        <label>Slots:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.slots)}" oninput="${onChange}('slots', this.value)" placeholder="weapon.mainhand, armor.*, container.0">
      </div>
      <div class="input-pill-group">
        <label>Item Predicate:</label>
        <input type="text" class="cmd-input" value="${escapeHtml(params.predicate)}" oninput="${onChange}('predicate', this.value)" placeholder="minecraft:diamond_sword">
      </div>
    `,
    compile: (params) => {
      const cond = params.condition || 'if';
      if (params.type === 'block') {
        return `${cond} items block ${params.pos || '~ ~ ~'} ${params.slots || 'container.*'} ${params.predicate || 'minecraft:diamond'}`;
      }
      return `${cond} items entity ${params.target || '@s'} ${params.slots || 'weapon.mainhand'} ${params.predicate || 'minecraft:diamond_sword'}`;
    }
  },

  // --- EXECUTION (RUN) ---
  run: {
    category: "execution",
    name: "run <command>",
    desc: "The final command to execute once context and conditions pass",
    defaultParams: { command: "say Hello World!" },
    renderInputs: (params, onChange) => `
      <div class="input-pill-group" style="flex: 1;">
        <label style="color: #ffaa00; font-weight: bold;">Run Command:</label>
        <input type="text" class="cmd-input" style="flex: 1; min-width: 250px; font-weight: bold; color: #55ff55;" value="${escapeHtml(params.command)}" oninput="${onChange}('command', this.value)" placeholder="say Hi, tp @s ~ ~10 ~, give @s diamond 1, kill, setblock ~ ~-1 ~ stone">
      </div>
    `,
    compile: (params) => `run ${params.command || 'say Done'}`
  }
};

// ==========================================
// 2. STATE & PRESETS
// ==========================================
let activePipeline = [
  { id: "c1", type: "as", params: { targets: "@a" } },
  { id: "c2", type: "at", params: { targets: "@s" } },
  { id: "c3", type: "condition_block", params: { condition: "if", pos: "~ ~-1 ~", block: "minecraft:diamond_block" } },
  { id: "c4", type: "run", params: { command: "say Standing on a Diamond Block!" } }
];

const PRESETS = [
  {
    title: "Detect Block Underneath Player",
    desc: "Executes command only if the player is standing on a specific block.",
    pipeline: [
      { type: "as", params: { targets: "@a" } },
      { type: "at", params: { targets: "@s" } },
      { type: "condition_block", params: { condition: "if", pos: "~ ~-1 ~", block: "minecraft:gold_block" } },
      { type: "run", params: { command: 'title @s subtitle {"text":"Gold Master!","color":"gold"}' } }
    ]
  },
  {
    title: "Store Entity Health into Bossbar",
    desc: "Reads the current Health of the nearest boss and stores it dynamically in a bossbar.",
    pipeline: [
      { type: "as", params: { targets: "@e[type=wither,limit=1]" } },
      { type: "store", params: { mode: "result", targetType: "bossbar", bossbar: "minecraft:wither_bar", bossbarMode: "value" } },
      { type: "run", params: { command: "data get entity @s Health" } }
    ]
  },
  {
    title: "Raycast Forward Step",
    desc: "Steps forward incrementally in the direction the player is looking.",
    pipeline: [
      { type: "positioned", params: { mode: "coords", pos: "^ ^ ^0.5" } },
      { type: "condition_block", params: { condition: "if", pos: "~ ~ ~", block: "minecraft:air" } },
      { type: "run", params: { command: "function custom:raycast/step" } }
    ]
  },
  {
    title: "Execute on Attacker (1.19.4+)",
    desc: "Whenever a player takes damage, executes directly on the entity that attacked them.",
    pipeline: [
      { type: "as", params: { targets: "@a[tag=damaged]" } },
      { type: "on", params: { relation: "attacker" } },
      { type: "run", params: { command: "effect give @s glowing 5 1" } }
    ]
  },
  {
    title: "Summon Marker at Highest Surface (1.20+)",
    desc: "Executes positioned over the highest surface block and summons a marker.",
    pipeline: [
      { type: "as", params: { targets: "@p" } },
      { type: "at", params: { targets: "@s" } },
      { type: "positioned", params: { mode: "over", heightmap: "world_surface" } },
      { type: "run", params: { command: "summon marker ~ ~ ~ {Tags:[\"surface_point\"]}" } }
    ]
  }
];

// ==========================================
// 3. PIPELINE COMPILER & RENDERER
// ==========================================
function compileFullCommand() {
  if (activePipeline.length === 0) return "/execute";

  const parts = activePipeline.map(item => {
    const def = SUBCOMMAND_TYPES[item.type];
    if (!def) return "";
    return def.compile(item.params);
  }).filter(s => s.length > 0);

  return `/execute ${parts.join(' ')}`;
}

function renderPipeline() {
  const container = document.getElementById('pipelineContainer');
  const codePreview = document.getElementById('commandCodeText');
  const statusBadge = document.getElementById('commandStatusBadge');

  const fullCmd = compileFullCommand();
  codePreview.innerHTML = highlightMinecraftCommand(fullCmd);

  // Status check
  const hasRun = activePipeline.some(c => c.type === 'run');
  if (activePipeline.length === 0) {
    statusBadge.innerHTML = "⚪ Empty Chain";
    statusBadge.style.background = "#333";
    statusBadge.style.color = "#aaa";
    statusBadge.style.borderColor = "#555";
  } else if (!hasRun) {
    statusBadge.innerHTML = "⚠️ Missing 'run <cmd>' at end";
    statusBadge.style.background = "#553300";
    statusBadge.style.color = "#ffaa00";
    statusBadge.style.borderColor = "#aa5500";
  } else {
    statusBadge.innerHTML = "✅ Valid /execute Command";
    statusBadge.style.background = "#143a14";
    statusBadge.style.color = "#55ff55";
    statusBadge.style.borderColor = "#00aa00";
  }

  if (activePipeline.length === 0) {
    container.innerHTML = `
      <div class="empty-pipeline-msg">
        <h4>Your /execute chain is empty</h4>
        <p>Click any subcommand from the left sidebar or load a preset to start building!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  activePipeline.forEach((item, index) => {
    const def = SUBCOMMAND_TYPES[item.type];
    if (!def) return;

    const card = document.createElement('div');
    card.className = `cmd-card card-${def.category}`;
    card.id = `card-${item.id}`;

    const onChangeFn = `handleParamChange.bind(null, '${item.id}')`;
    const inputsHtml = def.renderInputs(item.params, onChangeFn);

    card.innerHTML = `
      <div class="cmd-card-header">
        <div class="cmd-card-title">
          <span class="cmd-category-tag tag-${def.category}">${def.category}</span>
          <span style="font-family: monospace; color: #fff; font-size: 13px;">${escapeHtml(def.name)}</span>
        </div>
        <div class="cmd-card-actions">
          <button class="card-icon-btn" onclick="moveSubcommand(${index}, -1)" title="Move Up" ${index === 0 ? 'disabled style="opacity: 0.3;"' : ''}>▲</button>
          <button class="card-icon-btn" onclick="moveSubcommand(${index}, 1)" title="Move Down" ${index === activePipeline.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>▼</button>
          <button class="card-icon-btn" onclick="duplicateSubcommand(${index})" title="Duplicate">⎘</button>
          <button class="card-icon-btn btn-del" onclick="deleteSubcommand(${index})" title="Delete">✕</button>
        </div>
      </div>
      <div class="cmd-card-body">
        ${inputsHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

function highlightMinecraftCommand(cmd) {
  return cmd
    .replace(/(\/execute)/g, '<span class="hl-kw">$1</span>')
    .replace(/\b(as|at|in|on|summon|positioned|align|anchored|facing|rotated|store|run)\b/g, '<span class="hl-sub">$1</span>')
    .replace(/\b(if|unless)\b/g, '<span class="hl-cond">$1</span>')
    .replace(/(@[parse]\[.*?\]|@[parse])/g, '<span class="hl-sel">$1</span>')
    .replace(/(~[0-9.-]*|\^[0-9.-]*|\b[0-9]+\b)/g, '<span class="hl-num">$1</span>');
}

// ==========================================
// 4. SUBCOMMAND INTERACTIONS
// ==========================================
function addSubcommand(type) {
  const def = SUBCOMMAND_TYPES[type];
  if (!def) return;

  const newItem = {
    id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type: type,
    params: JSON.parse(JSON.stringify(def.defaultParams))
  };

  // If there's a 'run' command, insert right before 'run', otherwise append to end
  const runIndex = activePipeline.findIndex(c => c.type === 'run');
  if (type !== 'run' && runIndex !== -1) {
    activePipeline.splice(runIndex, 0, newItem);
  } else {
    activePipeline.push(newItem);
  }

  renderPipeline();
  showToast(`➕ Added '${def.name}' to chain`);
}

function handleParamChange(id, field, value) {
  const item = activePipeline.find(c => c.id === id);
  if (item) {
    item.params[field] = value;
    renderPipeline();
  }
}

function moveSubcommand(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= activePipeline.length) return;

  const temp = activePipeline[index];
  activePipeline[index] = activePipeline[targetIndex];
  activePipeline[targetIndex] = temp;
  renderPipeline();
}

function duplicateSubcommand(index) {
  const item = activePipeline[index];
  if (!item) return;

  const copy = {
    id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type: item.type,
    params: JSON.parse(JSON.stringify(item.params))
  };

  activePipeline.splice(index + 1, 0, copy);
  renderPipeline();
  showToast("⎘ Duplicated block");
}

function deleteSubcommand(index) {
  activePipeline.splice(index, 1);
  renderPipeline();
}

function clearPipeline() {
  activePipeline = [];
  renderPipeline();
  showToast("🧹 Cleared command chain");
}

// ==========================================
// 5. CLIPBOARD & EXPORT
// ==========================================
function copyCommand() {
  const cmd = compileFullCommand();
  navigator.clipboard.writeText(cmd).then(() => {
    showToast("📋 Command copied to clipboard!");
  });
}

function exportMcFunction() {
  const cmd = compileFullCommand();
  const fileContent = `# Auto-generated by BlockEngine Execute Builder\n${cmd}\n`;
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "execute_command.mcfunction";
  a.click();
  URL.revokeObjectURL(url);
  showToast("💾 Exported as .mcfunction!");
}

// ==========================================
// 6. PRESETS CONTROLLER
// ==========================================
function openPresetsModal() {
  const modal = document.getElementById('presetsModal');
  const grid = document.getElementById('presetGrid');
  modal.classList.add('open');

  grid.innerHTML = '';
  PRESETS.forEach(preset => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `
      <div class="preset-title">${escapeHtml(preset.title)}</div>
      <div class="preset-desc">${escapeHtml(preset.desc)}</div>
      <div class="preset-code">${escapeHtml(preset.pipeline.map(p => SUBCOMMAND_TYPES[p.type].compile(p.params)).join(' '))}</div>
    `;

    card.addEventListener('click', () => {
      loadPreset(preset);
      closePresetsModal();
    });

    grid.appendChild(card);
  });
}

function closePresetsModal() {
  document.getElementById('presetsModal').classList.remove('open');
}

function loadPreset(preset) {
  activePipeline = preset.pipeline.map(p => ({
    id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type: p.type,
    params: JSON.parse(JSON.stringify(p.params))
  }));
  renderPipeline();
  showToast(`⚡ Loaded preset "${preset.title}"`);
}

// ==========================================
// 7. DATA GET & NBT REFERENCE MODAL
// ==========================================
const DATA_GET_CATEGORIES = [
  {
    title: "Common Entity Tags",
    items: [
      { name: "Pos", path: "Pos", desc: "Coordinates [X, Y, Z] as doubles", example: "/data get entity @s Pos" },
      { name: "Motion", path: "Motion", desc: "Velocity vector [dx, dy, dz]", example: "/data get entity @s Motion" },
      { name: "Rotation", path: "Rotation", desc: "Angle [Yaw, Pitch] as floats", example: "/data get entity @s Rotation" },
      { name: "Health", path: "Health", desc: "Current health value (float)", example: "/data get entity @s Health" },
      { name: "SelectedItem", path: "SelectedItem", desc: "Item held in player's main hand", example: "/data get entity @s SelectedItem" },
      { name: "Inventory", path: "Inventory", desc: "Full inventory array of player", example: "/data get entity @s Inventory" },
      { name: "ArmorItems", path: "ArmorItems", desc: "Armor slots [Feet, Legs, Chest, Head]", example: "/data get entity @s ArmorItems" },
      { name: "HandItems", path: "HandItems", desc: "Mainhand & Offhand items for mobs", example: "/data get entity @e[type=zombie,limit=1] HandItems" },
      { name: "CustomName", path: "CustomName", desc: "Custom name JSON string", example: "/data get entity @s CustomName" },
      { name: "NoAI / Invulnerable", path: "NoAI", desc: "Entity status flags (1b / 0b)", example: "/data get entity @e[type=villager,limit=1] NoAI" }
    ]
  },
  {
    title: "Block Entity Tags",
    items: [
      { name: "Items", path: "Items", desc: "Container contents (Chests, Barrels, Hoppers)", example: "/data get block ~ ~ ~ Items" },
      { name: "BurnTime / CookTime", path: "BurnTime", desc: "Furnace fuel & cooking ticks progress", example: "/data get block ~ ~ ~ CookTime" },
      { name: "RecordItem", path: "RecordItem", desc: "Music disc inside Jukebox", example: "/data get block ~ ~ ~ RecordItem" },
      { name: "Bees", path: "Bees", desc: "List of bees inside Beehive / Nest", example: "/data get block ~ ~ ~ Bees" },
      { name: "Patterns", path: "Patterns", desc: "Banner design layers list", example: "/data get block ~ ~ ~ Patterns" },
      { name: "Primary / Secondary", path: "primary_effect", desc: "Beacon active status effects", example: "/data get block ~ ~ ~ primary_effect" },
      { name: "Command", path: "Command", desc: "Command string in Command Block", example: "/data get block ~ ~ ~ Command" }
    ]
  },
  {
    title: "Command Storage & Scale",
    items: [
      { name: "Virtual Storage", path: "storage", desc: "Custom JSON compound storage for datapacks", example: "/data get storage namespace:data root.score" },
      { name: "Scale Multiplier", path: "scale", desc: "Scale float values into integer scores", example: "/execute store result score @s hp run data get entity @s Health 10" }
    ]
  }
];

function openDataGetModal() {
  const modal = document.getElementById('dataGetModal');
  const body = document.getElementById('dataGetModalBody');
  modal.classList.add('open');

  let html = `
    <div style="margin-bottom: 16px; color: #ccc; font-size: 12px; line-height: 1.5;">
      The <code>/data get</code> command inspects NBT data for entities, block entities, or virtual storage in Minecraft Java Edition. 
      Click any example below to copy or insert directly into your execute pipeline!
    </div>
  `;

  DATA_GET_CATEGORIES.forEach(cat => {
    html += `
      <div style="margin-bottom: 18px;">
        <h4 style="color: #ffaa00; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #444; padding-bottom: 4px;">${cat.title}</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
    `;

    cat.items.forEach(item => {
      html += `
        <div style="background: #191919; border: 1px solid #333; padding: 8px 10px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #55ff55; font-size: 12px;">${item.name}</strong>
            <code style="font-size: 10px; color: #ffa600;">${item.path}</code>
          </div>
          <span style="font-size: 10px; color: #888;">${item.desc}</span>
          <div style="display: flex; align-items: center; justify-content: space-between; background: #0c0c0c; padding: 4px 6px; border-radius: 3px; margin-top: 4px;">
            <code style="font-size: 10px; color: #55ffff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.example}</code>
            <button class="card-icon-btn" style="width: 20px; height: 20px; font-size: 10px;" onclick="copyString('${escapeHtml(item.example)}')" title="Copy Command">📋</button>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  body.innerHTML = html;
}

function closeDataGetModal() {
  document.getElementById('dataGetModal').classList.remove('open');
}

function copyString(str) {
  navigator.clipboard.writeText(str).then(() => {
    showToast("📋 Copied to clipboard!");
  });
}

// ==========================================
// 8. ACCORDION & TOASTS
// ==========================================
function toggleAccordion(headerEl) {
  const categoryEl = headerEl.closest('.accordion-category');
  categoryEl.classList.toggle('collapsed');
}

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
// 9. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderPipeline();
});
