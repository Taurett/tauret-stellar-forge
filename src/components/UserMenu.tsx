import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const UserMenu = () => {
  const { user, signOut, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user) {
    return (
      <Button asChild size="sm" variant="outline" className="font-tech text-xs uppercase tracking-[0.2em] border-primary/40 hover:border-primary">
        <Link to="/auth">
          <LogIn className="w-3.5 h-3.5 mr-1.5" />
          {t("auth.signIn")}
        </Link>
      </Button>
    );
  }

  const initials = (user.user_metadata?.display_name || user.email || "?")
    .split(/[\s@]/)[0]
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: t("auth.signedOut") });
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="font-tech text-xs uppercase tracking-[0.2em] border-primary/40 hover:border-primary">
          <span className="w-5 h-5 rounded-full bg-gradient-neon text-primary-foreground flex items-center justify-center text-[10px] font-bold mr-1.5">
            {initials}
          </span>
          {t("auth.account")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-tech text-xs">
          <div className="font-bold truncate">{user.user_metadata?.display_name || user.email}</div>
          <div className="text-muted-foreground truncate font-normal">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          {t("auth.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
