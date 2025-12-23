class ValidateForm {
    constructor() {
        this.form = document.querySelector(".sign-up-form__form");
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.areValidFields();
        const validPasswords = this.areValidPasswords();

        if(validFields && validPasswords) {
            alert('Form was submitted');
            this.form.submit();
        }
    }

    areValidPasswords() {
        let valid = true;

        const password = this.form.querySelector('#password');
        const confirmPassword = this.form.querySelector('#confirm-password');

        if(password.value !== confirmPassword.value) {
            valid = false;
            this.createError(password, `The "Password" and "Confirm password" fields must be the same.`);
            this.createError(confirmPassword, `The "Password" and "Confirm password" fields must be the same.`);
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, `The password must be between 6 and 12 character.`);
        }

        return valid;
    }

    areValidFields() {
        let valid = true;
        
        for(let errorText of this.form.querySelectorAll('.sign-up-form__error-text')) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll(".sign-up-form__input")) {
            const label = field.previousElementSibling.innerText; 

            if(!field.value) {
                this.createError(field, `"${label}" field cannot be empty.`);
                valid = false;
            }

            if(field.id.includes('cpf')) {
                if(!this.validateCPF(field)) valid = false;
            }
            
            if(field.id.includes('username')) {
                if(!this.validateUser(field)) valid = false;
            }
        }

        return valid;
    }

    validateUser(field) {
        const username = field.value;
        let valid = true;

        if(username.length < 3 || username.length > 12) {
            this.createError(field, 'Username must be between 3 and 12 characters.');
            valid = false;
        }
        
        if(!username.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Username must contains letters and/or numbers only.');
            valid = false;
        }

        return valid
    }

    validateCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if(!cpf.valida()) {
            this.createError(field, 'CPF invalid.')
            return false
        }

        return true
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('sign-up-form__error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const validate = new ValidateForm();