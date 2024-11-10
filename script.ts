document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');

    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form elements
            const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement | null;
            const nameElement = document.getElementById('name') as HTMLInputElement | null;
            const emailElement = document.getElementById('email') as HTMLInputElement | null;
            const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
            const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
            const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
            const skillsElement = document.getElementById('skills') as HTMLTextAreaElement | null;

            // Check if all required elements exist
            if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
                const name = nameElement.value;
                const email = emailElement.value;
                const phone = phoneElement.value;
                const education = educationElement.value;
                const experience = experienceElement.value;
                const skills = skillsElement.value;

                // Profile Picture Handling
                const profilePictureFile = profilePictureInput?.files?.[0];
                const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

                // Create Resume Output
                const resumeOutput = `
                    <h2>Resume</h2>
                    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
                    <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
                    <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
                    <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

                    <h3>Education</h3>
                    <p id="edit-education" class="editable">${education}</p>

                    <h3>Experience</h3>
                    <p id="edit-experience" class="editable">${experience}</p>

                    <h3>Skills</h3>
                    <p id="edit-skills" class="editable">${skills}</p>
                `;

                // Display the resume
                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                } else {
                    console.error('Resume Output Element is missing.');
                }

                // Create the downloadable file
                const blob = new Blob([resumeOutput], { type: 'text/html' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = `${name.replace(/\s+/g, '_')}_resume.html`; // Download name format
                downloadLink.textContent = 'Download your Resume';
                
                // Append the download link to the resume output
                if (resumeOutputElement) {
                    resumeOutputElement.appendChild(downloadLink);
                }
            } else {
                console.error('One or more form elements are missing.');
            }
        });
    } else {
        console.error('Resume form not found.');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || '';

            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');

            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });

            currentElement.style.display = 'none';
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}