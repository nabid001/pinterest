"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiShare } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

const PinShare = ({ pinTitle }: { pinTitle: string }) => {
  let { href } = window.location;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FiShare className="text-2xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel className="text-center">Share</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex gap-3 items-center flex-wrap">
          <DropdownMenuItem>
            <FaLink onClick={() => handleCopyLink()} className="text-3xl" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <WhatsappShareButton url={href} title={`${pinTitle}`}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <FacebookShareButton url={href} title={`${pinTitle}`}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <FacebookMessengerShareButton url={href} appId={""}>
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <EmailShareButton url={href} subject={`${pinTitle}`} body="body">
              <EmailIcon size={32} round />
            </EmailShareButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PinShare;
