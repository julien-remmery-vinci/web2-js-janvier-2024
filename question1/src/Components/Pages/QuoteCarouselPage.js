import defaultImage from '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';

const QuoteCarouselPage = () => {
    getCitations();
};

function getCitations() {
    const storedTime = parseInt(localStorage.getItem('time'), 10);
    localStorage.removeItem('time');
    const time = !Number.isNaN(storedTime) ? storedTime : 5000;
    fetch('http://localhost:3000/quotes')
    .then(response => response.json())
    .then(response => displayCitations(response, time));
}

function displayCitations(citations, time) {
    let citation;
    if(citations.length > 0){
        citation = citations.splice(0, 1);
        displayOneCitation(citation[0]);
    }
    const interval = setInterval(() => {
        if(citations.length > 0){
            citation = citations.splice(0, 1);
            displayOneCitation(citation[0]);
        }
        else{
            clearInterval(interval);
            const main = document.querySelector('main');
            main.innerHTML = 'Rechargez la page si vous souhaitez réafficher le carrousel des citations !';
        }
    }, time);
}

function displayOneCitation(citation) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const penseur = document.createElement('h3');
    const texte = document.createElement('p');
    const image = document.createElement('img');
    penseur.textContent = citation.thinker;
    texte.textContent = citation.quote;
    image.src = citation.image;
    main.appendChild(penseur);
    main.appendChild(texte);
    main.appendChild(image);
    image.onerror = () => displayDefaultImage();
}

function displayDefaultImage() {
    const image = document.querySelector('img');
    image.src = defaultImage;
}

  
export default QuoteCarouselPage;
  