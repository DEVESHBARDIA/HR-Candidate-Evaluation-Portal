

const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const steps = document.querySelectorAll('.step');
const form_steps=document.querySelectorAll('.form-step');
let active=1;

nextButton.addEventListener('click',() => {
    active++;
    if(active > steps.length){
        active=steps.length;
    }
    updateProgress();
});

prevButton.addEventListener('click',() => {
    active--;
    if(active<1)
    {
        active=1;
    }
    updateProgress();
});

const updateProgress = () => {
    console.log('steps.length =>' + steps.length);
    console.log('active =>' + active);

    steps.forEach((step, i) => {
        if(i == (active-1)){
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i =>' +i);
        }else{
            step.classList.remove('active');
            form_steps[i].classList.remove('active');

        }
    });


    if(active === 1){
        prevButton.disabled = true;
    }else if (active === steps.length){
        nextButton.disabled = true;
    }else{
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}


// Form submission handling
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = '/confirmation.html';
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    }
});