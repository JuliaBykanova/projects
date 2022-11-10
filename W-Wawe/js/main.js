let podcastsAddBtn = document.querySelector('.section-podcasts__add-btn');
let podcastsRemoveBtn = document.querySelector('.section-podcasts__remove-btn');
let podcastsCol = document.querySelectorAll('.section-podcasts__col-hidden');

podcastsAddBtn.addEventListener('click', function () {
  podcastsAddBtn.classList.add('section-podcasts__btn-hidden');
  podcastsRemoveBtn.classList.remove('section-podcasts__btn-hidden');
  podcastsCol.forEach(function (el) {
    el.classList.remove('section-podcasts__col-hidden');
  });
});

podcastsRemoveBtn.addEventListener('click', function () {
  podcastsAddBtn.classList.remove('section-podcasts__btn-hidden');
  podcastsRemoveBtn.classList.add('section-podcasts__btn-hidden');
  podcastsCol.forEach(function (el) {
    el.classList.add('section-podcasts__col-hidden');
  });
});

const element = document.querySelector('.section-programms__select');
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
});

$(".accordion").accordion({
  heightStyle: "content",
  collapsible: true,
});

$(".ui-accordion-header").attr('tabIndex', '0');


document.querySelectorAll('.section-guest-accordion__list1-btn').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (e) {
    document.querySelector('.section-guest-card-none').classList.add('section-guest-card-none__pasive');
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.section-guest-card').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('section-guest-card__active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('section-guest-card__active');
  });
});

const swiper = new Swiper('.swiper', {

  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  watchSlidesProgress: true,

  // навигация
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {

    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 1200px
    1810: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
});

new JustValidate('.section-about-us-form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLenght: 15,
      function: (name, value) => {
        for (i = 0; i < value.length; i++) {
          if (value[i].toLowerCase() == value[i].toUpperCase()) {
            return (value[i].toLowerCase() != value[i].toUpperCase());
          };
        };
        return true;
      },
    },
    comment: {
      required: true,
      minLength: 2,
    },
    mail: {
      required: true,
      email: true
    },
    agreement: {
      required: true
    }
  },
  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Имя должно состоять мимимум из 2 букв',
      maxLength: 'Имя должно состоять максимум из 15 букв',
      function: 'Имя должно состоять только из букв',
    },
    mail: {
      required: 'Вы не ввели e-mail',
      email: 'Пожалуйста, введите корректный e-mail'
    },
    comment: {
      required: 'Вы не ввели свой комментарий',
      minLength: 'Комментарий должен состоять мимимум из 2 букв',
    },
    agreement: {
      required: 'Требуется согласие на обработку данных'
    },
  },
  colorWrong: '#D52B1E',
});


let searchBlock = document.querySelector('.header-middle__search');
let searchBtn = document.querySelector('.header-middle__btn-search');
let searchInput = document.querySelector('.header-middle__input-search');
let searchClose = document.querySelector('.header-middle__btn-close');
let nav = document.querySelector('.header-middle__nav');
let burger = document.querySelector('.header-middle__burger');

searchBtn.addEventListener('click', function () {
  searchBlock.classList.add('header-middle__search-active');
  searchBtn.classList.add('header-middle__btn-search-active');
  searchInput.classList.add('header-middle__input-search-active');
  searchClose.classList.add('header-middle__btn-close-active');
  burger.classList.add('header-middle__burger-search-active');
  nav.classList.add('header-middle__nav-passive');
});

searchClose.addEventListener('click', function () {
  searchBlock.classList.remove('header-middle__search-active');
  searchBtn.classList.remove('header-middle__btn-search-active');
  searchInput.classList.remove('header-middle__input-search-active');
  searchClose.classList.remove('header-middle__btn-close-active');
  burger.classList.remove('header-middle__burger-search-active');
  nav.classList.remove('header-middle__nav-passive');
});


let radioBtnHeader = document.querySelectorAll('.header-bottom-btn');
let blockBtnHeader = document.querySelectorAll('.header-bottom-btn__block');
let playBtnHeader = document.querySelectorAll('.header-bottom-btn__icon-play');
let stopBtnHeader = document.querySelectorAll('.header-bottom-btn__icon-stop');

radioBtnHeader[0].addEventListener('click', function () {
  blockBtnHeader[0].classList.toggle('header-bottom-btn__block-passive');
  playBtnHeader[0].classList.toggle('header-bottom-btn__icon-passive');
  stopBtnHeader[0].classList.toggle('header-bottom-btn__icon-passive');
});

radioBtnHeader[1].addEventListener('click', function () {
  blockBtnHeader[1].classList.toggle('header-bottom-btn__block-passive');
  playBtnHeader[1].classList.toggle('header-bottom-btn__icon-passive');
  stopBtnHeader[1].classList.toggle('header-bottom-btn__icon-passive');
});


let smBtnHeader = document.querySelector('.header-bottom-btn-sm');
let smPlayBtnHeader = document.querySelector('.header-bottom-btn-sm__icon-play');
let smStopBtnHeader = document.querySelector('.header-bottom-btn-sm__icon-stop');

smBtnHeader.addEventListener('click', function () {
  smBtnHeader.classList.toggle('header-bottom-btn-sm-passive');
  smPlayBtnHeader.classList.toggle('header-bottom-btn-sm__icon-passive');
  smStopBtnHeader.classList.toggle('header-bottom-btn-sm__icon-passive');
});


let playBtnPodcasts = document.querySelectorAll('.section-podcasts-col__btn-play');
let stopBtnPodcasts = document.querySelectorAll('.section-podcasts-col__btn-stop');

for (let i = 0; i < playBtnPodcasts.length; i++) {
  playBtnPodcasts[i].addEventListener('click', function () {
    playBtnPodcasts[i].classList.add('section-podcasts-col__btn-passive');
    stopBtnPodcasts[i].classList.remove('section-podcasts-col__btn-passive');
  });
};

for (let i = 0; i < stopBtnPodcasts.length; i++) {
  stopBtnPodcasts[i].addEventListener('click', function () {
    playBtnPodcasts[i].classList.remove('section-podcasts-col__btn-passive');
    stopBtnPodcasts[i].classList.add('section-podcasts-col__btn-passive');
  });
}


let btnPlaylists = document.querySelectorAll('.section-playlists-col');
let btnPlaylistsSignPlay = document.querySelectorAll('.section-playlists-col__effect-block-sign-play');
let btnPlaylistsSignStop = document.querySelectorAll('.section-playlists-col__effect-block-sign-stop');

/*btnPlaylists.addEventListener ('click', function() {
  btnPlaylistsSignPlay.classList.toggle('section-playlists-col__effect-block-sign-passive');
  btnPlaylistsSignStop.classList.toggle('section-playlists-col__effect-block-sign-passive');
});*/

for (let i = 0; i < btnPlaylists.length; i++) {
  btnPlaylists[i].addEventListener('click', function () {
    btnPlaylistsSignPlay[i].classList.toggle('section-playlists-col__effect-block-sign-passive');
    btnPlaylistsSignStop[i].classList.toggle('section-playlists-col__effect-block-sign-passive');
  });
};



let menu = document.querySelector('.header-bottom__menu');


burger.addEventListener('click', function () {
  burger.classList.toggle('header-middle__burger-active');
  nav.classList.toggle('header-middle__nav-active');
  menu.classList.toggle('header-bottom__menu-active');
});

let navLinks = document.querySelectorAll('.header-middle-list__item');

navLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('header-middle__burger-active');
    nav.classList.remove('header-middle__nav-active');
    menu.classList.remove('header-bottom__menu-active');
  });
});

let menuLinks = document.querySelectorAll('.header-bottom-list__item');

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('header-middle__burger-active');
    nav.classList.remove('header-middle__nav-active');
    menu.classList.remove('header-bottom__menu-active');
  });
});


let bigBtnHeader = document.querySelector('.header-bottom-btn-big');

bigBtnHeader.addEventListener('click', function () {
  bigBtnHeader.classList.toggle('header-bottom-btn-big-active');
  radioBtnHeader.forEach(function (el) {
    el.classList.toggle('header-bottom-btn-active');
  });
});


/*(() => {

})();*/
let swiperCheckbox = Swiper;
let init = false;

function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 752px)");

  const wrapper = document.querySelector('.js-wrapper');
  const slides = wrapper.querySelectorAll('.js-slide');

  // Enable (for mobile)
  if (mobile.matches) {
    if (!init) {
      wrapper.classList.add('swiper-wrapper');
      slides.forEach(slide => {
        slide.classList.add('swiper-slide');
      });

      init = true;
      swiperCheckbox = new Swiper(".js-slider", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        watchSlidesProgress: true
      });

    }
  } else {
    if (swiperCheckbox.destroy) {
      swiperCheckbox.destroy();
      init = false;
      wrapper.classList.remove('swiper-wrapper');
      slides.forEach(slide => {
        slide.classList.remove('swiper-slide');
      });
    }
  }
}

/* On Load
 **************************************************************/
window.addEventListener("load", function () {
  swiperMode();
});

/* On Resize
 **************************************************************/
window.addEventListener("resize", function () {
  swiperMode();
});

