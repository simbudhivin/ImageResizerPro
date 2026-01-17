const imgUpload = document.getElementById('imgUpload');
const imgReset = document.getElementById('imgReset');

const scaleSelect = document.getElementById('scaleSelect');

// Dimensions
const customW = document.getElementById('customW');
const customH = document.getElementById('customH');
const customUnit = document.getElementById('customUnit');

const zoomSlider = document.getElementById('zoomSlider');
const zoomValue = document.getElementById('zoomValue');
const zoomReset = document.getElementById('zoomReset');
const zoomMinus = document.getElementById('zoomMinus');
const zoomPlus = document.getElementById('zoomPlus');

const bgColor = document.getElementById('bgColor');
const bgReset = document.getElementById('bgReset');

// BG REMOVER CONTROLS
const bgRemover = document.getElementById('bgRemover');
const bgRemoverReset = document.getElementById('bgRemoverReset');
const bgFeather = document.getElementById('bgFeather');
const bgFeatherReset = document.getElementById('bgFeatherReset');
const removeColorDisplay = document.getElementById('removeColorDisplay');
const btnPickColor = document.getElementById('btnPickColor');
const pickReset = document.getElementById('pickReset');
const btnEraser = document.getElementById('btnEraser');

// ERASER CONTROLS
const eraserSlider = document.getElementById('eraserSlider');
const eraserReset = document.getElementById('eraserReset');

// COLOR CONTROLS
const colorMode = document.getElementById('colorMode');
const brightnessSlider = document.getElementById('brightnessSlider');
const brightnessReset = document.getElementById('brightnessReset');
const contrastSlider = document.getElementById('contrastSlider');
const contrastReset = document.getElementById('contrastReset');

// Color Correction Controls
const sharpnessSlider = document.getElementById('sharpnessSlider');
const sharpnessReset = document.getElementById('sharpnessReset');
const midtoneSlider = document.getElementById('midtoneSlider');
const midtoneReset = document.getElementById('midtoneReset');
const hueSlider = document.getElementById('hueSlider');
const hueReset = document.getElementById('hueReset');


const targetKB = document.getElementById('targetKB');
const targetDPI = document.getElementById('targetDPI');

const rotSlider = document.getElementById('rotSlider');
const rotValue = document.getElementById('rotValue');
const rotMinus = document.getElementById('rotMinus');
const rotPlus = document.getElementById('rotPlus');
const rotReset = document.getElementById('rotReset');
const btnAbout = document.getElementById('btnAbout');
const btnGlobalReset = document.getElementById('btnGlobalReset');
const aboutModal = document.getElementById('aboutModal');
const closeButton = document.querySelector('.close-button');

// New preset elements
const presetName = document.getElementById('presetName');
const addPreset = document.getElementById('addPreset');
const deletePreset = document.getElementById('deletePreset');
const newPresetW = document.getElementById('newPresetW');
const newPresetH = document.getElementById('newPresetH');
const newPresetUnit = document.getElementById('newPresetUnit');
const newPresetKB = document.getElementById('newPresetKB');
const newPresetDPI = document.getElementById('newPresetDPI');

let customPresets = [];
let hiddenBuiltInPresets = []; // New array to store IDs of hidden built-in presets

// Functions for saving and loading custom presets
function saveCustomPresets() {
    localStorage.setItem('customPresets', JSON.stringify(customPresets));
}

function saveHiddenBuiltInPresets() {
    localStorage.setItem('hiddenBuiltInPresets', JSON.stringify(hiddenBuiltInPresets));
}

function loadAllPresets() {
    // Load custom presets
    const storedCustomPresets = localStorage.getItem('customPresets');
    if (storedCustomPresets) {
        customPresets = JSON.parse(storedCustomPresets);
    } else {
        customPresets = [];
    }

    // Load hidden built-in presets
    const storedHiddenBuiltInPresets = localStorage.getItem('hiddenBuiltInPresets');
    if (storedHiddenBuiltInPresets) {
        hiddenBuiltInPresets = JSON.parse(storedHiddenBuiltInPresets);
    } else {
        hiddenBuiltInPresets = [];
    }

    // Clear all options from the select dropdown before repopulating
    while (scaleSelect.options.length > 0) {
        scaleSelect.remove(0);
    }

    // Add the default "Image Selection" option
    const defaultOption = document.createElement('option');
    defaultOption.value = "0";
    defaultOption.textContent = "Image Selection";
    scaleSelect.appendChild(defaultOption);

    // Add built-in presets, skipping those marked as hidden
    for (let i = 1; i <= 22; i++) {
        if (!hiddenBuiltInPresets.includes(i.toString())) {
            const p = getBuiltInPresetProperties(i.toString());
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = `${i}. ${p.name} (${p.w}${p.unit} x ${p.h}${p.unit})`;
            scaleSelect.appendChild(option);
        }
    }

    // Add custom presets (which are already loaded into customPresets array)
    let tempCustomPresets = [...customPresets]; // Copy current customPresets to a temporary array
    customPresets = []; // Clear the global customPresets array to rebuild it

    let currentCustomId = 23;
    tempCustomPresets.forEach(p => {
        p.value = currentCustomId.toString(); // Re-assign sequential value
        customPresets.push(p); // Add to the freshly built global customPresets array

        const newOption = document.createElement('option');
        newOption.value = p.value;
        newOption.textContent = `${p.value}. ${p.name} (${p.w}${p.unit} x ${p.h}${p.unit})`;
        scaleSelect.appendChild(newOption);
        currentCustomId++;
    });
    saveCustomPresets(); // Save the re-indexed custom presets to local storage

    scaleSelect.value = "0"; // Reset selection to default after loading
}

// Call loadAllPresets on script initialization
document.addEventListener('DOMContentLoaded', loadAllPresets);

function getBuiltInPresetProperties(mode) {
    let p = {};
    if (mode === "1") { p = { name: "Passport Photos", w: 35, h: 45, unit: "mm", kb: 50, dpi: 300 }; }
    else if (mode === "2") { p = { name: "UTIITSL Pan Ph", w: 213, h: 213, unit: "px", kb: 25, dpi: 300 }; }
    else if (mode === "3") { p = { name: "UTIITSL Pan Sign", w: 400, h: 200, unit: "px", kb: 45, dpi: 600 }; }
    else if (mode === "4") { p = { name: "PVC ID size", w: 86, h: 54, unit: "mm", kb: 100, dpi: 300 }; }
    else if (mode === "5") { p = { name: "PY Job Photos", w: 238, h: 306, unit: "px", kb: 30, dpi: 300 }; }
    else if (mode === "6") { p = { name: "PY Job Signature", w: 350, h: 150, unit: "px", kb: 20, dpi: 300 }; }
    else if (mode === "7") { p = { name: "TN RC Photos", w: 150, h: 200, unit: "px", kb: 100, dpi: 300 }; }
    else if (mode === "8") { p = { name: "NEET PCS Photo", w: 4, h: 6, unit: "in", kb: 150, dpi: 300 }; }
    else if (mode === "9") { p = { name: "LLR & DL Photos", w: 413, h: 531, unit: "px", kb: 15, dpi: 300 }; }
    else if (mode === "10") { p = { name: "LLR & DL Signature", w: 256, h: 64, unit: "px", kb: 15, dpi: 300 }; }
    else if (mode === "11") { p = { name: "GPAT Signature", w: 3.5, h: 1.5, unit: "cm", kb: 60, dpi: 200 }; }
    else if (mode === "12") { p = { name: "GPAT Thumb (LTI)", w: 3.5, h: 1.5, unit: "cm", kb: 60, dpi: 200 }; }
    else if (mode === "13") { p = { name: "SSC (CHSL/MTS) Photo", w: 200, h: 240, unit: "px", kb: 30, dpi: 300 }; }
    else if (mode === "14") { p = { name: "SSC (CHSL/MTS) Sig", w: 240, h: 80, unit: "px", kb: 15, dpi: 300 }; }
    else if (mode === "15") { p = { name: "IBPS Photo", w: 200, h: 230, unit: "px", kb: 30, dpi: 300 }; }
    else if (mode === "16") { p = { name: "IBPS Signature", w: 140, h: 60, unit: "px", kb: 15, dpi: 300 }; }
    else if (mode === "17") { p = { name: "UPSC Photo", w: 110, h: 140, unit: "px", kb: 30, dpi: 300 }; }
    else if (mode === "18") { p = { name: "UPSC Signature", w: 140, h: 110, unit: "px", kb: 30, dpi: 300 }; }
    else if (mode === "19") { p = { name: "RRB (NTPC/Group D) Ph", w: 240, h: 320, unit: "px", kb: 50, dpi: 300 }; }
    else if (mode === "20") { p = { name: "RRB (NTPC/Group D) Sin", w: 140, h: 60, unit: "px", kb: 50, dpi: 300 }; }
    else if (mode === "21") { p = { name: "NSDL PAN Photo", w: 2.5, h: 3.5, unit: "cm", kb: 35, dpi: 200 }; }
    else if (mode === "22") { p = { name: "NSDL PAN Sin", w: 4.5, h: 2, unit: "cm", kb: 35, dpi: 200 }; }
    return p;
}

addPreset.addEventListener('click', () => {
    const name = presetName.value.trim();
    if (!name) {
        alert('Please enter a preset name.');
        return;
    }
    const w = newPresetW.value;
    const h = newPresetH.value;
    const unit = newPresetUnit.value;
    const kb = newPresetKB.value;
    const dpi = newPresetDPI.value;

    const lowerCaseName = name.toLowerCase().split('(')[0].trim();

    // Check against custom presets
    const isCustomDuplicate = customPresets.some(p =>
        p.name.toLowerCase() === lowerCaseName &&
        p.w == w &&
        p.h == h &&
        p.unit === unit &&
        p.kb == (kb || 5) &&
        p.dpi == (dpi || 72)
    );
    if (isCustomDuplicate) {
        alert('A preset with these exact settings already exists in your custom presets.');
        return;
    }

    // Check against built-in presets
    const isBuiltInDuplicate = Array.from(scaleSelect.options).some(opt => {
        const val = parseInt(opt.value);
        if (val > 0 && val <= 22) {
            const presetProps = getBuiltInPresetProperties(opt.value);
            if (presetProps.name) {
                const inputName = presetName.value.split('(')[0].trim();
                return presetProps.name.toLowerCase() === inputName.toLowerCase() &&
                    presetProps.w == w &&
                    presetProps.h == h &&
                    presetProps.unit === unit &&
                    presetProps.kb == kb &&
                    presetProps.dpi == dpi;
            }
        }
        return false;
    });

    if (isBuiltInDuplicate) {
        alert('This is a default preset. You cannot add it again.');
        return;
    }
    
    if (!w || !h) {
        alert('Please enter width and height for the preset.');
        return;
    }

    let maxId = 22; // Start checking from 22 as built-in presets go up to 22
    customPresets.forEach(p => {
        const id = parseInt(p.value);
        if (id > maxId) {
            maxId = id;
        }
    });
    const newValue = maxId + 1;
    
    const newPreset = {
        value: newValue.toString(),
        name: name,
        w: w,
        h: h,
        unit: unit,
        kb: kb || 5,
        dpi: dpi || 72
    };

    customPresets.push(newPreset);
    saveCustomPresets(); // Save to local storage

    // No longer manually append, let loadAllPresets rebuild the dropdown
    loadAllPresets();

    // Clear the form
    presetName.value = '';
    newPresetW.value = '';
    newPresetH.value = '';
    newPresetKB.value = '';
    newPresetDPI.value = '';
});

deletePreset.addEventListener('click', () => {
    const selectedValue = scaleSelect.value;
    const selectedIndex = scaleSelect.selectedIndex;

    if (selectedValue === "0") {
        alert("Please select a preset to delete.");
        return;
    }

    const selectedValueInt = parseInt(selectedValue);

    // Prevent deletion of default presets
    if (selectedValueInt <= 22) {
        alert("Default presets cannot be deleted. You can only delete custom presets.");
        return;
    }

    // This is a custom preset, proceed with deletion
    const presetText = scaleSelect.options[selectedIndex].text;
    if (confirm(`Are you sure you want to delete the custom preset "${presetText}"?`)) {
        const presetIndex = customPresets.findIndex(p => p.value === selectedValue);
        if (presetIndex > -1) {
            customPresets.splice(presetIndex, 1);
        }
        saveCustomPresets();
        loadAllPresets(); // Rebuild dropdown to reflect the change.
    }
    
    // Reset selection after any action
    scaleSelect.value = "0";
    scaleSelect.dispatchEvent(new Event('change'));
});

btnAbout.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == aboutModal) {
        aboutModal.style.display = 'none';
    }
});



const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const canvasContainer = document.querySelector('.canvas-container');
const previewSection = document.querySelector('.preview-section');
const eraserMask = document.createElement('canvas');
const maskCtx = eraserMask.getContext('2d', { willReadFrequently: true });

// Globally declare temporary canvases for reuse
const gfxCanvas = document.createElement('canvas');
const gfxCtx = gfxCanvas.getContext('2d');
const tempEffectCanvas = document.createElement('canvas');
const tCtx = tempEffectCanvas.getContext('2d', { willReadFrequently: true });

// Workspace - 2000px is the sweet spot for performance vs quality
canvas.width = 2000;
canvas.height = 2000;
eraserMask.width = 2000;
eraserMask.height = 2000;
maskCtx.globalCompositeOperation = 'source-over';
maskCtx.fillStyle = 'white';
maskCtx.fillRect(0, 0, eraserMask.width, eraserMask.height);


let currentImage = null;
let currentRotation = 0;
let isDownloading = false;
let isDragging = false;
let isErasing = false;
let isEraseMode = false;
let eraserSize = 10;
let startX, startY;
let imgOffsetX = 0;
let imgOffsetY = 0;
let isRenderScheduled = false;
let isRestoringState = false; // New flag for undo/redo
let lastEraserX = 0; // For temporary eraser feedback
let lastEraserY = 0; // For temporary eraser feedback

// Undo/Redo History
const historyStack = [];
let historyPointer = -1;

// STATE FOR PICKER
let isPickingColor = false;
let targetRemoveColor = { r: 58, g: 155, b: 255 }; // Default Blue

function formatZoom(zoom) {
    const num = parseFloat(zoom);
    // Return to 2 decimal places if it's not a whole number, otherwise no decimals
    if (num % 1 !== 0) {
        return num.toFixed(2) + "%";
    }
    return num.toFixed(0) + "%";
}

// Listeners
zoomSlider.addEventListener('input', () => { zoomValue.textContent = formatZoom(zoomSlider.value); renderCanvas(); saveState(); });

zoomMinus.addEventListener('click', () => {
    let newZoom = parseFloat(zoomSlider.value) - 1;
    if (newZoom < 1) newZoom = 1;
    zoomSlider.value = newZoom;
    zoomValue.textContent = formatZoom(newZoom);
    renderCanvas();
    saveState(); // Save state after zoom change
});

zoomPlus.addEventListener('click', () => {
    let newZoom = parseFloat(zoomSlider.value) + 1;
    if (newZoom > 500) newZoom = 500;
    zoomSlider.value = newZoom;
    zoomValue.textContent = formatZoom(newZoom);
    renderCanvas();
    saveState(); // Save state after zoom change
});

imgUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please select a valid image file (PNG, JPG, GIF, WEBP, BMP).');
            imgUpload.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                maskCtx.globalCompositeOperation = 'source-over';
                maskCtx.fillStyle = 'white';
                maskCtx.fillRect(0, 0, eraserMask.width, eraserMask.height);
                resetImageDefaults();
                renderCanvas();
                saveState(); // Save state after initial image load
            };
            img.onerror = () => {
                alert('Error loading image. The file may be corrupt or an unsupported format.');
                imgUpload.value = '';
            };
            img.src = event.target.result;
        };
        reader.onerror = () => {
            alert('Error reading file. Please try again.');
            imgUpload.value = '';
        };
        reader.readAsDataURL(file);
    }
});

imgReset.addEventListener('click', () => {
    currentImage = null;
    imgUpload.value = "";
    imgOffsetX = 0;
    imgOffsetY = 0;
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.fillStyle = 'white';
    maskCtx.fillRect(0, 0, eraserMask.width, eraserMask.height);
    renderCanvas();
    saveState(); // Save state after image reset
});

function resetImageDefaults() {
    currentRotation = 0;
    imgOffsetX = 0;
    imgOffsetY = 0;
    rotSlider.value = 0;
    rotValue.textContent = "0°";
    zoomSlider.value = 100;
    zoomValue.textContent = formatZoom(100);

    colorMode.value = "color";
    brightnessSlider.value = 0;
    contrastSlider.value = 0;
    sharpnessSlider.value = 0;
    midtoneSlider.value = 0;
    hueSlider.value = 0;
}

// === RESET ===
function performFullReset() {
    currentImage = null;
    imgUpload.value = "";
    scaleSelect.value = "0";
    customW.value = 0;
    customH.value = 0;
    customUnit.value = "px";

    // Clear the preset name form
    presetName.value = '';
    newPresetW.value = '';
    newPresetH.value = '';
    newPresetKB.value = '';
    newPresetDPI.value = '';
    newPresetUnit.value = 'px';

    resetImageDefaults();

    // Reset BG Remover
    bgRemover.value = 0;
    bgFeather.value = 0;
    removeColorDisplay.value = "#3A9BFF";
    targetRemoveColor = { r: 58, g: 155, b: 255 };
    isPickingColor = false;
    canvas.style.cursor = "default";
    btnPickColor.textContent = "🖊️";
    btnPickColor.style.background = "";
    bgColor.value = "#3A9BFF";

    // Reset Eraser
    eraserSlider.value = 10;
    eraserSize = 10;
    isEraseMode = false;
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.fillStyle = 'white';
    maskCtx.fillRect(0, 0, eraserMask.width, eraserMask.height);

    targetKB.value = 5;
    targetDPI.value = 72;

    // Reset View Zoom
    canvasContainer.style.width = "";
    canvasContainer.style.height = "";
    canvasContainer.style.maxWidth = "";
    canvasContainer.style.maxHeight = "";

    // Do NOT clear custom presets from local storage on performFullReset.
    // They should persist unless explicitly deleted by the user.
    localStorage.removeItem('hiddenBuiltInPresets'); // Clear hidden built-in presets on full reset

    // Only reset the selection.
    scaleSelect.value = "0"; // Reset selected preset to "Image Selection"
    // No need to call loadCustomPresets here as they are not removed.
    loadAllPresets(); // Ensure dropdown reflects any hidden built-in presets or existing custom presets.
    renderCanvas(); // Render the canvas after resetting all values
    saveState(); // Save state after full reset
}

btnGlobalReset.addEventListener('click', performFullReset);

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        if (aboutModal.style.display === 'block') {
            aboutModal.style.display = 'none';
        } else if(isPickingColor) {
             isPickingColor = false;
             canvas.style.cursor = "default";
             btnPickColor.textContent = "🖊️";
             btnPickColor.style.background = "";
        } else {
             performFullReset();
        }
    }
});

// Add global keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Undo (Ctrl+Z or Cmd+Z)
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
    }
    // Redo (Ctrl+Y or Cmd+Y)
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
    }
    // Redo (Cmd+Shift+Z) - for consistency with some macOS apps
    if ((e.metaKey && e.shiftKey) && e.key === 'Z') {
        e.preventDefault();
        redo();
    }
    // Toggle Erase Mode ('E')
    if (e.key === 'e' || e.key === 'E') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') { // Prevent toggling if typing in an input field
            e.preventDefault();
            toggleEraserMode();
        }
    }
});

zoomReset.addEventListener('click', () => { zoomSlider.value = 100; zoomValue.textContent = formatZoom(100); renderCanvas(); });

bgReset.addEventListener('click', () => { bgColor.value = "#3A9BFF"; renderCanvas(); });

// Pick Reset
pickReset.addEventListener('click', () => {
    removeColorDisplay.value = "#3A9BFF";
    targetRemoveColor = { r: 58, g: 155, b: 255 };
    renderCanvas();
    saveState(); // Save state after pick reset
});

function updateEraserCursor() {
    const size = Math.max(2, parseFloat(eraserSize)); // Ensure size is at least 2px
    const padding = 2; // Padding to ensure stroke isn't clipped
    const canvasSize = size + (padding * 2);
    const center = canvasSize / 2;

    const cursorCanvas = document.createElement('canvas');
    const cursorCtx = cursorCanvas.getContext('2d');
    cursorCanvas.width = canvasSize;
    cursorCanvas.height = canvasSize;

    // Draw the circle
    cursorCtx.beginPath();
    // Arc: center x, center y, radius, start angle, end angle
    cursorCtx.arc(center, center, size / 2, 0, 2 * Math.PI);

    // Fill with light transparency
    cursorCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    cursorCtx.fill();

    // Stroke with a solid black line
    cursorCtx.strokeStyle = 'black';
    cursorCtx.lineWidth = 1.5; // Use 1.5 for a crisper line
    cursorCtx.stroke();

    // Display eraser size
    cursorCtx.fillStyle = 'white';
    cursorCtx.font = '10px Arial';
    cursorCtx.textAlign = 'center';
    cursorCtx.textBaseline = 'middle';
    cursorCtx.fillText(eraserSize, center, center);

    const cursorUrl = cursorCanvas.toDataURL();
    canvas.style.cursor = `url(${cursorUrl}) ${center} ${center}, auto`;
}

// === UNDO/REDO LOGIC ===
function saveState() {
    if (isRestoringState) {
        return; // Don't save state when restoring
    }

    // If we're not at the end of the history (i.e., we've undone some actions),
    // any new action should clear the redo stack.
    if (historyPointer < historyStack.length - 1) {
        historyStack.splice(historyPointer + 1);
    }

    const state = {
        imageData: currentImage ? currentImage.src : null, // Store image src
        rotation: currentRotation,
        offsetX: imgOffsetX,
        offsetY: imgOffsetY,
        zoom: zoomSlider.value,
        bgColor: bgColor.value,
        bgRemover: bgRemover.value,
        bgFeather: bgFeather.value,
        removeColor: { ...targetRemoveColor }, // Shallow copy
        brightness: brightnessSlider.value,
        contrast: contrastSlider.value,
        sharpness: sharpnessSlider.value,
        midtone: midtoneSlider.value,
        hue: hueSlider.value,
        colorMode: colorMode.value,
        eraserMaskData: maskCtx.getImageData(0, 0, eraserMask.width, eraserMask.height)
    };
            historyStack.push(state);
        historyPointer = historyStack.length - 1;
    }
    
    function restoreState(state) {
        isRestoringState = true; // Set flag before restoring
    // Restore currentImage
    if (state.imageData) {
        if (!currentImage || currentImage.src !== state.imageData) {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                applyState(state);
                isRestoringState = false; // Clear flag after restoration
            };
            img.src = state.imageData;
        } else {
            // Image is already loaded, just apply other states
            applyState(state);
            isRestoringState = false; // Clear flag after restoration
        }
    } else {
        currentImage = null;
        applyState(state);
        isRestoringState = false; // Clear flag after restoration
    }
}

function applyState(state) {
    currentRotation = state.rotation;
    imgOffsetX = state.offsetX;
    imgOffsetY = state.offsetY;
    zoomSlider.value = state.zoom;
    bgColor.value = state.bgColor;
    bgRemover.value = state.bgRemover;
    bgFeather.value = state.bgFeather;
    targetRemoveColor = { ...state.removeColor };
    brightnessSlider.value = state.brightness;
    contrastSlider.value = state.contrast;
    sharpnessSlider.value = state.sharpness;
    midtoneSlider.value = state.midtone;
    hueSlider.value = state.hue;
    colorMode.value = state.colorMode;

    // Restore eraserMask
    maskCtx.putImageData(state.eraserMaskData, 0, 0);

    // Update UI elements that don't trigger renderCanvas
    zoomValue.textContent = formatZoom(zoomSlider.value);
    rotSlider.value = currentRotation;
    rotValue.textContent = currentRotation + "°";
    removeColorDisplay.value = "#" + ((1 << 24) + (targetRemoveColor.r << 16) + (targetRemoveColor.g << 8) + targetRemoveColor.b).toString(16).slice(1);

    renderCanvas();
}


function undo() {
    if (historyPointer > 0) {
        historyPointer--;
        restoreState(historyStack[historyPointer]);
    }
}

function redo() {
    if (historyPointer < historyStack.length - 1) {
        historyPointer++;
        restoreState(historyStack[historyPointer]);
    }
}

function updateUndoRedoButtons() {
    undoBtn.disabled = historyPointer <= 0;
    redoBtn.disabled = historyPointer >= historyStack.length - 1;
}

// Initial call to set button states
document.addEventListener('DOMContentLoaded', () => {
    loadAllPresets();
    saveState(); // Save initial state
});

function bakeEffects(image) {
    if (!image) return null;

    const maxDim = 2000;
    let w = image.width;
    let h = image.height;
    if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

    const brightVal = parseInt(brightnessSlider.value);
    const contrastVal = parseInt(contrastSlider.value);
    const hueVal = parseInt(hueSlider.value);
    const mode = colorMode.value;
    const b = 100 + brightVal;
    const c = 100 + contrastVal;
    let filterString = `brightness(${b}%) contrast(${c}%) hue-rotate(${hueVal}deg)`;
    if (mode === 'bw') { filterString += ' grayscale(100%)'; }
    tCtx.filter = filterString;

    tCtx.drawImage(image, 0, 0, w, h);
    tCtx.filter = 'none';

    const sharpenVal = parseInt(sharpnessSlider.value);
    const threshold = parseInt(bgRemover.value);
    const midtoneVal = parseInt(midtoneSlider.value);

    if (sharpenVal > 0 || threshold > 0 || midtoneVal !== 0) {
        const imgData = tCtx.getImageData(0, 0, w, h);
        let data = imgData.data;

        if (midtoneVal !== 0) {
            applyMidtones(data, midtoneVal);
        }

        if (sharpenVal > 0) {
             const mix = sharpenVal / 100.0;
             const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
             const sharpData = convolute(data, w, h, kernel, false);
             for (let i = 0; i < data.length; i += 4) {
                 data[i] = data[i] * (1 - mix) + sharpData[i] * mix;
                 data[i+1] = data[i+1] * (1 - mix) + sharpData[i+1] * mix;
                 data[i+2] = data[i+2] * (1 - mix) + sharpData[i+2] * mix;
             }
        }

        if (threshold > 0) {
            const tr = targetRemoveColor.r; const tg = targetRemoveColor.g; const tb = targetRemoveColor.b;
            const featherVal = parseInt(bgFeather.value); const featherRange = featherVal * 4;
            for (let i = 0; i < data.length; i += 4) {
                const r=data[i], g=data[i+1], b=data[i+2];
                const diffR = Math.abs(r - tr); const diffG = Math.abs(g - tg); const diffB = Math.abs(b - tb);
                const maxDiff = Math.max(diffR, diffG, diffB);
                if (maxDiff < threshold) {
                    data[i+3] = 0; // Make transparent
                } else if (featherVal > 0 && maxDiff < (threshold + featherRange)) {
                    let factor = (maxDiff - threshold) / featherRange;
                    data[i+3] = Math.round(data[i+3] * factor);
                }
            }
        }
        tCtx.putImageData(imgData, 0, 0);
    }

    return tempCanvas;
}


function toggleEraserMode() {
    isEraseMode = !isEraseMode;
    if (isEraseMode) {
        isPickingColor = false;
        btnPickColor.style.background = "";
        btnEraser.style.background = "#ff4444";
        updateEraserCursor();
    } else {
        btnEraser.style.background = "";
        canvas.style.cursor = 'grab';
    }
}

btnEraser.addEventListener('click', () => {
    if (!currentImage) {
        alert("Please insert an image first.");
        return;
    }
    toggleEraserMode();
});

eraserSlider.addEventListener('input', (e) => {
    eraserSize = e.target.value;
    if (isEraseMode) {
        updateEraserCursor();
    }
});

eraserReset.addEventListener('click', () => {
    eraserSlider.value = 10;
    eraserSize = 10;
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.fillStyle = 'white';
    maskCtx.fillRect(0, 0, eraserMask.width, eraserMask.height);
    renderCanvas();
    saveState(); // Save state after eraser reset
    if (isEraseMode) {
        updateEraserCursor();
    }
});

bgRemoverReset.addEventListener('click', () => { bgRemover.value = 0; renderCanvas(); });
bgFeatherReset.addEventListener('click', () => { bgFeather.value = 0; renderCanvas(); });

rotReset.addEventListener('click', () => { currentRotation = 0; rotSlider.value = 0; rotValue.textContent = "0°"; renderCanvas(); });

brightnessReset.addEventListener('click', () => { brightnessSlider.value = 0; renderCanvas(); });
contrastReset.addEventListener('click', () => { contrastSlider.value = 0; renderCanvas(); });
// NEW Resets
sharpnessReset.addEventListener('click', () => { sharpnessSlider.value = 0; renderCanvas(); });
midtoneReset.addEventListener('click', () => { midtoneSlider.value = 0; renderCanvas(); });
hueReset.addEventListener('click', () => { hueSlider.value = 0; renderCanvas(); });


colorMode.addEventListener('change', () => { renderCanvas(); saveState(); });
brightnessSlider.addEventListener('input', () => { renderCanvas(); saveState(); });
contrastSlider.addEventListener('input', () => { renderCanvas(); saveState(); });
// NEW Inputs
sharpnessSlider.addEventListener('input', () => { renderCanvas(); saveState(); });
midtoneSlider.addEventListener('input', () => { renderCanvas(); saveState(); });
hueSlider.addEventListener('input', () => { renderCanvas(); saveState(); });


customW.addEventListener('input', renderCanvas);
customH.addEventListener('input', renderCanvas);
customUnit.addEventListener('change', renderCanvas);
targetDPI.addEventListener('input', renderCanvas);

// === COLOR PICKER LOGIC ===
btnPickColor.addEventListener('click', () => {
    if(!currentImage) { alert("Please insert an image first."); return; }
    isPickingColor = !isPickingColor;
    if(isPickingColor) {
        isEraseMode = false;
        btnEraser.style.background = "";
        canvas.style.cursor = "crosshair";
        btnPickColor.style.background = "#ff4444";
        btnPickColor.style.color = "white";
    } else {
        canvas.style.cursor = "default";
        btnPickColor.style.background = "";
        btnPickColor.style.color = "";
    }
});

removeColorDisplay.addEventListener('input', (e) => {
    targetRemoveColor = hexToRgb(e.target.value);
    renderCanvas();
    saveState(); // Save state after color display change
});

// === SMART ZOOM & SCROLL LOGIC ===
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();

    // 1. PAN/SCROLL (Ctrl/Shift Key)
    if (e.ctrlKey || e.shiftKey) {
        const sensitivity = 2;
        if (e.shiftKey) { imgOffsetX -= e.deltaY * sensitivity; }
        else { imgOffsetY -= e.deltaY * sensitivity; }
        renderCanvas();
        return;
    }

    // 2. DETECT IF MOUSE IS OVER IMAGE
    let isOverImage = false;
    const rect = canvasContainer.getBoundingClientRect(); // Visual rect

    if (currentImage) {
        let drawWidth, drawHeight;
        const mask = getMaskDimensions();
        // Calculate dimensions based on CURRENT ZOOM Slider
        if (mask) {
            let scale = Math.min(mask.w / currentImage.width, mask.h / currentImage.height);
            scale *= parseInt(zoomSlider.value) / 100;
            drawWidth = currentImage.width * scale;
            drawHeight = currentImage.height * scale;
        } else {
            // Standard fit
            let scale = Math.min(canvas.width / currentImage.width, canvas.height / currentImage.height);
            scale *= parseInt(zoomSlider.value) / 100;
            drawWidth = currentImage.width * scale;
            drawHeight = currentImage.height * scale;
        }

        const imgCx = (canvas.width / 2) + imgOffsetX;
        const imgCy = (canvas.height / 2) + imgOffsetY;

        const canvasMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const canvasMouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        const dx = canvasMouseX - imgCx;
        const dy = canvasMouseY - imgCy;

        const angleRad = -currentRotation * (Math.PI / 180);
        const rx = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
        const ry = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

        const halfW = drawWidth / 2;
        const halfH = drawHeight / 2;

        if (rx >= -halfW && rx <= halfW && ry >= -halfH && ry <= halfH) {
            isOverImage = true;
        }
    }

    if (isOverImage) {
        // IMAGE ZOOM MODE
        let currentZoom = parseFloat(zoomSlider.value);
        let zoomStep = (e.deltaY < 0) ? 5 : -5;
        let newZoom = currentZoom + zoomStep;
        if (newZoom < 1) newZoom = 1;
        if (newZoom > 500) newZoom = 500;

        zoomSlider.value = newZoom;
        zoomValue.textContent = formatZoom(newZoom);
        renderCanvas();
    } else {
        // VIEW ZOOM MODE
        const delta = e.deltaY < 0 ? 1 : -1;
        const zoomIntensity = 0.1;
        const factor = Math.exp(delta * zoomIntensity);

        const currentW = rect.width;
        const currentH = rect.height;
        const newW = currentW * factor;
        const newH = currentH * factor;

        if (newW < 100 || newW > 10000) return;

        canvasContainer.style.width = `${newW}px`;
        canvasContainer.style.height = `${newH}px`;
        canvasContainer.style.maxWidth = 'none';
        canvasContainer.style.maxHeight = 'none';
    }

}, { passive: false });


canvas.addEventListener('mousedown', (e) => {
    if (!currentImage) return;

    if (isEraseMode) {
        isErasing = true;
        eraseAt(e);
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isPickingColor) {
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const canvasX = Math.floor(x * scaleX);
        const canvasY = Math.floor(y * scaleY);

        const pixel = ctx.getImageData(canvasX, canvasY, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];

        targetRemoveColor = { r, g, b };
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        removeColorDisplay.value = hex;

        isPickingColor = false;
        canvas.style.cursor = "default";
        btnPickColor.style.background = "";
        btnPickColor.style.color = "";

        renderCanvas();
        saveState(); // Save state after color picking
        return;
    }

    isDragging = true;
    startX = x; // Use consistent coordinates
    startY = y;
});

canvas.addEventListener('mousemove', (e) => {
    // These coordinates are relative to the canvas element
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    if (isErasing) {
        eraseAt(e);
        lastEraserX = canvasX;
        lastEraserY = canvasY;
        scheduleRender(); // Use scheduleRender for smoother erasing feedback
        return;
    }

    if (isDragging) {
        const dx = x - startX;
        const dy = y - startY;
        
        // Dragging operates on the buffer offsets, so scale the delta
        imgOffsetX += dx * scaleX;
        imgOffsetY += dy * scaleY;

        startX = x;
        startY = y;
        scheduleRender();
    }
});
window.addEventListener('mouseup', () => {
    if (isErasing) {
        isErasing = false;
        renderCanvas(); // Trigger a final high-quality render
        saveState(); // Save state after erasing stops
    }
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    if (isErasing) {
        isErasing = false;
        renderCanvas(); // Trigger a final high-quality render
        saveState(); // Save state after erasing stops
    }
});

rotSlider.addEventListener('input', () => { currentRotation = parseFloat(rotSlider.value); rotValue.textContent = currentRotation + "°"; renderCanvas(); saveState(); });
rotMinus.addEventListener('click', () => { currentRotation -= 0.25; updateRotationUI(); });
rotPlus.addEventListener('click', () => { currentRotation += 0.25; updateRotationUI(); });
function updateRotationUI() { rotSlider.value = currentRotation; rotValue.textContent = currentRotation + "°"; renderCanvas(); saveState(); }

scaleSelect.addEventListener('change', () => {
    imgOffsetX = 0; imgOffsetY = 0;
    zoomSlider.value = 100; zoomValue.textContent = formatZoom(100);
    const mode = scaleSelect.value;
    const selectedOption = scaleSelect.options[scaleSelect.selectedIndex];

    // Clear the form for creating new presets
    presetName.value = '';
    newPresetW.value = '';
    newPresetH.value = '';
    newPresetUnit.value = 'px';
    newPresetKB.value = '';
    newPresetDPI.value = '';

    const customPreset = customPresets.find(p => p.value === mode);

    if (customPreset) {
        // This is a custom preset
        // 1. Populate hidden fields for rendering logic
        targetDPI.value = customPreset.dpi;
        targetKB.value = customPreset.kb;
        customUnit.value = customPreset.unit;
        customW.value = customPreset.w;
        customH.value = customPreset.h;

        // 2. Populate the visible "Preset Name" form for editing/viewing
        presetName.value = customPreset.name;
        newPresetW.value = customPreset.w;
        newPresetH.value = customPreset.h;
        newPresetUnit.value = customPreset.unit;
        newPresetKB.value = customPreset.kb;
        newPresetDPI.value = customPreset.dpi;

    } else if (mode > 0) {
        // This is a built-in preset
        if (mode === "1") {
            targetDPI.value = 300; targetKB.value = 50;
            customUnit.value = "mm"; customW.value = 35; customH.value = 45;
        } else if (mode === "2") {
            targetDPI.value = 300; targetKB.value = 25;
            customUnit.value = "px"; customW.value = 213; customH.value = 213;
        } else if (mode === "3") {
            targetDPI.value = 600; targetKB.value = 45;
            customUnit.value = "px"; customW.value = 400; customH.value = 200;
        } else if (mode === "4") {
            targetDPI.value = 300; targetKB.value = 100;
            customUnit.value = "mm"; customW.value = 86; customH.value = 54;
        } else if (mode === "5") {
            targetDPI.value = 300; targetKB.value = 30;
            customUnit.value = "px"; customW.value = 238; customH.value = 306;
        } else if (mode === "6") {
            targetDPI.value = 300; targetKB.value = 20;
            customUnit.value = "px"; customW.value = 350; customH.value = 150;
        } else if (mode === "7") {
            targetDPI.value = 300; targetKB.value = 100;
            customUnit.value = "px"; customW.value = 150; customH.value = 200;
        } else if (mode === "8") {
            targetDPI.value = 300; targetKB.value = 150;
            customUnit.value = "in"; customW.value = 4; customH.value = 6;
        } else if (mode === "9") {
            targetDPI.value = 300; targetKB.value = 15;
            customUnit.value = "px"; customW.value = 413; customH.value = 531;
        } else if (mode === "10") {
            targetDPI.value = 300; targetKB.value = 15;
            customUnit.value = "px"; customW.value = 256; customH.value = 64;
        } else if (mode === "11") {
            targetDPI.value = 200; targetKB.value = 60;
            customUnit.value = "cm"; customW.value = 3.5; customH.value = 1.5;
        } else if (mode === "12") {
            targetDPI.value = 200; targetKB.value = 60;
            customUnit.value = "cm"; customW.value = 3.5; customH.value = 1.5;
        } else if (mode === "13") {
            targetDPI.value = 300; targetKB.value = 30;
            customUnit.value = "px"; customW.value = 200; customH.value = 240;
        } else if (mode === "14") {
            targetDPI.value = 300; targetKB.value = 15;
            customUnit.value = "px"; customW.value = 240; customH.value = 80;
        } else if (mode === "15") {
            targetDPI.value = 300; targetKB.value = 30;
            customUnit.value = "px"; customW.value = 200; customH.value = 230;
        } else if (mode === "16") {
            targetDPI.value = 300; targetKB.value = 15;
            customUnit.value = "px"; customW.value = 140; customH.value = 60;
        } else if (mode === "17") {
            targetDPI.value = 300; targetKB.value = 30;
            customUnit.value = "px"; customW.value = 110; customH.value = 140;
        } else if (mode === "18") {
            targetDPI.value = 300; targetKB.value = 30;
            customUnit.value = "px"; customW.value = 140; customH.value = 110;
        } else if (mode === "19") {
            targetDPI.value = 300; targetKB.value = 50;
            customUnit.value = "px"; customW.value = 240; customH.value = 320;
        } else if (mode === "20") {
            targetDPI.value = 300; targetKB.value = 50;
            customUnit.value = "px"; customW.value = 140; customH.value = 60;
        } else if (mode === "21") {
            targetDPI.value = 200; targetKB.value = 35;
            customUnit.value = "cm"; customW.value = 2.5; customH.value = 3.5;
        } else if (mode === "22") {
            targetDPI.value = 200; targetKB.value = 35;
            customUnit.value = "cm"; customW.value = 4.5; customH.value = 2;
        }

        // Populate the visible "Preset Name" form with the values from the selected built-in preset
        presetName.value = selectedOption.text.substring(selectedOption.text.indexOf(' ') + 1);
        newPresetW.value = customW.value;
        newPresetH.value = customH.value;
        newPresetUnit.value = customUnit.value;
        newPresetKB.value = targetKB.value;
        newPresetDPI.value = targetDPI.value;

    } else {
        // This is the default "Image Selection" (mode "0")
        targetDPI.value = 72;
        targetKB.value = 5;
        customW.value = 0;
        customH.value = 0;
        customUnit.value = "px";
    }
    renderCanvas();
    saveState(); // Save state after preset selection
});

bgColor.addEventListener('input', () => { renderCanvas(); saveState(); });
bgRemover.addEventListener('input', () => { renderCanvas(); saveState(); });
bgFeather.addEventListener('input', () => { renderCanvas(); saveState(); });

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 255, g: 255, b: 255 };
}

function getMaskDimensions() {
    const w = parseFloat(customW.value);
    const h = parseFloat(customH.value);
    const unit = customUnit.value;
    const dpi = parseInt(targetDPI.value) || 96;

    if (!w || !h || w <= 0 || h <= 0) return null;

    let pxW, pxH;
    if (unit === 'px') { pxW = w; pxH = h; }
    else if (unit === 'in') { pxW = w * dpi; pxH = h * dpi; }
    else if (unit === 'mm') { pxW = (w / 25.4) * dpi; pxH = (h / 25.4) * dpi; }
    else if (unit === 'cm') { pxW = (w / 2.54) * dpi; pxH = (h / 2.54) * dpi; }

    if (pxW > 10000 || pxH > 10000) {
        alert('Image dimensions are too large. Please enter smaller values.');
        return null;
    }

    return { w: Math.round(pxW), h: Math.round(pxH) };
}

function convolute(data, width, height, kernel, opaque) {
    const side = Math.round(Math.sqrt(kernel.length));
    const halfSide = Math.floor(side / 2);
    const src = data;
    const sw = width;
    const sh = height;
    const output = new Uint8ClampedArray(src.length);

    for (let i = 0; i < src.length; i += 4) { output[i+3] = src[i+3]; }

    for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
            const dstOff = (y * sw + x) * 4;
            let r = 0, g = 0, b = 0;

            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    const scy = y + cy - halfSide;
                    const scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        const srcOff = (scy * sw + scx) * 4;
                        const wt = kernel[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                    }
                }
            }
            output[dstOff] = r;
            output[dstOff + 1] = g;
            output[dstOff + 2] = b;
            if (opaque) { output[dstOff + 3] = 255; }
            else { output[dstOff + 3] = src[dstOff + 3]; }
        }
    }
    return output;
}

function applyMidtones(data, midtone) {
    if (midtone === 0) return;
    const gamma = Math.pow(2, -midtone / 100);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 * Math.pow(data[i] / 255, gamma);
        data[i + 1] = 255 * Math.pow(data[i + 1] / 255, gamma);
        data[i + 2] = 255 * Math.pow(data[i + 2] / 255, gamma);
    }
}

function isPointInImage(x, y, size) {
    if (!currentImage) return false;

    const mask = getMaskDimensions();
    if (mask) {
        // If a preset scale is active, confine erasing to within that box.
        const startX = (canvas.width - mask.w) / 2;
        const startY = (canvas.height - mask.h) / 2;
        const endX = startX + mask.w;
        const endY = startY + mask.h;

        // Use inclusive check. The clipping in `renderCanvas` will prevent any overflow.
        return x >= startX && x <= endX && y >= startY && y <= endY;
    }

    // If no preset is active, confine erasing to within the image's boundaries.
    let fitScale = Math.min(canvas.width / currentImage.width, canvas.height / currentImage.height);
    
    const zoomFactor = parseInt(zoomSlider.value) / 100;
    const finalDrawW = (currentImage.width * fitScale) * zoomFactor;
    const finalDrawH = (currentImage.height * fitScale) * zoomFactor;
    const imgCx = (canvas.width / 2) + imgOffsetX;
    const imgCy = (canvas.height / 2) + imgOffsetY;
    
    const halfW = finalDrawW / 2;
    const halfH = finalDrawH / 2;
    
    // Inverse-rotate the mouse point to see if it's inside the image's unrotated bounding box.
    const dx = x - imgCx;
    const dy = y - imgCy;
    const inverseAngleRad = -currentRotation * (Math.PI / 180);
    const invCos = Math.cos(inverseAngleRad);
    const invSin =  Math.sin(inverseAngleRad);
    const rx = dx * invCos - dy * invSin;
    const ry = dx * invSin + dy * invCos;

    return rx >= -halfW && rx <= halfW && ry >= -halfH && ry <= halfH;
}


function scheduleRender() {
    if (!isRenderScheduled) {
        isRenderScheduled = true;
        requestAnimationFrame(() => {
            renderCanvas();
            isRenderScheduled = false;
        });
    }
}

function drawEraser(x, y) {
    maskCtx.beginPath();
    maskCtx.arc(x, y, eraserSize / 2, 0, Math.PI * 2, true);
    maskCtx.fill();
}

function eraseAt(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (e.clientX - rect.left) * scaleX;
    const canvasY = (e.clientY - rect.top) * scaleY;

    maskCtx.globalCompositeOperation = 'destination-out';
    drawEraser(canvasX, canvasY);
    
    scheduleRender();
}

function renderCanvas() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mask = getMaskDimensions();

    if (currentImage) {
        // Reuse globally declared canvases
        gfxCanvas.width = canvas.width;
        gfxCanvas.height = canvas.height;
        gfxCtx.clearRect(0, 0, gfxCanvas.width, gfxCanvas.height); // Clear previous content

        let fitScale = mask
            ? Math.min(mask.w / currentImage.width, mask.h / currentImage.height)
            : Math.min(canvas.width / currentImage.width, canvas.height / currentImage.height);

        let procScale = fitScale;
        const maxProcDimension = 1500;
        let fitW = currentImage.width * fitScale;
        let fitH = currentImage.height * fitScale;

        if (fitW > maxProcDimension || fitH > maxProcDimension) {
            procScale = fitScale * Math.min(maxProcDimension / fitW, maxProcDimension / fitH);
        }

        const procW = Math.max(1, Math.floor(currentImage.width * procScale));
        const procH = Math.max(1, Math.floor(currentImage.height * procScale));

        tempEffectCanvas.width = procW;
        tempEffectCanvas.height = procH;
        tCtx.clearRect(0, 0, tempEffectCanvas.width, tempEffectCanvas.height); // Clear previous content

        const brightVal = parseInt(brightnessSlider.value);
        const contrastVal = parseInt(contrastSlider.value);
        const hueVal = parseInt(hueSlider.value);
        const mode = colorMode.value;
        let filterString = `brightness(${100 + brightVal}%) contrast(${100 + contrastVal}%) hue-rotate(${hueVal}deg)`;
        if (mode === 'bw') filterString += ' grayscale(100%)';
        tCtx.filter = filterString;
        tCtx.drawImage(currentImage, 0, 0, tempEffectCanvas.width, tempEffectCanvas.height);
        tCtx.filter = 'none';

        const sharpenVal = parseInt(sharpnessSlider.value);
        const threshold = parseInt(bgRemover.value);
        const midtoneVal = parseInt(midtoneSlider.value);
        if (!isDragging && (sharpenVal > 0 || threshold > 0 || midtoneVal !== 0)) {
            const imgData = tCtx.getImageData(0, 0, tempEffectCanvas.width, tempEffectCanvas.height);
            let data = imgData.data;
            if (midtoneVal !== 0) applyMidtones(data, midtoneVal);
            if (sharpenVal > 0) {
                 const mix = sharpenVal / 100.0;
                 const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
                 const sharpData = convolute(data, tempEffectCanvas.width, tempEffectCanvas.height, kernel, false);
                 for (let i = 0; i < data.length; i += 4) {
                     data[i] = data[i] * (1 - mix) + sharpData[i] * mix;
                     data[i+1] = data[i+1] * (1 - mix) + sharpData[i+1] * mix;
                     data[i+2] = data[i+2] * (1 - mix) + sharpData[i+2] * mix;
                 }
            }
            if (threshold > 0) {
                const tr = targetRemoveColor.r; const tg = targetRemoveColor.g; const tb = targetRemoveColor.b;
                const featherVal = parseInt(bgFeather.value); const featherRange = featherVal * 4;
                for (let i = 0; i < data.length; i += 4) {
                    const r=data[i], g=data[i+1], b=data[i+2];
                    const maxDiff = Math.max(Math.abs(r - tr), Math.abs(g - tg), Math.abs(b - tb));
                    if (maxDiff < threshold) {
                        data[i+3] = 0;
                    } else if (featherVal > 0 && maxDiff < (threshold + featherRange)) {
                        let factor = (maxDiff - threshold) / featherRange;
                        data[i+3] = Math.round(data[i+3] * factor);
                    }
                }
            }
            tCtx.putImageData(imgData, 0, 0);
        }

        const zoomFactor = parseInt(zoomSlider.value) / 100;
        const finalDrawW = fitW * zoomFactor;
        const finalDrawH = fitH * zoomFactor;

        gfxCtx.save();
        gfxCtx.translate((canvas.width / 2) + imgOffsetX, (canvas.height / 2) + imgOffsetY);
        gfxCtx.rotate((currentRotation * Math.PI) / 180);
        gfxCtx.drawImage(tempEffectCanvas, -finalDrawW / 2, -finalDrawH / 2, finalDrawW, finalDrawH);
        gfxCtx.restore();

        gfxCtx.globalCompositeOperation = 'destination-in';
        gfxCtx.drawImage(eraserMask, 0, 0);

        ctx.save();
        if (mask) {
            const startX = (canvas.width - mask.w) / 2;
            const startY = (canvas.height - mask.h) / 2;
            ctx.rect(startX, startY, mask.w, mask.h);
            ctx.clip();
            
            ctx.fillStyle = bgColor.value;
            ctx.fillRect(startX, startY, mask.w, mask.h);
        }
        
        ctx.drawImage(gfxCanvas, 0, 0);
        ctx.restore();

    } else {
        ctx.beginPath();
        ctx.strokeStyle = "#dcdcdc";
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
        for (let y = 0; y <= canvas.height; y += 50) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
        ctx.stroke();
    }

    if (!isDownloading) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.stroke();

        if (mask) {
            const startX = (canvas.width - mask.w) / 2;
            const startY = (canvas.height - mask.h) / 2;
            ctx.beginPath();
            ctx.rect(startX, startY, mask.w, mask.h);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    }

    // Draw temporary eraser feedback
    if (isEraseMode && isErasing) {
        ctx.beginPath();
        ctx.arc(lastEraserX, lastEraserY, eraserSize / 2, 0, Math.PI * 2, true);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
    }
}
function changeDpiBlob(blob, dpi) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const buffer = e.target.result;
            const view = new DataView(buffer);
            
            if (view.byteLength < 2 || view.getUint16(0) !== 0xFFD8) {
                // Not a valid JPEG, return original blob
                resolve(blob);
                return;
            }

            let offset = 2;
            let foundAPP0 = false;
            let foundEXIF = false;

            while (offset + 3 < view.byteLength) {
                const marker = view.getUint16(offset);

                if (marker === 0xFFE0) { // APP0
                    if (offset + 14 < view.byteLength) {
                        foundAPP0 = true;
                        // Check for 'JFIF' identifier
                        const jfif = [view.getUint8(offset + 4), view.getUint8(offset + 5), view.getUint8(offset + 6), view.getUint8(offset + 7), view.getUint8(offset + 8)];
                        if (jfif[0] === 0x4A && jfif[1] === 0x46 && jfif[2] === 0x49 && jfif[3] === 0x46 && jfif[4] === 0x00) {
                            view.setUint8(offset + 11, 1); // Density units: 1 = pixels per inch
                            view.setUint16(offset + 12, dpi); // X density
                            view.setUint16(offset + 14, dpi); // Y density
                        }
                    }
                    break; 
                } else if (marker === 0xFFE1) { // APP1 (often EXIF)
                    foundEXIF = true;
                    // We found EXIF data, so we won't inject a JFIF header.
                    // A more advanced implementation would parse the EXIF and modify the DPI tags there.
                    break;
                } else if (marker >= 0xFFC0 && marker <= 0xFFCF && marker !== 0xFFC4 && marker !== 0xFFC8 && marker !== 0xFFCC) {
                    // Start of Frame marker, stop searching
                    break;
                }
                
                const len = view.getUint16(offset + 2);
                offset += 2 + len;
            }

            if (foundAPP0 && !foundEXIF) {
                resolve(new Blob([view], { type: "image/jpeg" }));
            } else {
                // If we found EXIF or didn't find a usable APP0, return the original blob
                // to avoid corrupting the file.
                resolve(blob);
            }
        };
        reader.onerror = () => {
            // If there's an error reading the blob, return the original
            resolve(blob);
        };
        reader.readAsArrayBuffer(blob);
    });
}

// === DOWNLOAD LOGIC (ALWAYS FULL RES) ===
async function downloadImage(format) {
    if (!currentImage) {
        alert("Please Insert an Image first.");
        return;
    }

    try {
        console.log("--- Download Image Debug Info ---");
        console.log("Custom Width:", customW.value, "Custom Height:", customH.value, "Unit:", customUnit.value, "Target DPI:", targetDPI.value);
        let mask = getMaskDimensions();
        if (!mask) {
            console.error("getMaskDimensions returned null. Cannot download.");
            alert("Please specify valid image dimensions or select a preset.");
            return;
        }
        console.log("Calculated Mask (Target Pixel Dimensions):", mask.w, "x", mask.h);

        isDownloading = true;
        renderCanvas(); // Update UI to show something is happening

        // 1. Create a full-size 2000x2000 canvas to render the scene
        const fullCanvas = document.createElement('canvas');
        fullCanvas.width = 2000;
        fullCanvas.height = 2000;
        const fCtx = fullCanvas.getContext('2d');

        // 2. Define the target area (the "red box") on the full canvas
        const startX = (2000 - mask.w) / 2;
        const startY = (2000 - mask.h) / 2;

        // 3. Render the scene onto this full-size canvas
        fCtx.save();
        fCtx.beginPath();
        fCtx.rect(startX, startY, mask.w, mask.h);
        fCtx.clip(); // Clip to the final image dimensions area

        fCtx.fillStyle = bgColor.value;
        fCtx.fillRect(0, 0, 2000, 2000);

        if (currentImage) {
            // Temp canvas for applying filters. This should be the final output dimensions.
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = mask.w; // Final output width based on DPI and preset/custom dimensions
            tempCanvas.height = mask.h; // Final output height based on DPI and preset/custom dimensions
            const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true }); // Ensure this context allows image data ops

            // Apply filters (brightness, contrast, etc.)
            const brightVal = parseInt(brightnessSlider.value);
            const contrastVal = parseInt(contrastSlider.value);
            const midtoneVal = parseInt(midtoneSlider.value);
            const hueVal = parseInt(hueSlider.value);
            const mode = colorMode.value;
            const b = 100 + brightVal;
            const c = 100 + contrastVal;
            let filterString = `brightness(${b}%) contrast(${c}%) hue-rotate(${hueVal}deg)`;
            if (mode === 'bw') filterString += ' grayscale(100%)';
            tCtx.filter = filterString;

            // Calculate the scaling and positioning of the currentImage onto the tempCanvas (mask.w x mask.h)
            // This takes into account the original image's aspect ratio, user zoom, offset, and rotation.
            const outputScale = Math.min(mask.w / currentImage.width, mask.h / currentImage.height);
            const zoomFactor = parseInt(zoomSlider.value) / 100;
            
            // Image dimensions after initial fit to mask and user zoom
            const imgDrawWidth = currentImage.width * outputScale * zoomFactor;
            const imgDrawHeight = currentImage.height * outputScale * zoomFactor;

            // Center the image on the tempCanvas initially, then apply user offsets
            let imgDrawX = (mask.w - imgDrawWidth) / 2 + imgOffsetX;
            let imgDrawY = (mask.h - imgDrawHeight) / 2 + imgOffsetY;
            
            tCtx.save();
            tCtx.translate(imgDrawX + imgDrawWidth / 2, imgDrawY + imgDrawHeight / 2);
            tCtx.rotate((currentRotation * Math.PI) / 180);
            tCtx.filter = filterString; // Re-apply filter here after transformations to ensure correct rendering
            tCtx.drawImage(currentImage, -imgDrawWidth / 2, -imgDrawHeight / 2, imgDrawWidth, imgDrawHeight);
            tCtx.filter = 'none'; // Reset filter
            tCtx.restore();

            // Apply post-processing (sharpen, bg removal)
            const sharpenVal = parseInt(sharpnessSlider.value);
            const threshold = parseInt(bgRemover.value);
            if (sharpenVal > 0 || threshold > 0 || midtoneVal !== 0) {
                const imgData = tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                let data = imgData.data;
                if (midtoneVal !== 0) applyMidtones(data, midtoneVal);
                if (sharpenVal > 0) {
                    const mix = sharpenVal / 100.0;
                    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
                    const sharpData = convolute(data, tempCanvas.width, tempCanvas.height, kernel, false);
                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = data[i] * (1 - mix) + sharpData[i] * mix;
                        data[i+1] = data[i+1] * (1 - mix) + sharpData[i+1] * mix;
                        data[i+2] = data[i+2] * (1 - mix) + sharpData[i+2] * mix;
                    }
                }
                if (threshold > 0) {
                    const tr = targetRemoveColor.r; const tg = targetRemoveColor.g; const tb = targetRemoveColor.b;
                    const featherVal = parseInt(bgFeather.value); const featherRange = featherVal * 4;
                    for (let i = 0; i < data.length; i += 4) {
                        const r=data[i], g=data[i+1], b=data[i+2];
                        const maxDiff = Math.max(Math.abs(r - tr), Math.abs(g - tg), Math.abs(b - tb));
                        if (maxDiff < threshold) {
                            data[i+3] = 0; // Make transparent
                        } else if (featherVal > 0 && maxDiff < (threshold + featherRange)) {
                            let factor = (maxDiff - threshold) / featherRange;
                            data[i+3] = Math.round(data[i+3] * factor);
                        }
                    }
                }
                tCtx.putImageData(imgData, 0, 0);
            }

            // Draw this processed tempCanvas (which is mask.w x mask.h) onto the fullCanvas at the mask area.
            fCtx.drawImage(tempCanvas, startX, startY, mask.w, mask.h);

        }
        fCtx.restore(); // Restore from the clip

        // 4. Apply the eraser mask at its native 2000x2000 resolution
        fCtx.save();
            fCtx.globalCompositeOperation = 'destination-in';
            fCtx.drawImage(eraserMask, 0, 0);
            fCtx.restore();
        
            // Fill erased (transparent) areas with the selected background color
            fCtx.save();
            fCtx.globalCompositeOperation = 'destination-over';
            fCtx.fillStyle = bgColor.value;
            fCtx.fillRect(0, 0, fullCanvas.width, fullCanvas.height);
            fCtx.restore();
        
            // 5. Create the final destination canvas and crop from the full canvas
            const destCanvas = document.createElement('canvas');
            destCanvas.width = mask.w;        destCanvas.height = mask.h;
        const dCtx = destCanvas.getContext('2d');
        dCtx.drawImage(fullCanvas, startX, startY, mask.w, mask.h, 0, 0, mask.w, mask.h);

        console.log("Dest Canvas Dimensions before sending to worker:", destCanvas.width, "x", destCanvas.height);
        // 6. Pass the final cropped image data to the worker
        const goalKB = parseInt(targetKB.value);
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = 0.8;
        const worker = new Worker('worker.js');

        worker.onmessage = async (e) => {
            let { bestBlob, bestSize } = e.data;
            if (bestBlob) {
                const dpi = parseInt(targetDPI.value);
                if (format === 'jpg' || format === 'jpeg') {
                    bestBlob = await changeDpiBlob(bestBlob, dpi);
                }
                const link = document.createElement('a');
                link.download = `image-${mask.w}x${mask.h}-${Math.round(bestSize)}KB-${dpi}dpi.${format}`;
                link.href = URL.createObjectURL(bestBlob);
                link.click();
            } else {
                alert("Failed to generate image.");
            }
            worker.terminate();
            isDownloading = false;
            renderCanvas();
        };

        worker.onerror = (e) => {
            console.error("Worker Error:", e);
            alert("An error occurred in the worker: " + e.message);
            worker.terminate();
            isDownloading = false;
            renderCanvas();
        };

        const imageData = dCtx.getImageData(0, 0, destCanvas.width, destCanvas.height);
        worker.postMessage({ imageData, format: mimeType, quality, goalKB });

    } catch (err) {
        console.error("Download Error:", err);
        alert("An error occurred while downloading: " + err.message);
        isDownloading = false;
        renderCanvas();
    }
}

document.getElementById('dlPng').addEventListener('click', () => downloadImage('png'));
document.getElementById('dlJpg').addEventListener('click', () => downloadImage('jpg'));

renderCanvas();
