'use client';

import { LINK_LIST, PROFILE_INFO } from '@/constants/keys';
import { getFromLocalStorage } from '@/utils/storage';
import { createContext, useState, useContext, ReactNode } from 'react';

type LinkType = {
  link: string;
  platform: string;
};

type LinksContextType = {
  links: LinkType[];
  addLink: (newLinks: LinkType[]) => void;
  getLinkByPlatform: (platformName: string) => string | undefined;
  profileInfo: any;
  setProfileInfo: any;
};

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<LinkType[]>(getFromLocalStorage(LINK_LIST) || []);
  const [profileInfo, setProfileInfo] = useState<LinkType[]>(getFromLocalStorage(PROFILE_INFO) || []);

  const addLink = (newLinks: LinkType[]) => {
    setLinks(newLinks);
  };

  const getLinkByPlatform = (platformName: string): string => {
    const foundLink = links.find(link => link.platform?.toLowerCase() === platformName.toLowerCase());
    return foundLink?.link || '#';
  };

  return (
    <LinksContext.Provider value={{ links, addLink, getLinkByPlatform, profileInfo, setProfileInfo }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};
