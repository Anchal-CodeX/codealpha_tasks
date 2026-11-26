
const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const preview = document.querySelector(".lightbox img");

const images = [
    {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        category: "nature"
    },
     {
        src: "https://i.pinimg.com/736x/8f/ac/10/8fac10e43472ec8360d039c2da28f5a5.jpg",
        category: "anime"
    },
    {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        category: "space"
    },
    {
        src:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
        category: "nature"
    },{
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkLu3TppRBNPsBodG1zSZDT9PkNBPiDQZ8ipe2d3ASwj_Fw0TtkeODNx3&s=10",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
        category: "space"
    },
     {
        src:"https://i.pinimg.com/736x/a0/84/de/a084de037ed6ee3ed2c5df65564b2efe.jpg",
        category:"anime"
    },
    {
        src:"https://i.pinimg.com/736x/c3/1c/83/c31c836828f4c30449f2ee629196b40d.jpg",
        category : "space"
    },
    {
        src: "https://i.pinimg.com/736x/b2/ee/a5/b2eea563616cf9b7f98af9b0b4ab21db.jpg",
        category: "anime"
    },
    {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        category: "space"
    },
    {
        src:"https://i.pinimg.com/736x/db/34/ca/db34cac63b2bb9c791ab6a252bdea14a.jpg",
        category: "anime"
    }
   
];

let currentIndex = 0;
let visibleImages = images;

// Display images
function showImages(data) {

    gallery.innerHTML = "";

    data.forEach((image, index) => {

        const img = document.createElement("img");

        img.src = image.src;
        img.alt = image.category;

        img.addEventListener("click", () => {
            currentIndex = index;
            openPreview();
        });

        gallery.appendChild(img);
    });
}

showImages(images);

// Open preview
function openPreview() {
    lightbox.classList.add("show");
    preview.src = visibleImages[currentIndex].src;
    updateCount();
}

// Update image number
function updateCount() {
    document.querySelector(".image-count").textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;
}

// Next image
document.querySelector(".next").addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    openPreview();
});

// Previous image
document.querySelector(".prev").addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    openPreview();
});

// Close preview
document.querySelector(".close").addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// Close on background click
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// Category filters
document.querySelectorAll(".filters button").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".active").classList.remove("active");
        button.classList.add("active");

        const category = button.dataset.category;

        visibleImages = category === "all"
            ? images
            : images.filter(image => image.category === category);

        currentIndex = 0;
        showImages(visibleImages);
    });
});
