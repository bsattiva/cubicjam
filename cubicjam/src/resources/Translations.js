import LocalizedStrings from 'react-localization';

const Translations = new LocalizedStrings({
    en:{
      pages:{
        createPoll: {
                labels: 
                {
                  options:"voting options",
                  pollName: "poll name",
                  pollDescription: "describe your poll",
                  audience: "your audience",
                  submit: "Submit",
                  cancel: "Cancel"
                },
                placeholders: {
                  options: "e.g. 'Red'",
                  altOption: "e.g. 'Blue'",
                  resident: "e.g. 'Resident of the UK'",
                  ofAge: "older than 18"
                },
                hints: {
                  options: "Press (+) if you want add an option.",
                  audience: "Your voters should be of the following groups"
                }
              }
      },
      
      home:"Home",
      about:"About",
      polls:"Polls",
      news:"News",
      town: "Town",
      signin: "Sign-in",
      createPoll: "Create poll",
      myPolls: "My polls",
      createNewPoll: "Create a new Poll",
    
      errors: {
        tooSmallImage: "Please make sure your image is at least 30Kb.",
        tooBigImage: "Image cannot be bigger than 5Mb.",
        mandatory: "This field is mandatory.",
        invalid: "Input contains invalid chars."
      }



    },
    ru: {
      pages:{
        createPoll: {
                labels: 
                {
                  options:"опции голосования",
                  pollName: "имя голосования",
                  pollDescription: "описание голосования",
                  audience: "ваша аудитория",
                  submit: "Послать",
                  cancel: "Отменить"
                },
                placeholders: {
                  options: "напр. 'Красный'",
                  altOption: "напр. 'Синий'",
                  resident: "напр. 'Житель РФ'",
                  ofAge: "совершеннолетний"
                },
                hints: {
                  options: "Нажмите (+) чтобы добавить опцию.",
                  audience: "Участники голосования должны соответствовать этим критериям:"
                }
              }
      },
      
      home:"Домой",
      about:"О сайте",
      polls:"Голосования",
      news:"Новости",
      town: "Город",
      signin: "Войти",
      createPoll: "Создать голосование",
      myPolls: "Мои голосования",
      createNewPoll: "Создать новое голосование",
    
      errors: {
        tooSmallImage: "Изображение не может быть меньше 30Kb.",
        tooBigImage: "Изображение не может быть больше 5Mb.",
        mandatory: "Это поле обязательно к заполнению.",
        invalid: "В поле содержатся недопустимые символы."
      }
      }
    
   });

   export default Translations;