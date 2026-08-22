// Blocchi disponibili e i loro parametri
const blockTypes = {
  setblock: {
    label: "SetBlock",
    params: ["Block", "X", "Y", "Z"],
    generator: (vals) => `setblock ${vals.X} ${vals.Y} ${vals.Z} minecraft:${vals.Block}`,
    canHaveChildren: false
  },
  summon: {
    label: "Summon",
    params: ["Entity", "X", "Y", "Z"],
    generator: (vals) => `summon ${vals.Entity} ${vals.X} ${vals.Y} ${vals.Z}`,
    canHaveChildren: false
  },
  execute: {
    label: "Execute",
    generator: (vals, children) => {
      const childCmd = children && children.length ? children[0] : "<comando>";
      return `execute ${childCmd}`;
    },
    canHaveChildren: true
  },
  as: {
    label: "As",
    params: ["Target"],
    generator: (vals, children) => `as ${vals.Target} ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  at: {
    label: "At",
    params: ["Location"],
    generator: (vals, children) => `at ${vals.Location} ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  if: {
    label: "If",
    params: ["Condition"],
    generator: (vals, children) => `if ${vals.Condition} ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  unless: {
    label: "Unless",
    params: ["Condition"],
    generator: (vals, children) => `unless ${vals.Condition} ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  score: {
    label: "Score",
    params: ["Target", "Objective", "Value"],
    generator: (vals, children) => `score ${vals.Target} ${vals.Objective} matches ${vals.Value} ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  tp: {
    label: "Tp",
    params: ["Target", "X", "Y", "Z"],
    generator: (vals) => `tp ${vals.Target} ${vals.X} ${vals.Y} ${vals.Z}`,
    canHaveChildren: false
  },
  run: {
    label: "Run",
    params: [],
    generator: (vals, children) => `run ${children && children.length ? children[0] : ""}`,
    canHaveChildren: true
  },
  say: {
    label: "Say",
    params: ["Message"],
    generator: (vals) => `say ${vals.Message}`,
    canHaveChildren: false
  },
  tellraw: {
    label: "Tellraw",
    params: ["Target", "Json"],
    generator: (vals) => `tellraw ${vals.Target} ${vals.Json}`,
    canHaveChildren: false
  },
  fill: {
    label: "Fill",
    params: ["X1", "Y1", "Z1", "X2", "Y2", "Z2", "Block"],
    generator: (vals) => `fill ${vals.X1} ${vals.Y1} ${vals.Z1} ${vals.X2} ${vals.Y2} ${vals.Z2} minecraft:${vals.Block}`,
    canHaveChildren: false
  }
};

// Drag & drop
document.querySelectorAll('.block').forEach(block => {
  block.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('type', block.dataset.type);
  });
});

function dropBlock(e, parentDiv) {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  if (!type || !blockTypes[type]) return;

  // Crea il blocco nel workspace o come figlio
  const blockDiv = document.createElement('div');
  blockDiv.className = 'workspace-block';
  blockDiv.dataset.type = type;

  blockTypes[type].params.forEach(param => {
    const label = document.createElement('span');
    label.textContent = param + ':';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = param === "Block" ? "stone" : param === "Entity" ? "zombie" : "~";
    input.dataset.param = param;
    input.addEventListener('input', updateOutput);
    blockDiv.appendChild(label);
    blockDiv.appendChild(input);
  });

  // Se può avere figli, aggiungi area drop interna
  if (blockTypes[type].canHaveChildren) {
    const childArea = document.createElement('div');
    childArea.className = 'child-area';
    childArea.textContent = "Trascina qui un blocco...";
    childArea.ondrop = function(ev) { dropBlock(ev, childArea); };
    childArea.ondragover = function(ev) { ev.preventDefault(); };
    blockDiv.appendChild(childArea);
  }

  // Bottone per rimuovere il blocco
  const delBtn = document.createElement('button');
  delBtn.textContent = "X";
  delBtn.style.marginLeft = "8px";
  delBtn.onclick = function() {
    blockDiv.remove();
    updateOutput();
  };
  blockDiv.appendChild(delBtn);

  if (parentDiv) {
    // Rimuovi solo il testo placeholder, NON gli altri blocchi!
    if (parentDiv.textContent === "Trascina qui un blocco...") parentDiv.textContent = "";
    parentDiv.appendChild(blockDiv);
  } else {
    document.getElementById('workspace').appendChild(blockDiv);
  }
  updateOutput();
}

function generateCommandFromBlock(blockDiv) {
  const type = blockDiv.dataset.type;
  const params = {};
  blockDiv.querySelectorAll('input').forEach(input => {
    params[input.dataset.param] = input.value;
  });

  let childrenCmds = [];
  const childArea = blockDiv.querySelector('.child-area');
  if (childArea) {
    // Prendi SOLO il primo child (per catena di comandi)
    const firstChild = childArea.querySelector('.workspace-block');
    if (firstChild) {
      childrenCmds.push(generateCommandFromBlock(firstChild));
    }
  }

  if (blockTypes[type]) {
    return blockTypes[type].generator(params, childrenCmds);
  }
  return "";
}

// Genera il comando finale
function updateOutput() {
  const workspace = document.getElementById('workspace');
  let commands = [];
  // Solo i blocchi che NON sono figli di altri blocchi
  workspace.querySelectorAll(':scope > .workspace-block').forEach(blockDiv => {
    commands.push(generateCommandFromBlock(blockDiv));
  });
  document.getElementById('commandOutput').textContent = commands.join('\n');
}

const palette = document.getElementById('block-palette');
palette.innerHTML = '';
Object.keys(blockTypes).forEach(type => {
  const btn = document.createElement('div');
  btn.className = 'block';
  btn.draggable = true;
  btn.dataset.type = type;
  btn.textContent = blockTypes[type].label;
  btn.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('type', type);
  });
  palette.appendChild(btn);
});