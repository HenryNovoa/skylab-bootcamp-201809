function validate(form, inputs) {
    if (typeof form !== 'object' || form.tagName !== 'FORM') throw Error('no form passed as argument')
    if (!Array.isArray(inputs) || inputs.length < 1) throw Error('array is not valid')

    let result = true;
    for (var i in inputs) {
        const input = form.querySelector('input[name="' + inputs[i] + '"]')
        if (!input.value) {
            input.classList.add('is-invalid')
            result = false
        } else {
            input.classList.remove('is-invalid')
        }
    }

    return result;
}
