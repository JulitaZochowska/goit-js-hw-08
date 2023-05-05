import _ from 'lodash';
//przeładowanie strony
//podpunkt 2-done
window.addEventListener('load', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = document.querySelector('input');
  const messageTextarea = document.querySelector('textarea');
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  } else {
    emailInput.value = '';
    messageTextarea.value = '';
  }

  //podpunkt 4-done
  const throttledUpdateStorage = _.throttle(value => {
    localStorage.setItem('feedback-form-state', value);
  }, 500);

  //podpunkt 1-done
  function saveFormDataToStorage() {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };

    throttledUpdateStorage(JSON.stringify(formData));
  }

  //event input-zdarzenie, wywoływane za kazdym razem, gdy wartość pola formularza
  //zostaje zmieniona przez uytkownika.
  emailInput.addEventListener('input', saveFormDataToStorage);
  messageTextarea.addEventListener('input', saveFormDataToStorage);

  //podpunkt 3-done
  form.addEventListener('submit', event => {
    event.preventDefault(); //zatrzymujemy domyślne działanie formularza
    localStorage.clear(); //usuwamy dane ze storage

    //tworzymy obiekt z aktualnymi wartościami pól
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };

    //wyświetlamy obiekt z wartościami pól w konsoli
    console.log(formData);

    //czyścimy pola formularza dopiero po wypisaniu danych na konsolę
    emailInput.value = '';
    messageTextarea.value = '';
  });
});
