import { Video, Phone } from "lucide-react";
import Button from "../../ui/Button";

export const ChatArea = () => {
  return (
    <div className="flex-1 flex flex-col h-screen bg-chat-background">
      <header className="h-14 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-foreground font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-secondary transition-smooth"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:bg-secondary transition-smooth"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            To start chatting - choose conversation
          </p>
        </div>
      </main>
    </div>
  );
};
