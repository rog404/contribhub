'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import contribhubLogo from '@/public/ch_icon.png'
import { Home, Search, Settings, LogOut, FolderRoot } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useSession } from '../Contexts/SessionContext'

function DashMenu() {
  const session = useSession() as any;
  return (
    <Tooltip.Provider>
      <div className="w-20 h-screen flex flex-col items-center justify-between py-4 antialiased">
        <Link href="/" className="flex flex-col items-center justify-center pt-3">
          <Image src={contribhubLogo} alt="logo" width={30}  />
        </Link>

        <div className="flex flex-col items-center space-y-6 bg-white/80 nice-shadow rounded-full py-4 px-3 ml-5">
          <TooltipWrapper content="Home">
            <Link href="/dashboard" className="flex flex-col items-center space-y-1">
              <Home size={16} />
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="My projects">
            <Link href="/dashboard/projects" className="flex flex-col items-center space-y-1">
              <FolderRoot size={16} />
            </Link>
          </TooltipWrapper>
        </div>

        <div className="flex flex-col items-center space-y-4 ml-5 mb-4">
          <TooltipWrapper content="Profile">
            <Link href="/profile" className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
              <img
                src={session.user.user_metadata.avatar_url || '/default-avatar.png'}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full nice-shadow "
              />
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Settings">
            <Link href="/settings" className="flex flex-col items-center space-y-1">
              <Settings size={16} />
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Logout">
            <button className="flex flex-col items-center space-y-1">
              <LogOut size={16} />
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </Tooltip.Provider>
  )
}

// Add this new component at the end of the file
function TooltipWrapper({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
          sideOffset={5}
          side="right"
        >
          {content}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

export default DashMenu