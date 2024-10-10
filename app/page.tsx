'use client'
import LinksTab from "@/components/Templates/LinksTab";
import ProfileDetailsTab from "@/components/Templates/ProfileDetailsTab";
import Topbar from "@/components/Topbar";
import { TabGroup, TabPanel, TabPanels, Transition } from "@headlessui/react";
import { useState } from "react";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="p-4 bg-[#FAFAFA]">
      <TabGroup selectedIndex={tabIndex} onChange={setTabIndex}>
        <Topbar home />

        <TabPanels>
          <TabPanel className='mt-4'>
            <Transition appear show={tabIndex == 0}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div>
                <LinksTab />
              </div>
            </Transition>
          </TabPanel>

          <TabPanel className='mt-4'>
            <Transition appear show={tabIndex == 1}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <span>
                <div>
                  <ProfileDetailsTab />
                </div>
              </span>
            </Transition>
          </TabPanel>
        </TabPanels>
      </TabGroup>

    </div>
  );
}
