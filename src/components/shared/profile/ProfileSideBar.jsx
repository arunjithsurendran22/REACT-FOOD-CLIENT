import React from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const ProfileSideBar = () => {
  const data = [
    {
      label: "Orders",
      link: "user-orders",
    },
    {
      label: "Address",
      link: "user-address",
    },
    {
      label: "Favourites",
      link: "user-favourites",
    },
    {
      label: "Settings",
      link: "settings",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="mr-4 h-96 mt-20" >
        <Tabs value="html" orientation="vertical" className="h-full">
          <TabsHeader className="w-32 h-full">
            {data.map(({ label, link }) => (
              <Link to={link} key={link}>
                <Tab value={link} className="cursor-pointer h-16">
                  {label}
                </Tab>
              </Link>
            ))}
          </TabsHeader>
          <TabsBody className="h-full">
            {data.map(({ link, desc }) => (
              <TabPanel key={link} value={link} className="py-0 h-full">
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <ul className="">
        
      </ul>
    </div>
  );
};

export default ProfileSideBar;
