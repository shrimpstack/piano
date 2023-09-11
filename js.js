window.addEventListener('load', () => {
  create_keys();
  create_audio();
});

function create_keys() {
  let keyboard_el = find('#keyboard');
  keyboard_el.innerHTML = "";
  for(let c=3; c--;) {
    for(let f=0; f<12; f++) {
      let name = ["do", "+", "re", "+", "mi", "fa", "+", "so", "+", "ra", "+", "si"][f];
      let key_el = new_el_to_el(keyboard_el, 'div', name);
      key_el.classList.add((f + (f > 4)) % 2 ? 'b_key' : 'w_key');
      key_el.setAttribute('key', c + "-" + f);
      key_el.addEventListener('touchstart', () => up(keys[c][f]));
      key_el.addEventListener('touchend', () => down(keys[c][f]));
      key_el.addEventListener('contextmenu', e => e.preventdefault());
      key_el.addEventListener('mousedown', () => up(keys[c][f]));
      key_el.addEventListener('mouseup', () => down(keys[c][f]));
    }
  }
}

function up(audio_obj) {
  console.log('up');
  clearTimeout(audio_obj.timeout);
  audio_obj.audio.currentTime = 0;
  audio_obj.audio.volume = 1;
  audio_obj.audio.play();
}
function down(audio_obj) {
  if(audio_obj.audio.volume <= 0) {
    audio_obj.audio.pause();
    audio_obj.audio.currentTime = 0;
  }
  else {
    let v = Math.floor(audio_obj.audio.volume * 100);
    audio_obj.audio.volume = (v - 5) / 100;
    audio_obj.audio.timeout = setTimeout(() => down(audio_obj), 12);
  }
}

let keys = [];
function create_audio() {
  for(let f=0; f<3; f++) {
    let c_keys = new Array(12).fill(0).map((v, i) => {
      return {
        audio: new Audio(`./key/${f}-${i}.mp3`),
        timeout: null,
      };
    });
    keys.push(c_keys);
  }
}