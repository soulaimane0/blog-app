const languageSelect = document.querySelector('#language-select');

const updateLanguage = async (selectedLanguage) => {
  try {
    // const response = await fetch('/change-language', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //   },
    //   body: JSON.stringify({ language: selectedLanguage }),
    // });
    // if (response.ok) {
    localStorage.setItem('language', selectedLanguage);
    window.location = `${window.location.pathname}?lng=${selectedLanguage}`;

    // } else console.error('Error changing language:', response.status);
    // console.log(window.location);
  } catch (err) {
    console.error('Error changing language: ', err);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  // let savedLanguage = localStorage.getItem('language');

  // if (savedLanguage) languageSelect.value = savedLanguage;
  // else savedLanguage = 'en';

  // await updateLanguage(savedLanguage);

  languageSelect.addEventListener('change', async () => {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('language', selectedLanguage);
    await updateLanguage(selectedLanguage);
  });
});
