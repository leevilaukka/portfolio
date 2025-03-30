export type Lang = 'en' | 'fi'
const list = {
    "skills": {
        "en": "Skills",
        "fi": "Taidot"
    },
    "workTitle": {
        "en": "Work Experience",
        "fi": "Työkokemus"
    },
    "educationTitle": {
        "en": "Education",
        "fi": "Koulutus"
    },
    "projectsTitle": {
        "en": "Projects",
        "fi": "Projektit"
    },
    "nonIT": {
        "en": "Non-IT",
        "fi": "Ei-IT"
    },
    "work": {
        "en": "Work",
        "fi": "Työ"
    },
    "education": {
        "en": "Education",
        "fi": "Koulutus"
    },
    "educationDescription": {
        "en": "Here is a list of my education history:",
        "fi": "Tässä on lista koulutushistoriastani:"
    },
    "educationDescList": {
        "en": "A list of my education history.",
        "fi": "Lista koulutushistoriastani."
    },
    "projects": {
        "en": "Projects",
        "fi": "Projektit"
    },
    "current": {
        "en": "current",
        "fi": "nykyhetki"
    },
    "cr": {
        "en": "cr",
        "fi": "op"
    },
    "grade": {
        "en": "Grade",
        "fi": "Arvosana"
    },
    "relevantCourses": {
        "en": "Relevant courses",
        "fi": "Relevantit kurssit"
    },
    "download": {
        "en": "Download",
        "fi": "Lataa"
    },
}

const getTranslation = (lang: Lang) => (key: keyof typeof list) => list[key][lang]
export default getTranslation