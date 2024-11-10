const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
const clearGalleryButton = document.getElementById('clearGallery');
const removeLastButton = document.getElementById('removeLast');
const reverseGalleryButton = document.getElementById('reverseGallery');

let imageCount = 4;
let loadedImages = [];

async function loadImages(count) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 100)}&limit=${count}`);
        const images = await response.json();
        images.forEach(image => {
            if (!loadedImages.includes(image.id)) {
                const img = document.createElement('img');
                img.src = `https://picsum.photos/id/${image.id}/200/200`;
                gallery.appendChild(img);
                loadedImages.push(image.id);
            }
        });
    } catch (error) {
        console.error('Помилка завантаження зображень:', error);
    }
}


loadImages(imageCount);

loadMoreButton.addEventListener('click', () => loadImages(4));
clearGalleryButton.addEventListener('click', () => {
    gallery.innerHTML = '';
    loadedImages = [];
});
removeLastButton.addEventListener('click', () => {
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        loadedImages.pop();
    }
});
reverseGalleryButton.addEventListener('click', () => {
    const images = Array.from(gallery.children);
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
});
