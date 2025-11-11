"use client";
import { BlueSkyIcon, FacebookIcon , GoogleIcon, InstagramIcon, LinkedInIcon, PinterestIcon, RedditIcon, TelegramIcon, TiktokIcon, WeChatIcon, WhatsappIcon, XIcon, YoutubeIcon} from "@/icons";
import React from "react";
import _ from 'lodash';
import Badge from "../ui/badge/Badge";
import { SocialNetworkEnum } from "@/enums/SocialNetworkEnum";

type SocialNetwork = {
  name: SocialNetworkEnum;
  icon: React.ReactElement
}

const networks: SocialNetwork[] = [
  {
    name: SocialNetworkEnum.Facebook,
    icon: <FacebookIcon />,
  },
  {
    name: SocialNetworkEnum.Linkedin,
    icon: <LinkedInIcon />,
  },
  {
    name: SocialNetworkEnum.X,
    icon: <XIcon />,
  },
  {
    name: SocialNetworkEnum.Youtube,
    icon: <YoutubeIcon />,
  },
  {
    name: SocialNetworkEnum.Tiktok,
    icon: <TiktokIcon />,
  },
  {
    name: SocialNetworkEnum.Telegram,
    icon: <TelegramIcon />,
  },
  {
    name: SocialNetworkEnum.Instagram,
    icon: <InstagramIcon />,
  },
  {
    name: SocialNetworkEnum.Pinterest,
    icon: <PinterestIcon />,
  },
  {
    name: SocialNetworkEnum.Reddit,
    icon: <RedditIcon />,
  },
  {
    name: SocialNetworkEnum.Google,
    icon: <GoogleIcon />,
  },
  {
    name: SocialNetworkEnum.Bluesky,
    icon: <BlueSkyIcon />,
  },
  {
    name: SocialNetworkEnum.Whatsapp,
    icon: <WhatsappIcon />,
  },
  {
    name: SocialNetworkEnum.Wechat,
    icon: <WeChatIcon />,
  }
]

export default function LinkedNetworksCard() {  
  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
       
          
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Comptes réseaux connectés
            </h4>
            <div className="flex flex-col gap-4">
            {
              networks.map((network: SocialNetwork) => (
                <div className="flex w-full items-center justify-between" key={network.name}>
                  <div className="inline-flex items-center gap-3">
                    <span className="bg-brand-500 p-2 rounded-full text-white">
                      {network.icon}</span> {_.upperFirst(network.name)}
                    
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <Badge size="sm" variant="light" color="success">
                      Connecté
                    </Badge>
                     <button
                    className="flex w-auto items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  >
                    Connecter
                  </button>
                 </div>
                </div>
              ))
            }
        </div>
      </div>
  );
}
