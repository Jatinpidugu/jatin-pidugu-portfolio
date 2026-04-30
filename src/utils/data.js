import { FaLinkedin } from "react-icons/fa";
import { IoLogoPython } from "react-icons/io5";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import { GiRobotGolem } from "react-icons/gi";
import { FcScatterPlot } from "react-icons/fc";
import { TbFileTypeSql, TbDatabase } from "react-icons/tb";
import { IoLogoHtml5 } from "react-icons/io5";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoReact } from "react-icons/io5";
import { SiTableau, SiSap } from "react-icons/si";
import { GrBusinessService } from "react-icons/gr";
import { FaNetworkWired } from "react-icons/fa";
import { SiDatadog } from "react-icons/si";
import { MdHistoryEdu } from "react-icons/md";
import { SiCredly } from "react-icons/si";
import { FaSquareGithub } from "react-icons/fa6";
import { SiKaggle } from "react-icons/si";
import { BsCodeSlash, BsBarChartFill, BsBrowserChrome } from "react-icons/bs";

import PROJECT_IMG_1 from "../assets/images/project_1.png"; 
import PROJECT_IMG_2 from "../assets/images/project_2.png"; 
import PROJECT_IMG_3 from "../assets/images/project_3.png"; 
import PROJECT_IMG_4 from "../assets/images/project_4.png"; 
import PROJECT_IMG_5 from "../assets/images/project_5.png"; 
import PROJECT_IMG_6 from "../assets/images/project_6.png"; 


import CERTFICATE_1 from "../assets/CERTIFICATE/CERT_1.jpg";
import CERTFICATE_2 from "../assets/CERTIFICATE/CERT_2.png";
import CERTFICATE_3 from "../assets/CERTIFICATE/CERT_3.png";
import CERTFICATE_4 from "../assets/CERTIFICATE/CERT_4.png";
import CERTFICATE_5 from "../assets/CERTIFICATE/CERT_5.png";
import CERTFICATE_6 from "../assets/CERTIFICATE/CERT_6.png";
import CERTFICATE_7 from "../assets/CERTIFICATE/CERT_7.png";
import CERTFICATE_8 from "../assets/CERTIFICATE/CERT_8.png";
import CERTFICATE_9 from "../assets/CERTIFICATE/CERT_9.png";
import CERTFICATE_10 from "../assets/CERTIFICATE/CERT_10.png";




export const MENU_LINKS = [
        { id: "01", label: "Home", offset: -100, to: "hero" },
        { id: "02", label: "About", offset: -80, to: "about" },
        { id: "03", label: "Skills", offset: -80, to: "skills" },
        { id: "04", label: "Projects", offset: -80, to: "projects" },
        { id: "05", label: "Certificates", offset: -80, to: "certificate" },
        { id: "06", label: "Contact", offset: -80, to: "contact" },
    ];
    
export const STATS = [
        {id: "01", count :"2024", label: 'Year of \nPassout'},
        {id: "02", count: "5", label: 'Certifications \nEarned'},
        {id: "03", count: "10", label: 'Projects \ndeveloped'},
        {id: "04", count: "15+", label: 'Skill \nlearned'},
    ]; 
        
export const SKILL_TABS = [
        { id: "01", label: "All", value: "all" },
        { id: "02", label: "Data Science", value: "data_science"},
        { id: "03", label: "SAP", value: "sap"},
        { id: "04", label: "Web Development", value: "web devlopment" },
        { id: "05", label: "Tools", value: "tools" },
        { id: "06", label: "Soft-Skills", value: "soft-skills" },
    ];

export const SKILLS = [
    {
        id: "01", 
        icon: IoLogoPython, 
        skil: "Python", 
        progress: 70, 
        type: "data_science", 
        description: "Experience in Python development aplication using Tkinter and Computer Vision Projects OpenCV and MediaPipe"
    },
    {    
        id: "02", 
        icon: GiArtificialIntelligence, 
        skil: "Supervised Learning", 
        progress: 80, 
        type: "data_science", 
        description: "Experience on datasets using Linear Regression, KNN, Ridge & Lassp Regression, SVR, Decsion Tree Regression and Random forest"
    }, 
    {  
        id: "03", 
        icon: FaRobot, 
        skil: "Un-Supervised Learning", 
        progress: 70, 
        type: "data_science", 
        description: "Experience on datasets using Classification Models"
    },
    {  
        id: "04", 
        icon: GiRobotGolem, 
        skil: "Deep learning NLTP", 
        progress: 60, 
        type: "data_science", 
        description: "Created in Computer Vision projects using CNN, Mediapipe"
    },
    {  
        id: "05", 
        icon: FcScatterPlot, 
        skil: "Visualization", 
        progress: 75, 
        type: "data_science", 
        description: "Created visualization in dataset for various dataset using Machine Learning Models"
    },
    {  
        id: "06", 
        icon: TbFileTypeSql, 
        skil: "EDA", 
        progress: 80, 
        type: "data_science", 
        description: "Used SQL for data Analysis and Manipulation of large datasets"
    },
    {  
        id: "07", 
        icon: IoLogoHtml5, 
        skil: "HTML5", 
        progress: 70, 
        type: "web devlopment", 
        description: "Designed structural framework for service shops"
    },
    {  
        id: "08", 
        icon: FaCss3Alt, 
        skil: "CSS", 
        progress: 60, 
        type: "web devlopment", 
        description: "Used CSS and TailWind along with bootstrap to add and animate the website"
    },
    {  
        id: "09", 
        icon:  IoLogoReact, 
        skil: "React", 
        progress: 70, 
        type: "web devlopment", 
        description: "Basic Exprience in React+vite based projects and deployment"
    },
    {  
        id: "10", 
        icon:  SiTableau, 
        skil: "Tableau", 
        progress: 70, 
        type: "tools", 
        description: "Create Dashboards and dataset analaysis for the various datasets of the kaggle"
    },
    {  
        id: "11", 
        icon: GrBusinessService, 
        skil: "Power-BI", 
        progress: 80, 
        type: "tools", 
        description: "Basic Knowledge of PowerBI data relations and columns Manipulation and data cleaning"
    },
    {  
        id: "12", 
        icon: FaNetworkWired, 
        skil: "Networking Basics", 
        progress: 90, 
        type: "tools", 
        description: "Basics of hardware of the networking and the tools used in the networking"
    },
    {  
        id: "13", 
        icon:  SiDatadog, 
        skil: "Context Understanding", 
        progress: 90, 
        type: "soft-skills", 
        description: "Coursera Business Intelligence cerified in the Context Understanding and storys of data"
    },
    {
        id: "14",
        icon:  MdHistoryEdu,
        skil: "Data Story Telling",
        progress: 90,
        type: "soft-skills",
        description: "Coursera Business Intelligence and Data analytics certified in the Context Understanding and storytelling of data"
    },
    {
        id: "15",
        icon: SiSap,
        skil: "SAP HANA / S/4HANA",
        progress: 75,
        type: "sap",
        description: "Hands-on with SAP HANA in-memory database and S/4HANA — built a natural-language chatbot that translates user prompts into SQL/CDS queries against live HANA data."
    },
    {
        id: "16",
        icon: BsBarChartFill,
        skil: "SAP Analytics Cloud (SAC)",
        progress: 70,
        type: "sap",
        description: "Built dashboards and stories in SAC — connecting HANA models, planning data, and predictive scenarios for business reporting."
    },
    {
        id: "17",
        icon: BsCodeSlash,
        skil: "ABAP / ABSL",
        progress: 65,
        type: "sap",
        description: "Backend logic in SAP Business ByDesign using ABSL and ABAP — built custom plant-maintenance modules end-to-end."
    },
    {
        id: "18",
        icon: TbDatabase,
        skil: "CDS Views & OData",
        progress: 70,
        type: "sap",
        description: "Modeled CDS views with annotations and joins, exposed as OData services for consumption by Fiori apps and analytical clients."
    },
    {
        id: "19",
        icon: BsBrowserChrome,
        skil: "SAP Fiori / UI5",
        progress: 65,
        type: "sap",
        description: "Built Fiori apps in SAPUI5 with custom controls, OData binding, and consistent SAP design-system theming."
    },

];

export const ABOUT_ME = { 
    content: "Computer Science graduate from Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore — currently a full-time AI / ML Engineer at iMark 360 LLP, Ahmedabad, where I design and develop production-grade AI systems for real business workflows.\n\nRecent work includes a SAP HANA database chatbot that translates natural language into SQL, a fully offline document-processing AI for confidential data, and a full-stack plant-maintenance platform with predictive scheduling.\n\nI believe an intelligent system is only as strong as the engineering around it — reliability, security, and a clean interface are what turn a model into something a team can actually depend on.",
    socialLinks: [
        { id: "01", label: "Kaggle", icon: SiKaggle, link: "https://www.kaggle.com/jatinpidugu" },
        { id: "02", label: "Github", icon: FaSquareGithub, link: "https://github.com/Jatinpidugu"},
        { id: "03", label: "Credly", icon: SiCredly, link: "https://www.credly.com/users/jatin-pidugu" }, 
        { id: "04", label: "Linkedln", icon: FaLinkedin, link: "https://www.linkedin.com/in/jatin-pidugu-857b82218" }, 
    ],
    email: "jatinpidugu@gmail.com",
    phone: "+91 7988989479",
    LinkedIn: "jatin pidugu",
    experienceStartDate: "2024-01-01",
};

export const PROJECTS = [
    {
        id: 1,
        title: "Sign Language Real-time Detection using Media-pipe",
        image: PROJECT_IMG_1,
        tag: ["Tkinter", "Media-pipe", "Mediapipe","CNN","TensorFlow","Python","Pytextspeech"],
        link: "https://github.com/Jatinpidugu/sign-language-detection",
        type: "data_science"
    },
    {
        id: 2,
        title: "Personal Portfolio using React+vite",
        image: PROJECT_IMG_2,
        tag: ["React", "VITE", "Taiwind","CSS","Javascipt"],
        link: "https://github.com/Jatinpidugu/jatin-pidugu-portfolio",
        type: "web_devlopment"
    },
    {
        id: 3,
        title: "Data Science and Analytics Projects",
        image: PROJECT_IMG_3,
        tag: ["Pandas","Python", "Sci-kit Learn", "MatplotLib","Numpy","SQL"],
        link: "https://github.com/Jatinpidugu/data-science-projects",
        type: "data_science"
    },
    {
        id: 4,
        title: "SQL Connectivity and DATA Manipulation in EDA",
        image: PROJECT_IMG_4,
        tag: ["EDA", "STATs-Model", "Connectivity","Query management"],
        link: "https://github.com/Jatinpidugu/sql-eda",
        type: "data_science"
    },
    {
        id: 5,
        title: "Power-BI Projects using EXCEL, CSV Files",
        image: PROJECT_IMG_5,
        tag: ["Power-BI", "DAX", "DATA Cleaning", "Visualization of Data","Data Relation Management"],
        link: "https://github.com/Jatinpidugu/powerbi-projects",
        type: "tools"
    },
    {
        id: 6,
        title: "Voting Site Frontend",
        image: PROJECT_IMG_6,
        tag: ["HTML", "CSS", "Flask", "Python", "SQL","EXCEL"],
        link: "https://github.com/Jatinpidugu/voting-site",
        type: "web_devlopment"
    },
];

export const PROJECT_TABS = [
    { id: "01", label: "All", value: "all" },
    { id: "02", label: "Data Science", value: "data_science" },
    { id: "03", label: "Web Development", value: "web_devlopment" },
    { id: "04", label: "Tools", value: "tools" },
];

export const MY_CERTIFICATES = [
    {
        id: 1,
        title: "PANTECH SOLUTION 30 Days Intership on AI",
        image: CERTFICATE_1,
        tag: ["AI", "CNN", "TKINTER","PYTHON","DEEP LEARNING"]
    },
    {
        id: 2,
        title: "YBI Foundation: REGULARIZATION and Feature Selection",
        image: CERTFICATE_2,
        tag: ["RIGID", "LASSO", "Standardization","DATA"]
    },
    {
        id: 3,
        title: "YBI Foundation: Fundamentals of AI and Data Skills",
        image: CERTFICATE_3,
        tag: ["DATA Cleaning","Python","Preprocessing","Visulization"]
    },
    {
        id: 4,
        title: "YBI Foundation: Fundamentals of Classification Modelling",
        image: CERTFICATE_4,
        tag: ["Python","Numpy", "Pandas", "Jupiter_notebook"]
    },
    {
        id: 5,
        title: "YBI Foundation: Fundamentals of Unsupervised Learning",
        image: CERTFICATE_5,
        tag: ["Unsupervised Learning"]
    },
    {
        id: 6,
        title: "NIIT Foundation: Digital Producitvity",
        image: CERTFICATE_6,
        tag: ["Digital Productivity", "Digital WellBeing", "Digital Work Balance"]
    },
    {
        id: 7,
        title: "CISCO Networking Academy: Introduction to IOT",
        image: CERTFICATE_7,
        tag: ["IOT", "Ardino UNO", "Electronics","IDE","IOT-LEVELS","C++"]
    },
    {
        id: 8,
        title: "Kodacy: Robotics Basics Theory",
        image: CERTFICATE_8,
        tag: ["MOTORS", "Sensors and Actuators", "ROS","HMI","Neuro Schematics"]
    },
    {
        id: 9,
        title: "Coursera: Google Bussiness Intelligence",
        image: CERTFICATE_9,
        tag: ["Context Understanding", "Data Privacy", "Data Biasing","Data Story","Data Value","PowerBI"]
    },
    {
        id: 10,
        title: "Coursera: Google Data Analytics",
        image: CERTFICATE_10,
        tag: ["Data Collection", "Data Preprocessing", "Data Cleaning","Data Manipulation","Data Visualization","Data Model Selection","Data Analysis", "Data Reporting"]
    },
];
