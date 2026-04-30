import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  MENU_LINKS as DEFAULT_MENU_LINKS,
  STATS as DEFAULT_STATS,
  SKILL_TABS as DEFAULT_SKILL_TABS,
  SKILLS as DEFAULT_SKILLS,
  ABOUT_ME as DEFAULT_ABOUT_ME,
  PROJECTS as DEFAULT_PROJECTS,
  PROJECT_TABS as DEFAULT_PROJECT_TABS,
  MY_CERTIFICATES as DEFAULT_CERTIFICATES,
} from '../utils/data';

const STORAGE_KEYS = {
  menuLinks: 'portfolio_menuLinks',
  stats: 'portfolio_stats',
  skillTabs: 'portfolio_skillTabs',
  skills: 'portfolio_skills',
  aboutMe: 'portfolio_aboutMe',
  projects: 'portfolio_projects',
  projectTabs: 'portfolio_projectTabs',
  certificates: 'portfolio_certificates',
};

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// JSON.stringify drops function refs (icons), so when we hydrate from storage
// we restore each icon from the matching default by id. This keeps existing
// items rendering icons after edit/save round-trips.
const restoreIcons = (storedList, defaultList, idKey = 'id') => {
  if (!Array.isArray(storedList)) return storedList;
  const defaultsMap = new Map((defaultList || []).map((d) => [d[idKey], d]));
  return storedList.map((item) => {
    if (item.icon) return item;
    const fallback = defaultsMap.get(item[idKey]);
    return fallback?.icon ? { ...item, icon: fallback.icon } : item;
  });
};

const loadHydratedList = (storageKey, defaults) => {
  const stored = loadFromStorage(storageKey, null);
  return stored ? restoreIcons(stored, defaults) : defaults;
};

const loadHydratedAboutMe = () => {
  const stored = loadFromStorage(STORAGE_KEYS.aboutMe, null);
  if (!stored) return DEFAULT_ABOUT_ME;
  return {
    ...DEFAULT_ABOUT_ME,
    ...stored,
    socialLinks: restoreIcons(
      stored.socialLinks || [],
      DEFAULT_ABOUT_ME.socialLinks || []
    ),
  };
};

const DataContext = createContext();

export const usePortfolioData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [menuLinks, setMenuLinks] = useState(() => loadFromStorage(STORAGE_KEYS.menuLinks, DEFAULT_MENU_LINKS));
  const [stats, setStats] = useState(() => loadFromStorage(STORAGE_KEYS.stats, DEFAULT_STATS));
  const [skillTabs, setSkillTabs] = useState(() => loadFromStorage(STORAGE_KEYS.skillTabs, DEFAULT_SKILL_TABS));
  const [skills, setSkills] = useState(() => loadHydratedList(STORAGE_KEYS.skills, DEFAULT_SKILLS));
  const [aboutMe, setAboutMe] = useState(() => loadHydratedAboutMe());
  const [projects, setProjects] = useState(() => loadHydratedList(STORAGE_KEYS.projects, DEFAULT_PROJECTS));
  const [projectTabs, setProjectTabs] = useState(() => loadFromStorage(STORAGE_KEYS.projectTabs, DEFAULT_PROJECT_TABS));
  const [certificates, setCertificates] = useState(() => loadHydratedList(STORAGE_KEYS.certificates, DEFAULT_CERTIFICATES));

  const update = useCallback((setter, storageKey) => (newValue) => {
    setter(newValue);
    saveToStorage(storageKey, newValue);
  }, []);

  // Cross-tab sync: when admin saves in one tab, public site in another tab updates live.
  // The `storage` event only fires in OTHER tabs, never the writer's own — perfect for sync.
  useEffect(() => {
    const handleStorage = (e) => {
      if (!e.key || e.storageArea !== localStorage) return;
      let parsed = null;
      try { parsed = e.newValue ? JSON.parse(e.newValue) : null; } catch { return; }

      switch (e.key) {
        case STORAGE_KEYS.menuLinks:
          setMenuLinks(parsed || DEFAULT_MENU_LINKS); break;
        case STORAGE_KEYS.stats:
          setStats(parsed || DEFAULT_STATS); break;
        case STORAGE_KEYS.skillTabs:
          setSkillTabs(parsed || DEFAULT_SKILL_TABS); break;
        case STORAGE_KEYS.skills:
          setSkills(parsed ? restoreIcons(parsed, DEFAULT_SKILLS) : DEFAULT_SKILLS); break;
        case STORAGE_KEYS.aboutMe:
          if (!parsed) { setAboutMe(DEFAULT_ABOUT_ME); break; }
          setAboutMe({
            ...DEFAULT_ABOUT_ME,
            ...parsed,
            socialLinks: restoreIcons(parsed.socialLinks || [], DEFAULT_ABOUT_ME.socialLinks || []),
          });
          break;
        case STORAGE_KEYS.projects:
          setProjects(parsed ? restoreIcons(parsed, DEFAULT_PROJECTS) : DEFAULT_PROJECTS); break;
        case STORAGE_KEYS.projectTabs:
          setProjectTabs(parsed || DEFAULT_PROJECT_TABS); break;
        case STORAGE_KEYS.certificates:
          setCertificates(parsed ? restoreIcons(parsed, DEFAULT_CERTIFICATES) : DEFAULT_CERTIFICATES); break;
        default:
          break;
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const resetAll = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    setMenuLinks(DEFAULT_MENU_LINKS);
    setStats(DEFAULT_STATS);
    setSkillTabs(DEFAULT_SKILL_TABS);
    setSkills(DEFAULT_SKILLS);
    setAboutMe(DEFAULT_ABOUT_ME);
    setProjects(DEFAULT_PROJECTS);
    setProjectTabs(DEFAULT_PROJECT_TABS);
    setCertificates(DEFAULT_CERTIFICATES);
  }, []);

  const exportAll = useCallback(() => {
    const payload = {
      _meta: { schema: 'portfolio.v1', exportedAt: new Date().toISOString() },
      menuLinks,
      stats,
      skillTabs,
      skills,
      aboutMe,
      projects,
      projectTabs,
      certificates,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.download = `portfolio-backup-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [menuLinks, stats, skillTabs, skills, aboutMe, projects, projectTabs, certificates]);

  const importAll = useCallback((payload) => {
    if (!payload || typeof payload !== 'object') throw new Error('Invalid backup file');
    const apply = (setter, storageKey, defaults, value) => {
      if (Array.isArray(value) || (value && typeof value === 'object')) {
        const hydrated = Array.isArray(value)
          ? restoreIcons(value, defaults)
          : { ...defaults, ...value, socialLinks: restoreIcons(value.socialLinks || [], defaults.socialLinks || []) };
        setter(hydrated);
        saveToStorage(storageKey, value);
      }
    };
    if (payload.menuLinks) { setMenuLinks(payload.menuLinks); saveToStorage(STORAGE_KEYS.menuLinks, payload.menuLinks); }
    if (payload.stats) { setStats(payload.stats); saveToStorage(STORAGE_KEYS.stats, payload.stats); }
    if (payload.skillTabs) { setSkillTabs(payload.skillTabs); saveToStorage(STORAGE_KEYS.skillTabs, payload.skillTabs); }
    if (payload.skills) apply(setSkills, STORAGE_KEYS.skills, DEFAULT_SKILLS, payload.skills);
    if (payload.aboutMe) apply(setAboutMe, STORAGE_KEYS.aboutMe, DEFAULT_ABOUT_ME, payload.aboutMe);
    if (payload.projects) apply(setProjects, STORAGE_KEYS.projects, DEFAULT_PROJECTS, payload.projects);
    if (payload.projectTabs) { setProjectTabs(payload.projectTabs); saveToStorage(STORAGE_KEYS.projectTabs, payload.projectTabs); }
    if (payload.certificates) apply(setCertificates, STORAGE_KEYS.certificates, DEFAULT_CERTIFICATES, payload.certificates);
  }, []);

  const value = {
    menuLinks,
    updateMenuLinks: update(setMenuLinks, STORAGE_KEYS.menuLinks),
    stats,
    updateStats: update(setStats, STORAGE_KEYS.stats),
    skillTabs,
    updateSkillTabs: update(setSkillTabs, STORAGE_KEYS.skillTabs),
    skills,
    updateSkills: update(setSkills, STORAGE_KEYS.skills),
    aboutMe,
    updateAboutMe: update(setAboutMe, STORAGE_KEYS.aboutMe),
    projects,
    updateProjects: update(setProjects, STORAGE_KEYS.projects),
    projectTabs,
    updateProjectTabs: update(setProjectTabs, STORAGE_KEYS.projectTabs),
    certificates,
    updateCertificates: update(setCertificates, STORAGE_KEYS.certificates),
    resetAll,
    exportAll,
    importAll,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
