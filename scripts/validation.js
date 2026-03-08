document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();  

        document.querySelectorAll('.input.text-red-500, .textarea.text-red-500').forEach(el => {
            el.classList.remove('text-red-500');
        });

        document.querySelectorAll('.help.text-red-500').forEach(el => el.remove());    

        let isValid = true; 

        const name = document.getElementById('name');
        const nameValue = name.value.trim();

        if (nameValue === '') {
            showError(name, 'Введите имя и фамилию');
            isValid = false;
        } else if (nameValue.split(' ').length !== 2) {
            showError(name, 'Введите имя и фамилию');
            isValid = false;
        }

        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');  

        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length !== 11) {
            showError(phone, 'Введите 11 цифр номера');
            isValid = false;
        }

        const email = document.getElementById('email');
        const emailValue = email.value.trim();  

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        const message = document.getElementById('message');
        const messageValue = message.value.trim();

        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: nameValue,
                phone: phoneDigits,
                email: emailValue,
                subject: document.getElementById('subject').value.trim(),
                message: messageValue
            };  
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);  
            alert('Форма отправлена! Данные в консоли.');
        }
    });

    function showError(input, message) {
        input.classList.add('text-red-500');
        const help = document.createElement('p');
        help.classList.add('help', 'text-sm', 'font-medium', 'text-red-500');
        help.textContent = message;
        input.parentNode.appendChild(help);
    }   

    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('text-red-500');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.text-red-500');
            errors.forEach(el => el.remove());
        });
    });
});
