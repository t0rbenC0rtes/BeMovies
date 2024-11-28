// S W I P E R   B E H A V I O U R

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 10,
      
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });

// L O G I N   M O D A L
const loginBtn = document.querySelectorAll('.login-btn');
const loginModal = document.querySelector('.login-modal');
const close = document.querySelector('.close');

loginBtn.forEach((e) => e.addEventListener('click', () => {
  loginModal.style.display = 'block';
}));

close.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// S I G N   U P   &   L O G I N   S W A P
const signupOpt = document.querySelector('.signupOpt');
const loginOpt = document.querySelector('.loginOpt');

signupOpt.addEventListener('click', () => {
  signupOpt.style.border = 'none'
  signupOpt.style.background = '#cc0000';

  loginOpt.style.border = '1px solid #fff';
  loginOpt.style.background = '#000';
  loginOpt.style.borderLeft = 'none';

})
loginOpt.addEventListener('click', () => {
  loginOpt.style.border = 'none'
  loginOpt.style.background = '#cc0000';

  signupOpt.style.border = '1px solid #fff';
  signupOpt.style.background = '#000';
  signupOpt.style.borderRight = 'none';
})


// M O V I E   C A R D   M O D A L

const movieThumb = document.querySelectorAll('.swiper-slide');
const closeCard = document.querySelector('.close-movie');

const movieModal = document.querySelector('.movie-modal');

movieThumb.forEach((e) => e.addEventListener('click', () => {
  movieModal.style.display = 'block';
}));

closeCard.addEventListener('click', () => {
  movieModal.style.display = 'none';
});
