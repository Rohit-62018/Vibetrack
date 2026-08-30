/* ==========================================================================
   responsive.js — Vibetrack
   Small screens only: turns the existing sidebar into a slide-in drawer that
   is opened with the header menu button. No sidebar feature is removed and
   desktop behaviour (click to collapse / resizer) is untouched.
   NOTE: this file is loaded BEFORE the other scripts on purpose, so that on
   mobile it can stop the desktop "click sidebar to collapse" handler from
   firing while the drawer is open.
   ========================================================================== */
(function () {
  const MOBILE = 950;
  const sidebar = document.querySelector('.side-container');
  const menuBtn = document.querySelector('.menu-btn');

  const isMobile = () => window.innerWidth <= MOBILE;

  if (!sidebar || !menuBtn) return;

  // backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'drawer-backdrop';
  document.body.appendChild(backdrop);

  // close button inside the drawer
  const closeBtn = document.createElement('button');
  closeBtn.className = 'drawer-close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  sidebar.appendChild(closeBtn);

  function openDrawer() {
    sidebar.classList.add('drawer-open');
    backdrop.classList.add('show');
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    sidebar.classList.remove('drawer-open');
    backdrop.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener('click', closeDrawer);

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeDrawer();
  });

  // On mobile the sidebar itself must not collapse when tapped (that handler
  // lives in playlistwidth.js). Child handlers already ran by the time this
  // bubble listener fires, so playlist songs / buttons keep working.
  sidebar.addEventListener('click', function (e) {
    if (isMobile()) {
      e.stopImmediatePropagation();
      // any inline width left over from the desktop collapse toggle
      sidebar.style.width = '';
      sidebar.classList.remove('collapsed');
    }
  });

  // Tapping a playlist song closes the drawer so the player is visible.
  sidebar.addEventListener(
    'click',
    function (e) {
      if (isMobile() && e.target.closest('.individual-song')) {
        setTimeout(closeDrawer, 150);
      }
    },
    true
  );

  window.addEventListener('resize', function () {
    if (!isMobile()) closeDrawer();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
})();
