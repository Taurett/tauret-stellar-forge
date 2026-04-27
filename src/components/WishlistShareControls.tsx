/**
 * WishlistShareControls — generate, toggle, and share a public wishlist URL.
 */
import { useState } from "react";
import { Check, Copy, Link2, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistShare } from "@/hooks/useWishlistShare";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const WishlistShareControls = () => {
  const { share, loading, create, setActive, regenerate } = useWishlistShare();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [working, setWorking] = useState(false);

  const shareUrl = share
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/wishlist/share/${share.share_token}`
    : "";

  const handleCreate = async () => {
    setWorking(true);
    try {
      await create();
      toast({ title: t("share.created") || "Share link created" });
    } catch (e) {
      toast({
        title: t("share.error") || "Failed to create share",
        description: e instanceof Error ? e.message : undefined,
        variant: "destructive",
      });
    }
    setWorking(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      toast({ title: t("share.copied") || "Link copied" });
    } catch { /* ignore */ }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: t("share.nativeTitle") || "My TAURET wishlist",
          url: shareUrl,
        });
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  if (loading) return null;

  if (!share) {
    return (
      <div className="glass clip-angle-lg p-5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Share2 className="w-5 h-5 text-primary mt-0.5" />
          <div className="flex-1">
            <h3 className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-1">
              {t("share.title") || "Share your wishlist"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("share.desc") || "Get a public link friends and family can view to see what you'd love."}
            </p>
            <Button
              onClick={handleCreate}
              disabled={working}
              className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-xs clip-angle"
            >
              <Link2 className="w-3 h-3 mr-2" />
              {t("share.create") || "Create Share Link"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass clip-angle-lg p-5 border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-4 h-4 text-primary" />
        <h3 className="font-tech text-xs uppercase tracking-[0.3em] text-primary">
          {t("share.title") || "Share your wishlist"}
        </h3>
        {!share.is_active && (
          <span className="font-tech text-[9px] uppercase tracking-widest text-destructive ml-auto">
            {t("share.disabled") || "Disabled"}
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          readOnly
          value={shareUrl}
          onFocus={(e) => e.currentTarget.select()}
          className="flex-1 min-w-0 bg-input/60 border border-primary/20 rounded px-3 py-2 text-xs font-mono text-foreground"
        />
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="glass border-primary/30 clip-angle shrink-0"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleNativeShare}
          size="sm"
          className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-[10px] clip-angle"
        >
          <Share2 className="w-3 h-3 mr-1.5" />
          {t("share.share") || "Share"}
        </Button>
        <Button
          onClick={() => setActive(!share.is_active)}
          variant="outline"
          size="sm"
          className="glass border-primary/30 font-tech uppercase tracking-widest text-[10px] clip-angle"
        >
          {share.is_active ? (t("share.disable") || "Disable") : (t("share.enable") || "Enable")}
        </Button>
        <Button
          onClick={regenerate}
          variant="ghost"
          size="sm"
          className="font-tech uppercase tracking-widest text-[10px]"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          {t("share.regenerate") || "Reset Link"}
        </Button>
      </div>
    </div>
  );
};

export default WishlistShareControls;
