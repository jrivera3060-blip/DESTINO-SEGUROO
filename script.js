const screens = document.querySelectorAll(".screen");

const toast = document.getElementById("toast");

function go(id) {
  screens.forEach(function(screen) {
    screen.classList.remove("active");
  });

  const pantalla = document.getElementById(id);

  if (pantalla) {
    pantalla.classList.add("active");
  }

  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-go]").forEach(function(button) {
  button.addEventListener("click", function() {
    go(button.dataset.go);
  });
});

document.getElementById("topMenu").onclick = function() {
  go("menu");
};

function msg(texto) {
  toast.textContent = texto;
  toast.classList.add("show");

  clearTimeout(window.timer);

  window.timer = setTimeout(function() {
    toast.classList.remove("show");
  }, 2600);
}

document.getElementById("searchBtn").onclick = function() {
  const destino = document.getElementById("destination").value.trim();

  if (destino === "") {
    msg("Escribe un destino para buscar una ruta.");
    return;
  }

  msg("Buscando ruta segura hacia " + destino + "...");

  setTimeout(function() {
    go("ruta");
  }, 600);
};

document.getElementById("destination").onkeydown = function(event) {
  if (event.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
};

document.getElementById("startRoute").onclick = function() {
  msg("Ruta iniciada. Evita las zonas de riesgo.");
};

window.addEventListener("offline", function() {
  msg("Sin internet: consulta la información guardada.");

  setTimeout(function() {
    go("offline");
  }, 400);
});

window.addEventListener("online", function() {
  msg("Conexión recuperada.");
});
