
const categoriesdiv = document.querySelector(".categories");
const categoryBtns = document.querySelector(".category");
let language = "en";
let jobData = languageStrings[language]['job-data'];
let categories = "All";

const cardsContainer = document.getElementById('job-cards-container');
const paginationContainer = document.getElementById('pagination');
const cardsPerPage = 4;
let currentPage = 1;

function updateApplyButtonText(lang) {
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.textContent = (lang === 'en') ? "Easy Apply >>" : "簡単応募 >>";
    });
    const jobTime = document.querySelectorAll('.job-time');
    jobTime.forEach(button => {
        button.textContent = (lang === 'en') ? "Full-time" : "フルタイム";
    });
}

function getCategoryList(jobData) {
    categories = jobData.map(item => item.category);
    return [... new Set(categories)];
}

function LogoLettersExtraction(str) {
    const words = str.split(' ');
    const letters = [];

    if (words.length <= 0) {
        return "NA";
    }
    words.forEach(word => {
        const firstLetter = word[0];
        letters.push(firstLetter);
    });

    if (words.length > 2) {
        return letters.splice(0, 2).join('');
    } else {
        return letters.join('');
    }
}

// function calculateDaysAgo(date) {
//     const postedDateTime = new Date(date);
//     const currDate = new Date();

//     const timeDiff = currDate.getTime() - postedDateTime.getTime();

//     if (timeDiff < (1000 * 60)) {
//         // If time difference is less than 1 minute
//         const secDiff = Math.floor(timeDiff / 1000);
//         return (secDiff > 1) ? `${secDiff} ${language === 'en' ? 'seconds ago' : '秒前'}` : `${secDiff} ${language === 'en' ? 'second ago' : '秒前'}`;
//     }
//     else if (timeDiff < (1000 * 3600)) {
//         // If time difference is less than 1 hour
//         const minDiff = Math.floor(timeDiff / (1000 * 60));
//         return (minDiff > 1) ? `${minDiff} ${language === 'en' ? 'minutes ago' : '分前'}` : `${minDiff} ${language === 'en' ? 'minute ago' : '分前'}`;
//     }
//     else if (timeDiff < (1000 * 3600 * 24)) {
//         // If time difference is less than 1 day
//         const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
//         return (hoursDiff > 1) ? `${hoursDiff} ${language === 'en' ? 'hours ago' : '時間前'}` : `${hoursDiff} ${language === 'en' ? 'hour ago' : '時間前'}`;

//     }
//     else {
//         // For time differences greater than or equal to 1 day
//         const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
//         return (daysDiff > 1) ? `${daysDiff} ${language === 'en' ? 'days ago' : '日前'}` : `${daysDiff} ${language === 'en' ? 'day ago' : '日前'}`;
//     }
// }


function changeLanguage(lang) {
    document.documentElement.lang = lang;
    language = lang;
    updateContent(lang);
}

currentPage = 1;

function displayJobCards() {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const jobsOnPage = jobData.slice(startIndex, endIndex);

    console.log('cards', jobData);
    cardsContainer.innerHTML = '';

    jobsOnPage.forEach(job => {
        const logo = LogoLettersExtraction(job.company);
        // const daysAgo = calculateDaysAgo(job.date_posted);
        const card = `
            <div class="">
                <div class="job-card">
                    <div class="card-body">
                        <h4 class="job-title">${job.title}</h4>
                        <div class="company-main">
                            <div class="company-logo">
                                <h1>${logo}</h1>
                            </div>
                            <div class="details">
                                <div class="job-company"> ${job.company}</div>
                                <div class="job-location">${job.location}</div>
                            </div>
                        </div>
                        <div class="work">
                            <div class="job-salary">${job.salary_range}</div>
                            <div class="job-time">${language === 'en' ? "Full-time" : "フルタイム"}</div>
                        </div>
                        <div class="job-skills"><span>Skills: </span>${job.skills_required.join(', ')}</div>
                        <div class="last">
                            <div class="job-date">${job.date_posted}</div>
                            <div class="apply">
                                <button class="apply-btn">${language === 'en' ? "Easy Apply >>" : "簡単応募 >>"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            console.log('cards' , language);
        cardsContainer.innerHTML += card;
    });
}

// pagination
function displayPagination() {
    const totalPages = Math.ceil(jobData.length / cardsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const link = document.createElement('li');
        link.classList.add('page-link');
        link.href = '#';
        link.textContent = i;
        link.addEventListener('click', function () {
            currentPage = i;
            displayJobCards();
            hightlightCurrentPage();
        });
        li.appendChild(link);
        paginationContainer.appendChild(li);
    }
    hightlightCurrentPage();
}

function hightlightCurrentPage() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    paginationLinks.forEach(link => {
        if (parseInt(link.textContent) === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updateContent(lang) {
    const strings = languageStrings[lang];
    document.getElementById('title').textContent = strings['title'];
    document.getElementById('menu1').textContent = strings['menu1'];
    document.getElementById('menu2').textContent = strings['menu2'];
    document.getElementById('menu3').textContent = strings['menu3'];
    document.getElementById('menu4').textContent = strings['menu4'];
    document.getElementById('menu5').textContent = strings['menu5'];
    document.getElementById('btn-reg').textContent = strings['btn-reg'];
    document.getElementById('btn-login').textContent = strings['btn-login'];
    document.getElementById('main-heading').textContent = strings['main-heading'];
    document.getElementById('sub-heading').textContent = strings['sub-heading'];
    document.getElementById('home-btn-1').textContent = strings['home-btn-1'];
    document.getElementById('home-btn-2').textContent = strings['home-btn-2'];
    document.getElementById('intro-heading').textContent = strings['intro-heading'];
    document.getElementById('intro-subtext').textContent = strings['intro-subtext'];
    document.getElementById('intro-btn').textContent = strings['intro-btn'];
    document.getElementById('listing-section').textContent = strings['listing-section'];
    document.getElementById('about-header').textContent = strings['about-header'];
    document.getElementById('about-content-1').textContent = strings['about-content-1'];
    document.getElementById('about-content-2').textContent = strings['about-content-2'];
    document.getElementById('contact-header').textContent = strings['contact-header'];
    document.getElementById('contact-content').textContent = strings['contact-content'];
    document.getElementById('contact-form-name').textContent = strings['contact-form-name'];
    document.getElementById('contact-form-email').textContent = strings['contact-form-email'];
    document.getElementById('emailHelp').textContent = strings['emailHelp'];
    document.querySelector('.form-check-label').textContent = strings['form-check-label'];
    document.querySelector('.aboutHeading').textContent = strings['aboutHeading'];
    document.querySelector('.p-jp1').textContent = strings['p-jp1'];
    document.querySelector('.p-jp2').textContent = strings['p-jp2'];
    document.querySelector('.p-jp3').textContent = strings['p-jp3'];
    document.getElementById('submit-btn').textContent = strings['submit-btn'];
    document.querySelector('.contact-form-message').textContent = strings['contact-form-message'];
    document.getElementById('Social-Heading').textContent = strings['Social-Heading'];
    document.getElementById('footer-credits').textContent = strings['footer-credits'];

    jobData = languageStrings[lang]["job-data"];
    console.log(jobData);

    categories = getCategoryList(jobData);
    if (lang === 'en') {
        categories.unshift('All');
    } else {
        categories.unshift('すべて');
    }

    categoriesdiv.innerHTML = '';

    categories.forEach(category => {
        const categoryBtn = document.createElement("button");
        categoryBtn.className = "category";
        categoryBtn.textContent = category;
        categoriesdiv.append(categoryBtn);

        categoryBtn.addEventListener('click', function () {
            const isActive = categoryBtn.classList.contains('active');
            categoriesdiv.querySelectorAll('.category').forEach(btn => {
                btn.classList.remove('active');
            });

            if (isActive) {
                jobData = languageStrings[language]['job-data'];
            }
            else {
                categoryBtn.classList.add('active');
                const filteredJobs = (category === "All") ? languageStrings[language]['job-data'] : jobData.filter(job => job.category === category);
                jobData = filteredJobs;
            }
            currentPage = 1;
            displayPagination();
            displayJobCards();
            jobData = languageStrings[language]['job-data'];
        });
    })

    // jobs

    displayPagination();
    displayJobCards();
    updateApplyButtonText(lang);
}



//lang change

document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    updateContent(selectedLanguage);
});

updateContent("en");
displayPagination();
displayJobCards();


