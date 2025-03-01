interface TimelineItem {
    title: string;
    company?: string;
    dates: string;
    description?: string;
    isLifeEvent?: boolean;
}

export const timelineData: TimelineItem[] = [
    {
        title: "Software Engineer",
        company: "SixFifty",
        dates: "2024 - Present",
        description: "Building legal technology solutions using React, TypeScript, and Ruby on Rails.",
    },
    {
        title: "Technical Trainer",
        company: "Tech-Moms",
        dates: "2023 - Present",
        description: "Develop and delivery training for beginners, providing feedback and staying current on industry trends.",
    },
    {
        title: "Software Engineer III",
        company: "Pluralsight",
        dates: "2022 - 2024",
        description: "Led projects, managed UI migrations, mentored teams, and ensured high-quality software delivery.",
    },
    {
        title: "UI Engineer",
        company: "Younqiue",
        dates: "2020 - 2022",
        description: "Developed responsive front-end components with React, JavaScript, and PHP, ensuring UI consistency.",
    },
    {
        title: "Moved to Utah",
        dates: "2019",
        isLifeEvent: true,
    },
    {
        title: "Assistant Instructor & Mentor",
        company: "DevMountain",
        dates: "2019 - 2021",
        description: "Taught React, JavaScript, and Node, mentored students, and updated curriculum to reflect industry trends.",
    },
    {
        title: "Learned to Code",
        dates: "2019",
        isLifeEvent: true,
    },
    {
        title: "Travel Break",
        dates: "2017 - 2019",
        description: "India, Poland, Prague, Amsterdam, England, Scotland, and Ireland. Spent extended time with family in The Philippines, Hawai'i, Wyoming, Florida, and Canada.",
    },
    {
        title: "GIS Associate",
        company: "TMD Inc.",
        dates: "2014 - 2017",
        description: "Used GIS expertise to create maps, analyze data, train teams, and improve project planning outcomes.",
    },
    {
        title: "Spice Girls break up",
        dates: "2001",
        isLifeEvent: true,
    },
] 