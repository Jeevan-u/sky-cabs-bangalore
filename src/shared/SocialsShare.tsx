import React, { FC } from "react";

export interface SocialsShareProps {
  className?: string;
  itemClass?: string;
}

export interface SocialType {
  name: string;
  icon: string;
  href: string;
}

const socials: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-f",
    href: "https://www.facebook.com/sharer/sharer.php?u=https://www.srisadhgurutoursandtravels.com",
  },
  {
    name: "Twitter",
    icon: "lab la-twitter",
    href: "https://twitter.com/intent/tweet?url=https://www.srisadhgurutoursandtravels.com&text=Sri%20Sadhguru%20Tours%20%26%20Travels%20Hyderabad",
  },
  {
    name: "Linkedin",
    icon: "lab la-linkedin-in",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://www.srisadhgurutoursandtravels.com",
  },
  {
    name: "WhatsApp",
    icon: "lab la-whatsapp",
    href: "https://api.whatsapp.com/send?text=Sri%20Sadhguru%20Tours%20%26%20Travels%20Hyderabad%20https://www.srisadhgurutoursandtravels.com",
  },
];

const SocialsShare: FC<SocialsShareProps> = ({
  className = "grid gap-[6px]",
  itemClass = "w-7 h-7 text-base hover:bg-neutral-100 dark:hover:bg-neutral-800",
}) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        key={index}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full leading-none flex items-center justify-center bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 ${itemClass}`}
        title={`Share on ${item.name}`}
      >
        <i className={item.icon}></i>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsShare;
