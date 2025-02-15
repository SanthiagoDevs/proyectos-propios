document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
      0,      // "Quiero"
      2.5,    // "Parar un momento"
      6.5,    // "Soñar que estoy dentro"
      11.5,   // "De tus ojos"
      15.5,   // "Quiero"
      18.5,   // "Soñar que te beso"
      22.5,   // "Después darme cuenta"
      24.5,   // "Que sigo despierto"
      26,     // "Y no me la creo"
      31,     // "Que tú estás aquí"
      34.5,   // "Simulando que no dices nada"
      39,     // "Y yo siento así"
      42.5,   // "Diez mil palabras"
      47,     // "Yo no te pido que seas normal..."
      51,     // "Que seas intensa cuando amanezca"
      53,     // "Que estés tan loca como tú quieras"
      55,     // "Como tú sientas, como tú estés"
      57.5,     // "Como tú sepas que solo eres tú"
      63,     // "Que digas todo sin preguntar..."
      67,     // "Que tengas miedo cuando te asustes"
      69,     // "Que sueltes lágrimas si te lucen"
      71,     // "Que rompas todo si es necesario"
      73,     // "Los dos estamos para arreglarlo"
      75,     // "Que a mí me gustas tal como eres"
      77,     // "A mí me gustas tal como estás"
      79,     // "Es la verdad"
      81.5,   // "Así"
      82.5,   // "Sin maquillar"
      87,     // "Es la verdad"
      89.5,   // "Así"
      90.5,   // "Sin maquillar"
      95,     // "Feliz San Valentin Mi Negrita"
      105,    // "Te Amo Daniela Martinez🩵"
      120,    // "En pasitos de tortuga 🐢 hasta la luna🌛"
      130,    // "Santi & Dani <br> 🤍10/12/2023🤍"
      160
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
