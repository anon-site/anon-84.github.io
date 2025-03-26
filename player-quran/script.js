'use strict';

/**
 * A music player ... cause why not.
 * Hotkeys:
 *   a - previous
 *   d / n - next
 *   s / p - play / pause
 *   e / r - repeat
 *   q - shuffle
 *
 * @author Holly Springsteen
 */

const colors = {
  aqua: {
    25: '#A7DCCD',
    50: '#5FBFA4',
    80: '#2F7561',
  },
  metal: {
    5: '#F3F3F1',
    20: '#CFD0C8',
    50: '#868975',
    80: '#36372F',
    90: '#272822',
  },
};

// Control button elements
const buttons = {
  shuffle: document.querySelector('#controls .shuffle'),
  previous: document.querySelector('#controls .previous'),
  playPause: document.querySelector('#controls .play-pause'),
  next: document.querySelector('#controls .next'),
  repeat: document.querySelector('#controls .repeat'),
};

// Range & Time elements
const songCurrentTime = document.querySelector('.song-current-time');
const songLength = document.querySelector('.song-length');
const trackingSlider = document.querySelector('.tracking-slider');
const volumeSlider = document.querySelector('.volume-slider');

// Art
const artPlayer = document.querySelector('#art .player');
const playerArt = document.querySelector('#art .player img');
const wideArt = document.querySelector('#art .wide img');

// Playlist
const playlistBody = document.querySelector('#playlist tbody');
let playlistPlay = document.querySelectorAll('#playlist .play-pause');
let listItems = document.querySelectorAll('#playlist tbdoy tr');

// Audio Element
const audio = document.getElementById('player');

// Base route for archive url
const archiveBase = 'http://archive.org/download/';

/**
 * A base list of songs and the meta data for them.
 *
{
  title: '',
  artist: '',
  duration: 0,
  album: {
    title: '',
    art: {
      square: '',
      wide: '',
    },
  },
  url: `${archiveBase}`,
},
 */
const songList = [
  {
    title: 'سورة البقرة',
    artist: 'Mishary Rashid Alafasy',
    duration: 7539,
    album: {
      title: 'Sourat Al-baqarah',
      art: {
        square: 'https://i1.sndcdn.com/artworks-000323134784-rljci1-t500x500.jpg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
             },
      
    },
    url: `https://server8.mp3quran.net/afs/002.mp3`,
  },
  
  
    {
    title: 'سورة النساء',
    artist: 'Ahmad bin Ali Al-Ajmi',
    duration: 4782,
    album: {
      title: 'Surat An-Nisa',
      art: {
        square: 'https://yt3.googleusercontent.com/1pzelZXm8u-QNbztEUzqXfKUmYltpOLN3vRbMeKGkjvDoaZMjPFgifYhGTTbWzjOZLieWXA9=s900-c-k-c0x00ffffff-no-rj',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
},  
                    
    },
    url: `https://server10.mp3quran.net/ajm/128/004.mp3`,
  },
  
  
      {
    title: 'سورة ال عمران',
    artist: 'Ahmad bin Ali Al-Ajmi',
    duration: 4782,
    album: {
      title: 'surah al-imran',
      art: {
        square: 'https://yt3.googleusercontent.com/1pzelZXm8u-QNbztEUzqXfKUmYltpOLN3vRbMeKGkjvDoaZMjPFgifYhGTTbWzjOZLieWXA9=s900-c-k-c0x00ffffff-no-rj',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
},   
                    
    },
    url: `https://server10.mp3quran.net/ajm/128/003.mp3`,
  },
  
  
  
  {
    title: 'سورة الكهف',
    artist: 'Anas Buraq ',
    duration: 2213,
    album: {
      title: 'Surat Al-Kahf',
      art: {
        square: 'https://c.top4top.io/p_3005ovgpx1.jpg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://ia601500.us.archive.org/22/items/Anas-Bourak/018.mp3`,
  },
  {
    title: 'سورة الرحمن',
    artist: 'Anas Buraq',
    duration: 788,
    album: {
      title: 'Surat Al-Rahman',
      art: {
        square: 'https://c.top4top.io/p_3005ovgpx1.jpg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://ia601500.us.archive.org/22/items/Anas-Bourak/055.mp3`,
  },

    {
    title: 'سورة يس',
    artist: 'Islam Sobhi',
    duration: 980,
    album: {
      title: 'Surat Yasin',
      art: {
        square: 'https://j.top4top.io/p_3005jh19r1.jpeg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://ia801406.us.archive.org/12/items/002_20221103_202211/036.mp3`,
  },
  
    {
    title: 'سورة الملك',
    artist: 'Mohammed Al-Naqeeb',
    duration: 439,
    album: {
      title: 'Surat Al-Mulk',
      art: {
        square: 'https://c.top4top.io/p_3005oq58w1.jpeg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/recitations/51874/463452/067.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240324%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240324T124557Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=e55df16d09e09fe91e368dad54d13299b0f8a63e8ffe2af2077e34e766ec7c23`,
  },
  
  
      {
    title: 'سورة النبأ',
    artist: 'Mohammed Al-Naqeeb',
    duration: 275,
    album: {
      title: 'Surat Al-Naba',
      art: {
        square: 'https://c.top4top.io/p_3005oq58w1.jpeg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://fra1.digitaloceanspaces.com/media.midad.com/resources/ar/recitations/51874/463452/078.mp3?response-content-disposition=attachment&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=BKPUJK7ZZK5A2DAO7JVR%2F20240324%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240324T141558Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=56da9b16e9f9a09a657f264c618191df45a293983135441eab8f5f0d93650c0c`,
  },
  
  
        {
    title: 'سورة المنافقون',
    artist: 'Salim Bahanan',
    duration: 339,
    album: {
      title: 'Surat Al-Munafiqun',
      art: {
        square: 'https://i.scdn.co/image/ab67616d00001e0275489ea5a6204c90290e6c90',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://dl03.yt2mp3.work/dlm4a/?hash=SzRTbWRRdUs2VFU=&title=SALIM+BAHANAN+%7C%7C+AL+MUNAFIQUN`,
  },
  
  
          {
    title: 'سورة الحشر',
    artist: 'Salim Bahanan',
    duration: 761,
    album: {
      title: 'Surat Al-Hashr',
      art: {
        square: 'https://i.scdn.co/image/ab67616d00001e0275489ea5a6204c90290e6c90',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://dl50.yt2mp3.work/dlm4a/?hash=LXFpWTZpSElVUUU=&title=SALIM+BAHANAN+%7C%7C+AL+HASYR`,
  },
  
  
            {
    title: 'سورة السجدة',
    artist: 'Abdul Rahman Massad',
    duration: 607,
    album: {
      title: 'Surat Al-Sajdah',
      art: {
        square: 'https://f.top4top.io/p_3006gl30q1.jpeg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
	  
	  
    },
    url: `https://dl50.yt2mp3.work/dlm4a/?hash=ZU53b2xvMFJxWkU=&title=%D8%B3%D9%88%D8%B1%D8%A9+%D8%A7%D9%84%D8%B3%D8%AC%D8%AF%D8%A9+%D9%83%D8%A7%D9%85%D9%84%D8%A9+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86+%D9%85%D8%B3%D8%B9%D8%AF+%7C+%D8%AD%D8%B5%D8%B1%D9%8A%D8%A7+%D9%88%D9%84%D8%A3%D9%88%D9%84+%D9%85%D8%B1%D8%A9+%D8%A7%D8%B3%D9%85%D8%B9+%D8%A8%D9%82%D9%84%D8%A8%D9%83`,
  },
  


  
 
  
                  {
    title: 'سورة الحاقة',
    artist: 'Sherif Mustafa',
    duration: 544,
    album: {
      title: 'Surat Al-Haqqah',
      art: {
        square: 'https://h.top4top.io/p_3006ycbgt1.jpeg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://dl03.yt2mp3.work/dlm4a/?hash=U0hFU2FRX2oxNmc=&title=%D8%B3%D9%88%D8%B1%D8%A9+%D8%A7%D9%84%D8%AD%D8%A7%D9%82%D8%A9+%D9%83%D8%A7%D9%85%D9%84%D8%A9%E2%9D%A4%EF%B8%8F%28%D9%85%D8%B1%D8%A6%D9%8A%D8%A9%29+%7C%7C+%D8%AA%D9%84%D8%A7%D9%88%D8%A9+%D8%AE%D8%A7%D8%B4%D8%B9%D8%A9+%D9%88%D9%85%D8%A4%D8%AB%D8%B1%D8%A9+%D8%AC%D8%AF%D9%8B%D8%A7+%D8%AA%D9%87%D8%B2+%D8%A7%D9%84%D9%82%D9%84%D9%88%D8%A8%3F%D8%A7%D9%84%D9%82%D8%A7%D8%B1%D8%A6+%D8%B4%D8%B1%D9%8A%D9%81+%D9%85%D8%B5%D8%B7%D9%81%D9%89%3FSurah+Al-Haqqah`,
  },
  
  
                    {
    title: 'سورة المائدة',
    artist: 'Mahmoud Khalil Al-Hosary',
    duration: 5558,
    album: {
      title: 'Surat al-Maidah',
      art: {
        square: 'https://static.suratmp3.com/pics/reciters/thumbs/23_600_600.jpg',
        wide: 'https://k.top4top.io/p_3007eubv91.png',
      },
    },
    url: `https://server13.mp3quran.net/download/husr/005.mp3`,
  },
  
  
  
];

/**
 * Based on the class list for a given element toggle the class(es) received.
 * Can accept both string with classes separated by spaces and an array of classes.
 *
 * @param {} element The dom element for which to toggle classes.
 * @param {string|string[]} classes The classes to be toggled on or off.
 */
function toggleClasses(element, classes) {
  const currentClasses = new Set(element.classList);
  // Separate string formatted classes into an array or accept array param
  const newClasses = (_.isString(classes)) ? classes.split(' ') : classes;

  for (const className of newClasses) {
    if (currentClasses.has(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
}

/**
 * Toggle a boolean value.
 *
 * @param {boolean} boolean The boolean value to be toggled true or false.
 * @return {boolean} Returns the opposite boolean value to the received.
 */
function toggleBoolean(boolean) {
  return (!boolean);
}

/**
 * Convert seconds into a usable format for time.
 *
 * @param {number|string} seconds The amount of seconds to convert.
 * @return {string} Returns a time formatted string (--:--:--).
 */
function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor(Number(seconds) % 3600 / 60)),
    seconds: String(Math.floor(Number(seconds) % 3600 % 60)),
  };

  if (time.hours && time.hours < 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes && time.minutes < 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds && time.seconds < 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== '00') {
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    return `${time.minutes}:${time.seconds}`;
  }
}

/**
 * The base setup for any given audio player.
 */
class Player {
  constructor() {
    this.playing = (new Set(buttons.playPause.classList).has('on'));
    this.shuffle = (new Set(buttons.shuffle.classList).has('on'));
    this.repeat = (new Set(buttons.repeat.classList).has('on'));

    this.songIndex = 0;
    this.previousSong = songList.length - 1;

    this.song = songList[this.songIndex];

    this.randomOrder = new Set();
    this.randomIndex = 0;

    this.volume = 0.8;
  }

  /**
   * Update the meta data for the current song.
   *
   * @param {number} songIndex Optional param to force set the index of the song.
   */
  updateSong(songIndex) {
    this.previousSong = this.songIndex;
    this.songIndex = songIndex || this.songIndex;
    this.song = songList[this.songIndex];
    const song = this.song;

    audio.src = song.url;
    trackingSlider.value = 0;
    this.updateSongRangeValues();
    songLength.innerHTML = secondsToHms(song.duration);
    trackingSlider.max = song.duration;

    playerArt.src = song.album.art.square;
    wideArt.src = song.album.art.wide;

    document.querySelector(`tr[data-index="${this.previousSong}"]`).classList.remove('playing');
    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');
  }

  /**
   * Play the audio.
   */
  play() {
    audio.play();
  }

  /**
   * Pause the audio.
   */
  pause() {
    audio.pause();
  }

  /**
   * Seek in the audio, update the time based on range value selected.
   */
  seek() {
    audio.currentTime = Number(trackingSlider.value);
    songCurrentTime.innerHTML = secondsToHms(audio.currentTime);
  }

  /**
   * Update the range values based on the current time in the song.
   */
  updateSongRangeValues() {
    const value = (trackingSlider.value / this.song.duration) * 100;
    const buffer = 0;

    songCurrentTime.innerHTML = secondsToHms(trackingSlider.value);

    trackingSlider.style.background = `linear-gradient(to right, ${colors.aqua[50]} 0%, ${colors.aqua[50]} ${value}%, ${colors.metal[50]} ${value}%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${colors.metal[80]} 100%)`;
  }

  /**
   * Adjust the volume.
   */
  adjustVolume() {
    const {value} = volumeSlider;
    const buffer = 0;

    audio.volume = value;

    volumeSlider.style.background = `linear-gradient(to right, ${colors.aqua[80]} 0%, ${colors.aqua[80]} ${value * 100}%, ${colors.metal[50]} ${value * 100}%, ${colors.metal[50]} ${buffer}%, ${colors.metal[80]} ${buffer}%, ${colors.metal[80]} 100%)`;
  }
}

/**
 * The setup for any set of controls for the player.
 */
class Controls extends Player {
  /**
   * Play or pause the current list item.
   */
  playPause() {
    this.playing = toggleBoolean(this.playing);
    toggleClasses(buttons.playPause, 'on fa-play fa-pause');
    toggleClasses(artPlayer, 'playing');

    const currentClasses = new Set(buttons.playPause.classList);

    if (currentClasses.has('on')) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Go to the next item in the list.
   */
  next() {
    this.previousSong = this.songIndex;
    let playNext = true;

    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');

    if (this.shuffle) {
      this.randomIndex++;

      if (this.randomIndex >= this.randomOrder.size) {
        this.randomIndex = 0;

        playNext = (this.repeat);
      }

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      this.songIndex++;

      if (this.songIndex >= songList.length) {
        this.songIndex = 0;

        playNext = (this.repeat);
      }
    }

    this.updateSong();

    if (this.playing) {
      if (playNext) {
        this.play();
      } else {
        this.playPause();
      }
    }
  }

  /**
   * Go to the previous item in the list.
   */
  previous() {
    toggleClasses(document.querySelector(`tr[data-index="${this.songIndex}"]`), 'playing');

    if (this.shuffle) {
      if (this.randomIndex === 0) {
        this.randomIndex = this.randomOrder.size;
      }
      this.randomIndex--;

      this.songIndex = Array.from(this.randomOrder)[this.randomIndex];
    } else {
      if (this.songIndex === 0) {
        this.songIndex = songList.length;
      }
      this.songIndex--;
    }

    this.updateSong();

    if (this.playing) {
      this.play();
    }
  }

  /**
   * Shuffle the list, play in a random order.
   */
  toggleShuffle() {
    this.shuffle = toggleBoolean(this.shuffle);
    toggleClasses(buttons.shuffle, 'on');
    const currentClasses = new Set(buttons.shuffle.classList);

    if (currentClasses.has('on')) {
      this.randomOrder = new Set();
      this.randomIndex = 0;

      let randomIndex = this.songIndex;

      for (let index = 0; index < songList.length; index++) {
        // While loop to ensure that the index being added to the random order is unique, else changes the index value
        while (this.randomOrder.has(randomIndex)) {
          randomIndex = Math.floor(Math.random() * songList.length);
        }

        this.randomOrder.add(randomIndex);
      }
    }
  }

  /**
   * Repeat/loop the list that is currently playing.
   */
  toggleRepeat() {
    this.repeat = toggleBoolean(this.repeat);
    toggleClasses(buttons.repeat, 'on');
  }
}


// Instantiate the controls
const controls = new Controls();

// Add event listeners for the buttons
buttons.playPause.addEventListener('click', () => {
  controls.playPause();
});
buttons.next.addEventListener('click', () => {
  controls.next();
});
buttons.previous.addEventListener('click', () => {
  controls.previous();
});
buttons.shuffle.addEventListener('click', () => {
  controls.toggleShuffle();
});
buttons.repeat.addEventListener('click', () => {
  controls.toggleRepeat();
});


audio.onended = () => {
  // Once a song is over play next song.
  controls.next();
};
audio.ontimeupdate = () => {
  trackingSlider.value = audio.currentTime;
  controls.updateSongRangeValues();
};

// Update the range values on change or moving the scrubber.
trackingSlider.addEventListener('change', () => {
  controls.updateSongRangeValues();
  controls.seek();
});
trackingSlider.addEventListener('mousemove', () => {
  controls.updateSongRangeValues();
});

volumeSlider.addEventListener('change', () => {
  controls.adjustVolume();
});
volumeSlider.addEventListener('mousemove', () => {
  controls.adjustVolume();
});

// That's right ... hotkeys!
document.onkeypress = (event) => {
  switch (event.keyCode) {
    // a - previous
    case 97: {
      controls.previous();
      break;
    }
    // d / n - next
    case 100:
    case 110: {
      controls.next();
      break;
    }
    // s / p - play / pause
    case 115:
    case 112: {
      controls.playPause();
      break;
    }
    // e / r - repeat
    case 101:
    case 114: {
      controls.toggleRepeat();
      break;
    }
    // q - shuffle
    case 113: {
      controls.toggleShuffle();
      break;
    }
  }
};


/**
 * Build the playlist from the give array of songs.
 */
function buildPlaylist() {
  // Add the songs to the dom
  let html = '';
  songList.forEach((song, index) => {
    html += `
<tr data-index="${index}">
  <td class="play-pause"><img src="${song.album.art.square}"></td>
  <td>${song.title}</td>
  <td>${song.artist}</td>
  <td>${song.album.title}</td>
  <td>${secondsToHms(song.duration)}</td>
</tr>
`;
  });
  playlistBody.innerHTML = html;

  // Update the list items
  listItems = document.querySelectorAll('#playlist tbody tr');
  playlistPlay = document.querySelectorAll('#playlist .play-pause');

  // Add event listeners to the list items
  for (const listItem of listItems) {
    listItem.addEventListener('click', (event) => {
      const songIndex = event.target.parentElement.dataset.index;
      controls.updateSong(songIndex);

      if (controls.playing) {
        controls.play();
      }
    });

    listItem.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
  
  for (const playlistPlayButton of playlistPlay) {
    playlistPlayButton.addEventListener('click', (event) => {
      if (!controls.playing) {
        controls.playPause();
      }
    });
  }
}


// Initiate the setup.
window.onload = () => {
  buildPlaylist();
  controls.updateSong();
  controls.adjustVolume();
};