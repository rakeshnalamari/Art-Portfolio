const heroName = document.getElementById("heroName");

if(heroName){
  const text = heroName.textContent;
  heroName.textContent = "";

  text.split("").forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    heroName.appendChild(span);
  });
}


const categories = {
  Animals: {count:6, prefix:"a"},
  Famous_Persons: {count:5, prefix:"f"},
  Gods: {count:17, prefix:"g"},
  Hollywood_Characters: {count:8, prefix:"hc"},
  Indian_Actors: {count:36, prefix:"ia"},
  Pen: {count:10, prefix:"pen"},
  Pencil: {count:7, prefix:"p"},
  Prabhas: {count:15, prefix:"prab"}
};

const gallery = document.getElementById("galleryGrid");
if(gallery){
  const btnBox = document.getElementById("categoryButtons");
  let allImages = [];

  // =========================
  // CREATE CATEGORY BUTTONS
  // =========================
  ["All", ...Object.keys(categories)].forEach(cat=>{
    const b = document.createElement("button");
    b.textContent = cat.replace("_"," ");
    b.classList.add('reveal'); // for fade-in animation only
    b.onclick = e => selectCategory(cat, e);
    btnBox.appendChild(b);
  });

  // =========================
  // FADE-IN REVEAL ANIMATION (no shadow)
  // =========================
  const revealButtons = btnBox.querySelectorAll('.reveal');
  revealButtons.forEach((btn, idx)=>{
    setTimeout(()=>btn.classList.add('visible'), idx*80); // only opacity/fade-in
  });

  // =========================
  // BUILD GALLERY IMAGES
  // =========================
  Object.entries(categories).forEach(([cat, data])=>{
    for(let i=1;i<=data.count;i++){
      const img = document.createElement("img");
      const base = `images/${cat}/${data.prefix}${i}`;
      
      img.dataset.cat = cat;
      img.dataset.title = `${cat.replace("_"," ")} #${i}`; // tooltip
      
      img.src = base+".jpg";
      img.onerror = ()=>{ img.onerror=null; img.src=base+".png"; };

      // =========================
      // LIGHTBOX CLICK
      // =========================
      img.onclick = ()=>{ 
        lightbox.style.display="flex"; 
        lightboxImg.src = img.src;
      };

      gallery.appendChild(img);
      allImages.push(img);
    }
  });

  // =========================
  // LIGHTBOX
  // =========================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  lightbox.onclick = ()=> lightbox.style.display="none";

  if(lightboxImg){
    // 3D tilt effect
    lightboxImg.addEventListener('mousemove', e=>{
      const rect = lightboxImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const offsetX = (x - rect.width/2)/20;
      const offsetY = (y - rect.height/2)/20;
      lightboxImg.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg) scale(1.03)`;
    });
    lightboxImg.addEventListener('mouseleave', ()=>{
      lightboxImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // =========================
  // FILTER FUNCTION (hover disabled for hidden images)
  // =========================
function selectCategory(cat, e){
  document.querySelectorAll(".catBtns button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active"); // active style only

  allImages.forEach(img => {
    if(cat === "All" || img.dataset.cat === cat){
      img.classList.remove('hide');
      img.classList.remove('no-hover'); // enable hover
    } else {
      img.classList.add('hide');
      img.classList.add('no-hover'); // disable hover
    }
  });
}
}


// =========================
// BUTTON REVEAL ANIMATION
// =========================
const revealButtons = btnBox.querySelectorAll('.reveal');

// Remove 'active' on load, only add for animation class
revealButtons.forEach((btn, idx)=>{
  setTimeout(()=>{
    btn.classList.add('active'); // this is animation only
    btn.style.boxShadow = "none"; // ensure no shadow at start
  }, idx*80);
});
