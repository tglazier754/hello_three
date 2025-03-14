

let prevMousePos = {};
let isDragging = false;
let isPanning = false;

const trackMouseMove = (e) => {
    if (prevMousePos.x !== undefined && prevMousePos.y !== undefined) {
        const delta = { x: e.clientX - prevMousePos.x, y: e.clientY - prevMousePos.y };
        const angle = Math.atan2(e.clientY - prevMousePos.y, e.clientX - prevMousePos.x) * 180 / Math.PI;
        broadcastMouseEvent(delta)
    }
    prevMousePos = { x: e.clientX, y: e.clientY };
}

const broadcastMouseEvent = (delta) => {
    console.log("broadcast");
    const eventType = isPanning ? "camerapan" : "camerarotate";
    const event = new CustomEvent(eventType, { detail: delta });
    window.dispatchEvent(event);
}

window.addEventListener("mousedown", (e) => {
    if (e.shiftKey) {
        isPanning = true;
    }
    isDragging = true;
    document.addEventListener("mousemove", trackMouseMove)
})

window.addEventListener("mouseup", (e) => {
    isDragging = false;
    isPanning = false;
    document.removeEventListener("mousemove", trackMouseMove);
    prevMousePos = {};
})
