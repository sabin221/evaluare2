// Variabile globale pentru controlul slide-show-ului
let slideIndex = 0;
let slides = [];
let slideshowInterval = null; // Inițializat ca null
// Constanta pentru timpul de tranziție (3000 ms = 3 secunde)
const TRANSITION_TIME = 3000; 

/**
 * Ascunde toate imaginile din containerul slide-show, 
 * apoi o afișează pe următoarea în succesiune.
 */
function showSlides() {
    // Reîncărcăm lista de imagini (pentru a fi siguri)
    slides = document.getElementById("slideshow-container").getElementsByTagName("img");
    
    // Verificăm dacă există imagini de afișat
    if (slides.length === 0) {
        clearInterval(slideshowInterval);
        console.error("Nu au fost găsite imagini pentru slide-show. Verificați tag-urile <img> din index.html.");
        return;
    }

    // 1. Ascunde toate imaginile
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // 2. Incrementează indexul, și resetează la 1 (prima imagine) dacă a ajuns la final
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 3. Afișează imaginea curentă
    // slides[slideIndex - 1] este imaginea din lista curentă (indexul e bazat pe 0)
    slides[slideIndex - 1].style.display = "block";  
}

/**
 * Funcția principală apelată la dublu click (ondblclick="startSlideshow()")
 * Inițializează și pornește ciclul slide-show-ului.
 */
function startSlideshow() {
    // Verifică dacă slide-show-ul rulează deja. Dacă da, ignoră dublu click-ul.
    if (slideshowInterval) {
        return; 
    }

    // Mesaj de avertizare pentru utilizator
    const runningMessage = document.getElementById('running-message');
    if (runningMessage) {
        runningMessage.textContent = 'SLIDE-SHOW ACTIV (3 sec tranziție)';
        runningMessage.style.color = '#FF0000';
    } else {
        // Dacă mesajul nu există, îl creăm
        const sectionElement = document.getElementById("monitorizare-resurse");
        const newMessage = document.createElement('p');
        newMessage.id = 'running-message';
        newMessage.textContent = 'SLIDE-SHOW ACTIV (3 sec tranziție)';
        newMessage.style.color = '#FF0000';
        newMessage.style.textAlign = 'center';
        newMessage.style.fontWeight = 'bold';
        sectionElement.prepend(newMessage);
    }
    
    // Resetăm indexul și rulăm prima oară imediat
    slideIndex = 0;
    showSlides(); 
    
    // Setează intervalul de rulare a slide-show-ului (3000 ms = 3 secunde)
    slideshowInterval = setInterval(showSlides, TRANSITION_TIME);

    console.log(`Slide-show pornit cu un interval de ${TRANSITION_TIME / 1000} secunde.`);
}

/**
 * Asigură-te că la încărcarea inițială a paginii, doar prima imagine este vizibilă,
 * iar restul sunt ascunse.
 */
window.onload = function() {
    // Căutăm containerul de imagini
    const container = document.getElementById("slideshow-container");
    if (!container) return; 

    // Obținem toate imaginile
    slides = container.getElementsByTagName("img");
    
    // Ascunde toate imaginile, cu excepția primei (index 0)
    for (let i = 1; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}