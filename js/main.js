const body = document.body; // переменная body

// Запрет перетаскивания ссылок и картинок
document.querySelectorAll("img, a").forEach(element => {
	element.addEventListener("dragstart", event => {
		event.preventDefault();
	});
});

/* ------------------- btnScrollTop -------------------- */
const btnScrollTop = document.getElementById('btnScrollTop');
window.onscroll = function () {
	scrollFunction()
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		btnScrollTop.classList.add('show')
	} else {
		btnScrollTop.classList.remove('show')
	}
}

btnScrollTop.addEventListener("click", function () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});


/* ------------------- Плавный скролл по якорным ссылкам -------------------- */
const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
})

/* ------------------- Показать/ Скрыть всех партнеров -------------------- */
const partnersBlock = document.querySelector('.all-partners');
const moreBtn = document.querySelector('.more-partners');
const moreBtnText = document.querySelector('.more-partners__text');
const arrowIcon = document.querySelector('.ic-arrow');

function togglePartnersBlock() {
  partnersBlock.classList.toggle('visible'); // Добавляем/удаляем класс 'visible'

  if (partnersBlock.classList.contains('visible')) {
    moreBtnText.textContent = 'Свернуть';
    arrowIcon.classList.add('active');
  } else {
    moreBtnText.textContent = 'Показать всех';
    arrowIcon.classList.remove('active');
  }
}
moreBtn.addEventListener('click', togglePartnersBlock);

/* ------------------- Faq accordion -------------------- */
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
  const head = item.querySelector('.accordion__item-head');
  const icon = item.querySelector('.ic-plus');
  head.addEventListener('click', () => {
    if (!item.classList.contains('active')) {
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherIcon = otherItem.querySelector('.ic-minus');
          if (otherIcon) {
            otherIcon.classList.remove('ic-minus');
            otherIcon.classList.add('ic-plus');
          }
        }
      });
    }
    item.classList.toggle('active');
    icon.classList.toggle('ic-minus');
    icon.classList.toggle('ic-plus');
  });
});

/* ------------------- Header Fixed -------------------- */
const header = document.querySelector('.header');
let headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('header-fixed');
    document.body.style.paddingTop = `${headerHeight}px`;
  } else {
    header.classList.remove('header-fixed');
    document.body.style.paddingTop = 0;
  }

  const anchorLinks = document.querySelectorAll('.menu__link');

  anchorLinks.forEach(link => {
    const anchor = link.getAttribute('href');
    const target = document.querySelector(anchor);

    if (target) {
      const targetTop = target.offsetTop - headerHeight;
      const targetBottom = targetTop + target.offsetHeight;

      if (window.scrollY >= targetTop && window.scrollY < targetBottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

document.querySelectorAll('.menu__link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const anchor = link.getAttribute('href');
    scrollToAnchor(anchor);
  });
});

// Функция для скролла к якорной ссылке с учетом высоты хедера
function scrollToAnchor(anchor) {
  const offset = headerHeight - 16; // Добавляем 16 пикселей дополнительного отступа
  const target = document.querySelector(anchor);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  }
}

// Функция для мобильного хедера
function updateHeaderHeight() {
  if (window.innerWidth <= 480) {
    headerHeight = 64; // Установите желаемую высоту для мобильного хедера
  } else {
    headerHeight = 100; // Установите желаемую высоту для десктопного хедера
  }
}

window.addEventListener('resize', () => {
  updateHeaderHeight();
});

/* ------------------- MOBILE MENU -------------------- */
const btnBurger = document.querySelector('.btn-burger');
const menu = document.querySelector('.header__nav');
const menuOverlay = document.querySelector('.nav-overlay');
const menuLink = document.querySelectorAll('.menu__link');

if (menu && btnBurger) {
	btnBurger.addEventListener('click', e => {
		btnBurger.classList.toggle('active')
		menuOverlay.classList.toggle('active')
		menu.classList.toggle('active')
		body.classList.add('lock-scroll');
	})

	menu.addEventListener('click', e => {
		if (e.target.classList.contains('menu')) {
			menu.classList.remove('active')
			menuOverlay.classList.remove('active')
			btnBurger.classList.remove('active')
			body.classList.remove('lock-scroll');
		}
	})

	menuLink.forEach(link => {
		link.addEventListener('click', () => {
				menu.classList.remove('active')
			menuOverlay.classList.remove('active')
			btnBurger.classList.remove('active')
			body.classList.remove('lock-scroll');
		})
	})
}

window.addEventListener('click', e => {
	const target = e.target
	if (!target.closest('.header__nav') && !target.closest('.btn-burger')) {
		menu.classList.remove('active')
		menuOverlay.classList.remove('active')
		btnBurger.classList.remove('active')
		body.classList.remove('lock-scroll');
	}
});

/* ------------------- Modal -------------------- */
const modalBtn = document.querySelectorAll('.js-modal-btn');
const modals = document.querySelectorAll('.modal');

function openModal(elem) {
  elem.classList.add('active');
  if (hasScrollbar()) {
    body.style.width = `calc(100vw - ${window.innerWidth - document.documentElement.clientWidth}px)`;
  }
  body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__overlay')) {
    e.target.closest('.modal').classList.remove('active');
    body.style.overflow = '';
    body.style.width = '';
  }
}

function hasScrollbar() {
  return document.body.scrollHeight > window.innerHeight;
}

modalBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let data = e.target.dataset.modalOpen;

    modals.forEach(modal => {
      if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.js-modal-btn').dataset.modalOpen) {
        openModal(modal)
      }
    })
  })
})

modals.forEach(modal => {
  modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e => {
  modals.forEach(modal => {
    if (e.key === "Escape" && modal.classList.contains('active')) {
      modal.classList.remove('active');
      body.style.overflow = '';
      body.style.width = '';
    }
  })
})
/* ------------------- / Modal -------------------- */