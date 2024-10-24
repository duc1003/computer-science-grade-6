function signupValidator(options) {
    const formElement = document.querySelector(options.form);
    const submitButton = document.querySelector(options.submitButton);

    function validateForm() {
        const isValid = [...formElement.querySelectorAll('input')].every(input =>
            !input.parentElement.classList.contains('invalid') && input.value.trim() !== ''
        );
        submitButton.disabled = !isValid;
    }

    if (formElement) {
        options.rules.forEach(rule => {
            const inputElement = document.querySelector(rule.selection);

            inputElement.onblur = () => {
                const errorMessage = rule.check(inputElement.value);
                const formMessage = inputElement.parentElement.querySelector('.form_message');

                if (errorMessage) {
                    formMessage.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> ${errorMessage}`;
                    inputElement.parentElement.classList.add('invalid');
                } else {
                    formMessage.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

                validateForm();
            };

            inputElement.oninput = () => validateForm();
        });

        formElement.addEventListener('submit', function (event) {
            event.preventDefault();

            const isValid = [...formElement.querySelectorAll('input')].every(input =>
                input.value.trim() !== ''
            );

            if (isValid) {
                const account = document.querySelector('#signup_account_input').value;
                const email = document.querySelector('#signup_email_input').value;
                const password = document.querySelector('#signup_password_input').value;

                const signupData = { account, email, password };
                console.log("Thông tin đăng ký:", signupData);

                showToast('Đăng ký thành công!');
            } else {
                showToast('Vui lòng điền đầy đủ thông tin!');
            }
        });
    }
}

signupValidator.isAccount = selection => ({
    selection,
    check: value => value ? undefined : 'Vui lòng nhập tài khoản'
});

signupValidator.isEmail = selection => ({
    selection,
    check: value => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value) return 'Vui lòng nhập email';
        return regex.test(value) ? undefined : 'Email không hợp lệ';
    }
});

signupValidator.isPassword = selection => ({
    selection,
    check: value => value.length >= 6 ? undefined : 'Mật khẩu phải có ít nhất 6 ký tự'
});

signupValidator.isPasswordMatch = (selection, target) => ({
    selection,
    check: () => {
        const password = document.querySelector(target).value;
        const confirmPassword = document.querySelector(selection).value;
        return password === confirmPassword ? undefined : 'Mật khẩu không khớp';
    }
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
