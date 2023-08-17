let draggedItem = null;

const nonImageArea = document.getElementById('nonImageArea');
const mappingArea = document.getElementById('mappingArea');
const draggableItems = document.querySelectorAll('.draggable');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', e => {
        draggedItem = e.target;
    });

    item.addEventListener('dragend', e => {
        draggedItem = null;
    });
});

nonImageArea.addEventListener('dragover', e => {
    e.preventDefault();
});

mappingArea.addEventListener('dragover', e => {
    e.preventDefault();
});

nonImageArea.addEventListener('drop', e => {
    if (draggedItem) {
        draggedItem.style.left = ''; // スタイルをリセット
        draggedItem.style.top = '';  // スタイルをリセット
        nonImageArea.appendChild(draggedItem);
    }
});

mappingArea.addEventListener('drop', e => {
    if (draggedItem) {
        const rect = mappingArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        draggedItem.style.left = `${x - (draggedItem.offsetWidth / 2)}px`;
        draggedItem.style.top = `${y - (draggedItem.offsetHeight / 2)}px`;
        draggedItem.crossOrigin = "anonymous"; 
        mappingArea.appendChild(draggedItem);
    }
});

function downloadImage() {
    html2canvas(document.getElementById('print-area')).then(canvas => {
        let base64 = canvas.toDataURL('image/png');
        $("#download").attr("href", base64);
        $("#download").attr("download", "captured.png");
        $("#download")[0].click();
    });
}
