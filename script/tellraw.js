let pages = [{}]; // array di pagine
let currentPage = 0;

function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            const label = radio.parentElement.textContent.trim().toLowerCase();
            if (label === "unset") return undefined;
            if (label === "true") return true;
            if (label === "false") return false;
        }
    }
    return undefined;
}

function saveCurrentPage() {
    const obj = {};

    obj.text = document.getElementById("value").value || "";

    // Colore
    const colorType = document.getElementById("colorType").value;
    if (colorType === "hex") {
        const colorValue = document.getElementById("colorValue").value;
        if (colorValue && colorValue !== "") obj.color = colorValue;
    } else if (colorType && colorType !== "Unset") {
        obj.color = colorType;
    }

    // Shadow e opacità SOLO se almeno uno dei due è diverso dal valore di default
    const shadowColor = document.getElementById("shadowColor").value;
    const opacity = document.getElementById("opacity").value;
    if ((shadowColor && shadowColor !== "#000000") || (opacity && opacity !== "255")) {
        if (shadowColor && shadowColor !== "#000000") {
            // Se shadowColor è in formato HEX, converti in decimale ARGB
            obj.shadow_color = hexToARGBDecimal(shadowColor, opacity && opacity !== "" ? opacity : "255");
        }
        // Se vuoi anche salvare shadow_opacity separatamente, puoi farlo qui
    }

    // Stili testo
    const styleProps = ["bold", "italic", "underlined", "strikethrough", "obfuscated"];
    styleProps.forEach(prop => {
        const val = getRadioValue(prop);
        if (val !== undefined) obj[prop] = val;
    });

    // Font
    const font = document.getElementById("font").value;
    if (font) obj.font = font;

    // click_event SOLO se il campo clickEventValue è compilato
    const clickType = document.getElementById("clickEventType").value;
    const clickValue = document.getElementById("clickEventValue").value;
    if (clickValue && clickValue !== "") {
        obj.click_event = {
            action: clickType,
            command: clickValue
        };
    }

    // hover_event SOLO se il campo hoverEventValue è compilato
    const hoverType = document.getElementById("hoverEventType").value;
    const hoverValue = document.getElementById("hoverEventValue").value;
    if (hoverValue && hoverValue !== "") {
        obj.hover_event = {
            action: hoverType,
            value: [{ text: hoverValue }]
        };
    }

    pages[currentPage] = obj;
}

function loadPage(idx) {
    const obj = pages[idx] || {};
    document.getElementById("value").value = obj.text || "";

    // Colore
    if (obj.color && obj.color.startsWith("#")) {
        document.getElementById("colorType").value = "hex";
        document.getElementById("colorValue").value = obj.color;
    } else if (obj.color) {
        document.getElementById("colorType").value = obj.color;
        document.getElementById("colorValue").value = "";
    } else {
        document.getElementById("colorType").value = "Unset";
        document.getElementById("colorValue").value = "";
    }
    showColorPickerIfNeeded();

    // Shadow e opacità
    document.getElementById("shadowColor").value = obj.shadow_color || "#000000";
    document.getElementById("opacity").value = obj.shadow_opacity || "255";

    // Stili testo
    const styleProps = ["bold", "italic", "underlined", "strikethrough", "obfuscated"];
    styleProps.forEach(prop => {
        const radios = document.getElementsByName(prop);
        if (radios.length) {
            if (obj[prop] === undefined) radios[0].checked = true;
            else if (obj[prop] === true) radios[1].checked = true;
            else if (obj[prop] === false) radios[2].checked = true;
        }
    });

    // Font
    document.getElementById("font").value = obj.font || "";

    // click_event
    document.getElementById("clickEventType").value = obj.click_event?.action || "run_command";
    document.getElementById("clickEventValue").value = obj.click_event?.command || "";

    // hover_event
    document.getElementById("hoverEventType").value = obj.hover_event?.action || "show_text";
    document.getElementById("hoverEventValue").value = obj.hover_event?.value?.[0]?.text || "";

    updateOutput();
}

function updateOutput() {
    saveCurrentPage();
    // Output: array di oggetti, sempre su una linea
    document.getElementById("output").value = `/tellraw @p ${JSON.stringify(pages)}`;
}

// Bottoni
document.addEventListener("DOMContentLoaded", function() {
    updateOutput();
    showColorPickerIfNeeded();

    // Copia output
    const outputBox = document.getElementById("output");
    const copiedMsg = document.getElementById("copied-msg");
    if (outputBox) {
        outputBox.addEventListener("click", function () {
            outputBox.select();
            document.execCommand("copy");
            if (copiedMsg) {
                copiedMsg.style.display = "block";
                setTimeout(() => {
                    copiedMsg.style.display = "none";
                }, 1200);
            }
        });
    }

    // Bottoni value
    document.getElementById("addTextBtn").onclick = function() {
        saveCurrentPage();
        pages.splice(currentPage + 1, 0, {}); // aggiungi nuova pagina dopo quella attuale
        currentPage++;
        loadPage(currentPage);
    };
    document.getElementById("rightTextBtn").onclick = function() {
        if (currentPage < pages.length - 1) {
            saveCurrentPage();
            currentPage++;
            loadPage(currentPage);
        }
    };
    document.getElementById("leftTextBtn").onclick = function() {
        if (currentPage > 0) {
            saveCurrentPage();
            currentPage--;
            loadPage(currentPage);
        }
    };
    document.getElementById("deleteTextBtn").onclick = function() {
        if (pages.length > 1) {
            pages.splice(currentPage, 1);
            if (currentPage >= pages.length) currentPage = pages.length - 1;
            loadPage(currentPage);
        } else {
            // Svuota la pagina se è l'unica
            pages[0] = {};
            loadPage(0);
        }
    };

    // Aggiorna color picker quando cambi tipo colore
    document.getElementById("colorType").addEventListener("change", showColorPickerIfNeeded);
});

// Aggiorna costantemente l'output e mostra/nasconde il color picker
document.addEventListener("input", function(e) {
    updateOutput();
    if (e.target.id === "colorType") showColorPickerIfNeeded();
});

function showColorPickerIfNeeded() {
    const colorType = document.getElementById("colorType").value;
    const colorInput = document.getElementById("colorValue");
    let picker = document.getElementById("colorPickerBox");

    if (colorType === "hex") {
        if (!picker) {
            picker = document.createElement("input");
            picker.type = "color";
            picker.id = "colorPickerBox";
            picker.value = colorInput.value && /^#([0-9A-F]{6})$/i.test(colorInput.value) ? colorInput.value : "#ffffff";
            picker.style.marginLeft = "10px";
            colorInput.parentNode.appendChild(picker);

            picker.addEventListener("input", function () {
                colorInput.value = picker.value;
                updateOutput();
            });
        }
        colorInput.style.display = "";
        picker.style.display = "";
    } else {
        if (picker) picker.style.display = "none";
        colorInput.style.display = "none";
    }
}

document.getElementById("colorType").addEventListener("change", showColorPickerIfNeeded);

function hexToARGBDecimal(hex, opacity) {
    // hex: "#RRGGBB" o "RRGGBB"
    // opacity: "255" (decimale 0-255)
    let hexClean = hex.replace("#", "");
    if (hexClean.length !== 6) return null;
    let alpha = parseInt(opacity) || 255;
    let r = parseInt(hexClean.substring(0,2), 16);
    let g = parseInt(hexClean.substring(2,4), 16);
    let b = parseInt(hexClean.substring(4,6), 16);
    // ARGB: (alpha << 24) + (r << 16) + (g << 8) + b
    return (alpha << 24) + (r << 16) + (g << 8) + b;
}