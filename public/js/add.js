function validateForm() {
    const input = document.querySelector('input[type="file"]');
    if (!input.files || input.files.length === 0) {
        alert('Please select an image to submit.');
        return false;
    } else {
        return true;
    }
}