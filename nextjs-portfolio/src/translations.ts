export type Lang = 'en' | 'fi'
const list = {
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
    "projects": {
        "en": "Projects",
        "fi": "Projektit"
    },
    "current": {
        "en": "current",
        "fi": "nykyhetki"
    }
}

export default (lang: Lang) => (key: keyof typeof list) => list[key][lang]

export const LANG: Lang = 'en' as const