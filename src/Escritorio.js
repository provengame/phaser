// Hora con JavaScript
function mostrarHora() {
    var fecha = new Date(); 
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    
    if (hora < 10) {
    hora = "0" + hora;
    }
    if (minutos < 10) {
    minutos = "0" + minutos;
    }
    if (segundos < 10) {
    segundos = "0" + segundos;
    }
    document.getElementById("reloj").innerHTML = hora + ":" + minutos ;
}
setInterval(mostrarHora, 1000);

// Calendario con JavaScript
function showCalendar() {
  const element = document.getElementById(".month");

  const month = element.textContent.trim();

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  element.textContent = capitalizedMonth;
}

const today = new Date();
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();
const firstDayOfMonth = new Date(year, today.getMonth(), 1);
const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

document.querySelector('.month').innerHTML = month;
document.querySelector('.year').innerHTML = year;

let dayOfWeek = firstDayOfMonth.getDay();
dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

let dayOfMonth = 1;

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    const day = document.createElement('div');
    
    if (i === 0 && j < dayOfWeek) {
      day.innerHTML = '';
      day.classList.add('disabled');
    } 
    
    else if (dayOfMonth > daysInMonth) {
      day.innerHTML = '';
      day.classList.add('disabled');
    } 
    
    else {
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

// Ventana arcade
var arcadeOpen = false;

arcade.addEventListener("click", (e) => {
  if (arcadeOpen) {
    return
  };

  arcadeOpen = true;

  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Juego Arcade',
    left: 300, top: 70, width: 1050, height: 600,
    movable: true, 
    resizable: true, 
    appearanceName: 'redstone',
    style: {
      backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'Juego.html',
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    animation: true,
    animationDuration: 90,
  });

  
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

  frame.on('closeButton', 'click', (_frame, evt) => {
    _frame.control.doHide({
      duration: 140,
      align: 'CENTER_BOTTOM',
      callback: (frame, info) => {
          jsFrame.showToast({
              text: frame.getName() + ' ' + info.eventType
          });
          _frame.closeFrame();
      }
  });
    arcadeOpen = false;
  });
  
  frame.show();
});


//Ventana bloc de notas
var notasOpen = false;

notas.addEventListener("click", (e) => {

  if (notasOpen) {
    return
  };

  notasOpen = true;

  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Bloc de notas',
    left: 300, top: 70, width: 1050, height: 600,
    movable: true,
    resizable: true,
    appearanceName: 'redstone',
    style: {
      backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'word.html',
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    animation: true,
    animationDuration: 90,
  });

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

  frame.on('closeButton', 'click', (_frame, evt) => {
    _frame.control.doHide({
      duration: 140,
      align: 'CENTER_BOTTOM',
      
      callback: (frame, info) => {
          jsFrame.showToast({
              text: frame.getName() + ' ' + info.eventType
          });
          
          _frame.closeFrame();
      }
  });
    notasOpen = false;
  });

  frame.show();
});

//ventana excel
var excelOpen = false;

excel.addEventListener("click", (e) => {
  if (excelOpen) {
    return
  };

  excelOpen = true;

  const jsFrame = new JSFrame();
  const frame = jsFrame.create({
    title: 'Hoja de calculo',
    left: 300, top: 70, width: 1050, height: 600,
    movable: true, 
    resizable: true, 
    appearanceName: 'redstone',
    style: {
      backgroundColor: 'rgba(220,220,220,0.8)',
    },
    url: 'excel.html',
  });

  frame.setControl({
    maximizeButton: 'maximizeButton',
    demaximizeButton: 'restoreButton',
    maximizeWithoutTitleBar: true,
    restoreKey: 'Escape',
    minimizeButton: 'minimizeButton',
    deminimizeButton: 'deminimizeButton',
    animation: true,
    animationDuration: 90,
  });

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

  frame.on('closeButton', 'click', (_frame, evt) => {
    _frame.control.doHide({
      duration: 140,
      align: 'CENTER_BOTTOM',
      callback: (frame, info) => {
          jsFrame.showToast({
              text: frame.getName() + ' ' + info.eventType
          });
          _frame.closeFrame();
      }
  });
    excelOpen = false;
  });
  
  frame.show();
});
