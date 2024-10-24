function loginValidator(options) {
    const formElement = document.querySelector(options.form);
    
    if (!formElement) return; // Nếu không tìm thấy form, dừng lại.

    options.rules.forEach((rule) => {
        const inputElement = document.querySelector(rule.selection);

        if (inputElement) {
            inputElement.onblur = () => handleValidation(inputElement, rule, options);
        }
    });

    const showInfoButton = document.querySelector(options.showInformations.selection);
    if (showInfoButton) {
        showInfoButton.onclick = (e) => {
            e.preventDefault();
            // console.log(options.showInformations.informations);
        };
    }
}

function handleValidation(inputElement, rule, options) {
    const errorMessage = rule.check(inputElement.value);
    const formMessage = inputElement.parentElement.querySelector('.form_message');

    if (errorMessage) {
        formMessage.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> ${errorMessage}`;
        inputElement.parentElement.classList.add('invalid');
    } else {
        formMessage.innerText = '';
        inputElement.parentElement.classList.remove('invalid');
        updateInformations(inputElement, options);
    }
}

function updateInformations(inputElement, options) {
    const fieldName = inputElement.name || 'unknown'; // Dùng name để xác định thông tin
    options.showInformations.informations = {
        ...options.showInformations.informations,
        [fieldName]: inputElement.value
    };
}

// Định nghĩa các rules kiểm tra:
loginValidator.isAccount = (selection) => ({
    selection,
    check: (value) => value ? undefined : 'Please write your account'
});

loginValidator.isEmail = (selection) => ({
    selection,
    check: (value) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value) return 'Please write your email';
        return regex.test(value) ? undefined : 'This is not a valid email. Please try again.';
    }
});

loginValidator.isPassword = (selection) => ({
    selection,
    check: (value) => {
        if (!value) return 'Please write your password';
        return value.length >= 6 ? undefined : 'Your password must be at least 6 characters long.';
    }
});

loginValidator.submit = (selection) => ({
    selection,
    informations: {}
});
