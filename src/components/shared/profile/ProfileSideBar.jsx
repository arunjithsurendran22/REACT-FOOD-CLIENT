import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import "./profile.css";
import { MdRestaurantMenu } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

const ProfileSideBar = () => {
  const data = [
    {
      label: "Orders",
      link: "/profile",
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
    <>
      <div className="flex h-full " id="sidebar">
        <div className="mr-4 h-96 mt-20">
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
      </div>
      <div className="my-div w-16 h-16">
        <div className="h-72 w-16 static " id="speed-dial">
          <div className="absolute top-28 left-0">
            <SpeedDial>
              <SpeedDialHandler>
                <IconButton size="lg" className="rounded-full">
                  <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent>
                <Link to="/profile/user-orders">
                  <SpeedDialAction className="h-16 w-16">
                    <MdRestaurantMenu className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Orders
                    </Typography>
                  </SpeedDialAction>
                </Link>
                <Link to="/profile/user-address">
                  <SpeedDialAction className="h-16 w-16">
                    <FaAddressCard className="h-4 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Address
                    </Typography>
                  </SpeedDialAction>
                </Link>
                <Link to="/profile/user-favourites">
                  <SpeedDialAction className="h-16 w-16">
                    <MdFavorite className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Favorites
                    </Typography>
                  </SpeedDialAction>
                </Link>
                <Link to="/profile/settings">
                  <SpeedDialAction className="h-16 w-16">
                    <CiSettings className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Settings
                    </Typography>
                  </SpeedDialAction>
                </Link>
              </SpeedDialContent>
            </SpeedDial>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
