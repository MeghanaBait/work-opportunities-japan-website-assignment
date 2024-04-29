Functions:
1. updateApplyButtonText(lang): Updates the text content of the "Easy Apply" button and "Full-time" job time based on the selected language.
2. getCategoryList(jobData): Returns a list of unique job categories extracted from the jobData array.
3. LogoLettersExtraction(str): Extracts the initials from the company name to generate a logo.
4. changeLanguage(lang): Changes the language based on the selected option and updates the content accordingly.
5. displayJobCards(): Displays job cards on the page based on the current page and job data.
6. displayPagination(): Displays pagination links based on the total number of job cards and cards per page.
7. hightlightCurrentPage(): Highlights the current page in the pagination links.
8. updateContent(lang): Updates the content of various elements on the page based on the selected language.

Event Listeners:
1. 'change' event listener on the language selector dropdown: Calls the updateContent function with the selected language when the language is changed.

Initialization:
1. Calls the updateContent function with the initial language set to English ("en").
2. Displays pagination links and job cards on page load.

APIs:
1. No external APIs are used in this source code.

