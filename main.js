document.addEventListener('DOMContentLoaded', function () {
  let currentSection = 1;
  let totalSections = [...document.querySelectorAll('.section')];
  const arrowUp = document.querySelector('.arrow-up');
  const arrowDown = document.querySelector('.arrow-down');

  function scrollToSection(section) {
    currentSection = section;
    document.querySelectorAll('.section').forEach((sec, index) => {
      sec.style.transform = `translateY(-${(section - 1) * 100}vh)`;
    });
  }

  function scrollUp() {
    if (currentSection > 1) {
      scrollToSection(currentSection - 1);
    }
  }

  function scrollDown() {
    if (currentSection < totalSections.length) {
      scrollToSection(currentSection + 1);
    }
  }

  // Arrow nav controls
  arrowUp.addEventListener('click', function (event) {
    scrollUp();
  });
  arrowDown.addEventListener('click', function (event) {
    scrollDown();
  });

  // Create pagination - start
  const paginationEl = document.createElement('div');
  paginationEl.classList = 'pagination';

  // Create bullets
  paginationEl.innerHTML = totalSections
    .map((item, index) => {
      // ADD CLICK STREAM HERE for <span> tag, IF YOU WANT
      return `<span class="dot dot-${index + 1}" data-section="${
        index + 1
      }"></span>`;
    })
    .join('');
  document.querySelector('.full-page-sections').appendChild(paginationEl);
  // Create pagination - start

  // Bullet nav controls
  [...document.querySelectorAll('.dot')].forEach((el) => {
    el.addEventListener('click', function (e) {
      scrollToSection(Number(e.target.dataset.section));
    });
  });

  // On Scroll based nav controls
  document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollDown();
    } else {
      scrollUp();
    }
  });





  // In each section, elements auto Animates by using Intersection Observer that detects the elements as intersecting with the viewport.
  const elements = document.querySelectorAll(".left-column, .right-column");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log("entry.isIntersecting", entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
          console.log("Element is visible:", entry.target);
        } else {
          entry.target.classList.remove("visible");
          entry.target.classList.add("hidden");
          console.log("Element is hidden:", entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
  });
});

// document.addEventListener('keydown', function (event) {
//   const sections = document.querySelectorAll('.section');
//   let currentSection = document.querySelector('.section.active') || sections[0];
//   let currentIndex = Array.from(sections).indexOf(currentSection);

//   if (event.key === 'ArrowDown') {
//     currentIndex = (currentIndex + 1) % sections.length;
//   } else if (event.key === 'ArrowUp') {
//     currentIndex = (currentIndex - 1 + sections.length) % sections.length;
//   }

//   sections.forEach((section) => section.classList.remove('active'));
//   sections[currentIndex].classList.add('active');
//   sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
// });

// // Initialize the first section as active
// document.querySelector('.section').classList.add('active');
