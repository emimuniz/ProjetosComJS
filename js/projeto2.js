window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0; //Zera o tempo para poder tocar várias vezes seguidas
    audio.play();
    key.classList.add('playing');
  })
  const keys = document.querySelectorAll('.key');
  //Ao fim da transição remover a classe
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }
  //Esperando evento para cada elemento ao fim da transição
  keys.forEach(key => key.addEventListener('transitionend', removeTransition))