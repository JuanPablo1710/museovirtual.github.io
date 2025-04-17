document.addEventListener('DOMContentLoaded', () => {
    // Secciones
    const homeSection = document.getElementById('home');
    const museumSection = document.getElementById('museum');
    const enterBtn = document.getElementById('enter-btn');
  
    // Elementos del carrusel
    const slideTitle = document.querySelector('.carousel .art-title');
    const slideAuthor = document.querySelector('.carousel .art-author');
    const slideImg = document.querySelector('.slide img');
    const slideDesc = document.querySelector('.slide .description');
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
  
    // Datos de las obras
    let artworks = [];
    let currentIndex = 0;
  
    // Carga de datos desde JSON externo
    fetch('artworks.json')
      .then(response => response.json())
      .then(data => {
        artworks = data;
      })
      .catch(error => console.error('Error al cargar artworks.json:', error));
  
    // Función para mostrar slide
    function showSlide(index) {
      if (!artworks.length) return;
      const { title, author, src, description } = artworks[index];
      slideTitle.textContent = title;
      slideAuthor.textContent = author;
      slideImg.src = src;
      slideImg.alt = `Obra ${index + 1}`;
      slideDesc.innerHTML = description.replace(/\\n/g, '<br>');
    }
  
    // Navegación
    prevBtn.addEventListener('click', () => {
      if (!artworks.length) return;
      currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
      showSlide(currentIndex);
    });
  
    nextBtn.addEventListener('click', () => {
      if (!artworks.length) return;
      currentIndex = (currentIndex + 1) % artworks.length;
      showSlide(currentIndex);
    });
  
    // Mostrar museo y eliminar sección de inicio
    enterBtn.addEventListener('click', () => {
      homeSection.remove();
      museumSection.classList.remove('hidden');
      showSlide(currentIndex);
    });
  });
  