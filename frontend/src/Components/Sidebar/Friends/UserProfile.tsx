import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import Button from "../../ui/Button";
import { useLogoutMutation } from "../../../features/auth/mutations";

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const { mutate, isPending } = useLogoutMutation();

  return (
    <div className="border-t border-gray-700 p-3" ref={ref}>
      {/* Trigger */}
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition text-left group"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
            ME
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white">
            MyUsername
          </p>
          <p className="text-xs text-gray-400 truncate">#1234</p>
        </div>

        {/* Settings icon */}
        <Settings className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
      </Button>

      {/* Popover menu */}
      {open && (
        <div className="absolute bottom-20 left-3 w-56 bg-gray-900 rounded-md shadow-lg p-2 border border-gray-800 animate-fade-in">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="flex items-center  justify-start w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-md"
            >
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-start w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 rounded-md"
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <div className="h-px bg-gray-700 my-1" />
            <Button
              onClick={() => mutate()}
              disabled={isPending}
              variant="ghost"
              className="flex items-center  justify-start w-full px-3 py-2 text-sm text-red-400 hover:bg-red-950/30 rounded-md"
            >
              <LogOut className="mr-2 h-4 w-4" />{" "}
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
