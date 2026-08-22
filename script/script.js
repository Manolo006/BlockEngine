function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');
  const menuIconBars = document.querySelectorAll('.bar');

  sidebar.classList.toggle('sidebar-open');
  content.classList.toggle('content-open');

  menuIconBars.forEach(bar => {
      bar.classList.toggle('bar-open');
  });
}

// Funzione per gestire l'apertura e la chiusura della sidebar
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Aggiungi un event listener all'icona del menu hamburger per chiamare la funzione toggleSidebar() quando viene cliccata
var menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("click", toggleSidebar);
