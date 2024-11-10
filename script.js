document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            var _a;
            event.preventDefault();
            // Get form elements
            var profilePictureInput = document.getElementById('profilePicture');
            var nameElement = document.getElementById('name');
            var emailElement = document.getElementById('email');
            var phoneElement = document.getElementById('phone');
            var educationElement = document.getElementById('education');
            var experienceElement = document.getElementById('experience');
            var skillsElement = document.getElementById('skills');
            // Check if all required elements exist
            if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
                var name_1 = nameElement.value;
                var email = emailElement.value;
                var phone = phoneElement.value;
                var education = educationElement.value;
                var experience = experienceElement.value;
                var skills = skillsElement.value;
                // Profile Picture Handling
                var profilePictureFile = (_a = profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
                var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
                // Create Resume Output
                var resumeOutput = "\n                    <h2>Resume</h2>\n                    ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n                    <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n                    <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n                    <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n                    <h3>Education</h3>\n                    <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n                    <h3>Experience</h3>\n                    <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n                    <h3>Skills</h3>\n                    <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n                ");
                // Display the resume
                var resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                }
                else {
                    console.error('Resume Output Element is missing.');
                }
                // Create the downloadable file
                var blob = new Blob([resumeOutput], { type: 'text/html' });
                var downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = "".concat(name_1.replace(/\s+/g, '_'), "_resume.html"); // Download name format
                downloadLink.textContent = 'Download your Resume';
                // Append the download link to the resume output
                if (resumeOutputElement) {
                    resumeOutputElement.appendChild(downloadLink);
                }
            }
            else {
                console.error('One or more form elements are missing.');
            }
        });
    }
    else {
        console.error('Resume form not found.');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || '';
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');
            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });
            currentElement.style.display = 'none';
            (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
