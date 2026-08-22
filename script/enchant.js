const enchantments = {};
const enchantCategories = {
    "armor-enchants": [
        "Blast Protection", "Feather Falling", "Fire Protection", "Projectile Protection", "Protection", "Thorns"
    ],
    "movement-enchants": [
        "Aqua Affinity", "Depth Strider", "Frost Walker", "Respiration", "Soul Speed", "Swift Sneak"
    ],
    "weapon-enchants": [
        "Bane of Arthropods", "Breach", "Density", "Fire Aspect", "Knockback", "Looting", "Sharpness", "Smite", "Sweeping Edge", "Wind Burst"
    ],
    "bow-enchants": [
        "Flame", "Power", "Punch"
    ],
    "crossbow-enchants": [
        "Quick Charge"
    ],
    "bowcrossbow-enchants": [
        "Multishot", "Piercing", "Infinity"
    ],
    "trident-enchants": [
        "Channeling", "Impaling", "Loyalty", "Riptide"
    ],
    "tools-enchants": [
        "Efficiency", "Fortune", "Silk Touch"
    ],
    "durability-enchants": [
        "Mending", "Unbreaking"
    ],
    "fishing-enchants": [
        "Luck of the Sea", "Lure"
    ],
    "cursed-enchants": [
        "Binding Curse", "Vanishing Curse"
    ]
};

function createEnchantInputs() {
    Object.entries(enchantCategories).forEach(([catId, enchants]) => {
        const listDiv = document.querySelector(`#${catId} .enchant-list`);
        enchants.forEach(enchant => {
            const row = document.createElement('div');
            row.className = 'enchant-row';

            const label = document.createElement('span');
            label.textContent = enchant;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.marginLeft = '16px';

            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 255;
            input.placeholder = 'Livello';
            input.style.width = '120px';
            input.style.marginLeft = '16px';
            input.style.display = 'none';

            checkbox.onchange = function () {
                if (checkbox.checked) {
                    input.style.display = '';
                } else {
                    input.style.display = 'none';
                    input.value = '';
                    delete enchantments[enchant];
                    updateEnchantMemory();
                    updateCommand();
                }
            };

            input.oninput = function () {
                let level = parseInt(input.value) || '';
                if (level > 255) level = 255;
                if (level) {
                    enchantments[enchant] = level;
                } else {
                    delete enchantments[enchant];
                }
                updateEnchantMemory();
                updateCommand();
            };

            row.appendChild(label);
            row.appendChild(checkbox);
            row.appendChild(input);
            listDiv.appendChild(row);
        });
    });
}

function updateEnchantMemory() {
    const memoryDiv = document.getElementById('memory');
    memoryDiv.innerHTML = "<b>Enchantments aggiunti:</b><br>";
    Object.entries(enchantments).forEach(([ench, lvl]) => {
        memoryDiv.innerHTML += `${ench}: ${lvl}<br>`;
    });
}

function updateCommand() {
    const item = "stone"; // Puoi cambiare con un input per l'item
    const enchantStr = Object.entries(enchantments)
        .map(([key, value]) => `"minecraft:${key.toLowerCase().replace(/ /g, "_")}":${value}`)
        .join(',');
    const command = `/give @p ${item}[enchantments={${enchantStr}}] 1`;
    document.getElementById('output').value = command;
}

window.onload = function() {
    createEnchantInputs();
};