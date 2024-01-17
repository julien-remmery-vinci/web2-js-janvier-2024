import Navigate from "../Router/Navigate";

const ManageCarouselPage = () => {
    displayForm();
};

function displayForm() {
    const main = document.querySelector('main');
    const form = document.createElement('form');
    const time = document.createElement('input');
    const submit = document.createElement('input');
    submit.type = "submit";
    submit.value = 'valider';
    form.appendChild(time);
    form.appendChild(submit);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('time', time.value);
        Navigate('/quotecarousel');
    })
    main.appendChild(form);
}

export default ManageCarouselPage;
