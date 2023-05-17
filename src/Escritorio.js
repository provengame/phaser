// Hora con JavaScript

function mostrarHora() {
    var fecha = new Date(); // Obtenemos la fecha y hora actual
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    // Formateamos la hora para mostrarla en dos dígitos
    if (hora < 10) {
    hora = "0" + hora;
    }
    if (minutos < 10) {
    minutos = "0" + minutos;
    }
    if (segundos < 10) {
    segundos = "0" + segundos;
    }
    // Mostramos la hora en la página
    document.getElementById("reloj").innerHTML = hora + ":" + minutos ;
}
  // Actualizamos el reloj cada segundo
setInterval(mostrarHora, 1000);


// Calendario con JavaScript

function showCalendar() {
  const element = document.getElementById(".month");

  // Obtener el mes actual del elemento HTML
  const month = element.textContent.trim();

  // Capitalizar la primera letra del mes
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  // Asignar el mes capitalizado al elemento HTML
  element.textContent = capitalizedMonth;

  // Resto del código para crear el calendario...
}

const today = new Date();
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();
const firstDayOfMonth = new Date(year, today.getMonth(), 1);
const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

document.querySelector('.month').innerHTML = month;
document.querySelector('.year').innerHTML = year;

// Ajustar el día de la semana para que el lunes sea el primer día
let dayOfWeek = firstDayOfMonth.getDay();
dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

let dayOfMonth = 1;

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    const day = document.createElement('div');
    if (i === 0 && j < dayOfWeek) {
      day.innerHTML = '';
      day.classList.add('disabled');
    } else if (dayOfMonth > daysInMonth) {
      day.innerHTML = '';
      day.classList.add('disabled');
    } else {
      day.innerHTML = dayOfMonth;
      if (dayOfMonth === today.getDate() && today.getMonth() === firstDayOfMonth.getMonth()) {
        day.classList.add('today');
      }
      dayOfMonth++;
    }
    document.querySelector('.days').appendChild(day);
  }
}

showCalendar();

// Ventanas

arcade.addEventListener("click", (e) => {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Juego Arcade',
    left: 300, top: 70, width: 1050, height: 600,
    movable: true, // Enable to be moved by mouse
    resizable: true, // Enable to be resized by mouse
    appearanceName: 'redstone',
    style: {
        backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'Juego.html',
    onClose: function(_frame, evt) {
      _frame.close();
    },
    
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    minimizeButton: 'minimizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    hideButton: 'closeButton',
    animation: true,
    animationDuration: 90,
  });


  // hace que se maximice al clickar en el boton
  frame.on('maximizeButton', 'click', (_frame, evt) => {

    _frame.control.doMaximize({
        hideTitleBar: false,
        duration: 100,
        restoreKey: 'Escape',
        restoreDuration: 100,
        callback: (frame, info) => {
            frame.requestFocus();
        },
        restoreCallback: (frame, info) => {
            jsFrame.showToast({
                text: frame.getName() + ' ' + info.eventType
            });
        },
    });
});

  // Show the window
  frame.show();
});

notas.addEventListener("click", (e) => {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Bloc de notas',
    left: 300, top: 70, width: 500, height: 180,
    movable: true, // Enable to be moved by mouse
    resizable: true, // Enable to be resized by mouse
    appearanceName: 'redstone',
    style: {
        backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'quill.html',
    onClose: function(_frame, evt) {
      _frame.close();
    },
    
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    minimizeButton: 'minimizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    hideButton: 'closeButton',
    animation: true,
    animationDuration: 90,
  });


  // hace que se maximice al clickar en el boton
  frame.on('maximizeButton', 'click', (_frame, evt) => {

    _frame.control.doMaximize({
        hideTitleBar: false,
        duration: 100,
        restoreKey: 'Escape',
        restoreDuration: 100,
        callback: (frame, info) => {
            frame.requestFocus();
        },
        restoreCallback: (frame, info) => {
            jsFrame.showToast({
                text: frame.getName() + ' ' + info.eventType
            });
        },
    });
});

  // Show the window
  frame.show();
});


excel.addEventListener("click", (e) => {
  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Hoja de calculo',
    left: 300, top: 70, width: 500, height: 400,
    movable: true, // Enable to be moved by mouse
    resizable: true, // Enable to be resized by mouse
    appearanceName: 'redstone',
    style: {
        backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'excel.html',
    onClose: function(_frame, evt) {
      _frame.close();
    },
    
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    minimizeButton: 'minimizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    hideButton: 'closeButton',
    animation: true,
    animationDuration: 90,
  });


  // hace que se maximice al clickar en el boton
  frame.on('maximizeButton', 'click', (_frame, evt) => {

    _frame.control.doMaximize({
        hideTitleBar: false,
        duration: 100,
        restoreKey: 'Escape',
        restoreDuration: 100,
        callback: (frame, info) => {
            frame.requestFocus();
        },
        restoreCallback: (frame, info) => {
            jsFrame.showToast({
                text: frame.getName() + ' ' + info.eventType
            });
        },
    });
});

  // Show the window
  frame.show();
});




