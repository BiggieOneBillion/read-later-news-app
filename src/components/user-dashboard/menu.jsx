import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { FiMoreVertical } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useGlobalContext } from "@/context/global-context";

const SettingsDropdown = () => {
  const { setAuth } = useGlobalContext();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon />
        </button> */}
        <button className="text-base text-slate-800 font-medium flex justify-start items-center gap-1 border  hover:border-slate-500 transition-colors duration-300 px-2 py-1">
          <span className="text-sm">Settings</span>
          <span>
            <FiMoreVertical />
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => setAuth(false)}
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            <span>Log Out</span>
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-black group-data-[disabled]:text-mauve8">
              <TbLogout />
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SettingsDropdown;
