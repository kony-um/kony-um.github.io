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

    item.addEventListener('touchstart', e => {
        draggedItem = e.target;
        let touch = e.touches[0];
        startX = touch.clientX - parseFloat(draggedItem.style.left || 0);
        startY = touch.clientY - parseFloat(draggedItem.style.top || 0);        
        e.preventDefault();
    });
    item.addEventListener('touchmove', e => {
        if (!draggedItem) return;
        let touch = e.touches[0];
        draggedItem.style.left = `${touch.clientX - startX}px`;
        draggedItem.style.top = `${touch.clientY - startY}px`;
        e.preventDefault();
    });
    item.addEventListener('touchend', e => {
        if (!draggedItem) return;
        rect = mappingArea.getBoundingClientRect();
        let left = parseFloat(draggedItem.style.left) + startX;
        let top = parseFloat(draggedItem.style.top) + startY;
        if (
            // マッピングエリア内に入った場合
            left >= rect.left &&
            left < rect.right &&
            top >= rect.top &&
            top < rect.bottom
        ) {
            const touch = e.changedTouches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            draggedItem.style.left = `${x - (draggedItem.offsetWidth / 2)}px`;
            draggedItem.style.top = `${y - (draggedItem.offsetHeight / 2)}px`;
            draggedItem.crossOrigin = "anonymous"; 
            mappingArea.appendChild(draggedItem);
        } else {
            // マッピングエリア外に出た場合
            draggedItem.style.left = ''; // スタイルをリセット
            draggedItem.style.top = '';  // スタイルをリセット
            nonImageArea.appendChild(draggedItem);
        }

        draggedItem = null;
        e.preventDefault();
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
