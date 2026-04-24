/**
 * ProductReviews — list of approved reviews + write-a-review form.
 * Pending review state is shown to the author.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductReviews } from "@/hooks/useProductReviews";
import { toast } from "@/hooks/use-toast";

interface ProductReviewsProps { productId: number }

const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        role="radio"
        aria-checked={value === n}
        onClick={() => onChange(n)}
        className="p-1 transition-transform hover:scale-110"
      >
        <Star className={`w-7 h-7 ${n <= value ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { reviews, myReview, loading, summary, submit, uploadPhoto } = useProductReviews(productId);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;
    const slots = 4 - photos.length;
    if (slots <= 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const f of files.slice(0, slots)) {
        if (!f.type.startsWith("image/")) continue;
        if (f.size > 5 * 1024 * 1024) {
          toast({ title: "Image too large", description: f.name, variant: "destructive" });
          continue;
        }
        const url = await uploadPhoto(f);
        uploaded.push(url);
      }
      setPhotos((p) => [...p, ...uploaded]);
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 10) {
      toast({ title: "Too short", description: "Reviews need at least 10 characters.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submit({
        rating,
        title: title.trim() || null,
        body: body.trim(),
        photo_urls: photos,
      });
      toast({ title: t("reviews.pendingNotice") });
      setTitle(""); setBody(""); setPhotos([]); setRating(5);
    } catch (err) {
      toast({
        title: "Could not submit",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-20" aria-label="Customer reviews">
      <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-4">// Reviews</div>
      <h2 className="font-display text-3xl md:text-4xl font-black mb-2">
        <span className="text-aurora">{t("reviews.heading")}</span>
      </h2>
      {summary.count > 0 && (
        <div className="flex items-center gap-2 mb-8 font-tech text-sm">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={`w-4 h-4 ${n <= Math.round(summary.average) ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
            ))}
          </div>
          <span className="font-bold text-foreground">{summary.average.toFixed(1)}</span>
          <span className="text-muted-foreground">· {t("reviews.basedOn")} {summary.count} {t("reviews.reviewsLower")}</span>
        </div>
      )}

      {/* Form / pending state */}
      {!user ? (
        <div className="glass clip-angle p-6 border border-primary/20 mb-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("reviews.signInToReview")}</p>
          <Link to="/auth">
            <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest text-xs clip-angle">
              {t("auth.signIn")}
            </Button>
          </Link>
        </div>
      ) : myReview ? (
        <div className="glass clip-angle p-6 border border-primary/20 mb-10">
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
            {myReview.status === "pending" ? t("reviews.yourPending") : "Your review"}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={`w-4 h-4 ${n <= myReview.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
            ))}
          </div>
          {myReview.title && <p className="font-bold mb-1">{myReview.title}</p>}
          <p className="text-sm text-muted-foreground">{myReview.body}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass clip-angle-lg p-6 border border-primary/20 mb-10 space-y-4">
          <div>
            <label className="block font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {t("reviews.rating")}
            </label>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <div>
            <label className="block font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {t("reviews.title")}
            </label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className="bg-input/60 border-primary/20" />
          </div>
          <div>
            <label className="block font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {t("reviews.body")}
            </label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
              required
              rows={4}
              placeholder={t("reviews.bodyPlaceholder")}
              className="bg-input/60 border-primary/20"
            />
          </div>
          <div>
            <label className="block font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {t("reviews.photos")}
            </label>
            <div className="flex flex-wrap gap-3 items-center">
              {photos.map((url) => (
                <div key={url} className="relative w-20 h-20 rounded overflow-hidden border border-primary/20">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotos((p) => p.filter((u) => u !== url))}
                    className="absolute top-0.5 right-0.5 bg-background/80 rounded-full p-0.5"
                    aria-label="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 4 && (
                <label className="w-20 h-20 border border-dashed border-primary/30 hover:border-primary/60 rounded flex items-center justify-center cursor-pointer transition-colors">
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5 text-muted-foreground" />}
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                </label>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={submitting || uploading}
            className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle"
          >
            {submitting ? t("reviews.submitting") : t("reviews.submit")}
          </Button>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground font-tech text-xs uppercase tracking-[0.3em]">…</div>
      ) : reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("reviews.empty")}</p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((r) => (
            <li key={r.id} className="glass clip-angle p-5 border border-primary/20">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                    ))}
                  </div>
                  <span className="font-tech text-xs text-muted-foreground">
                    {r.display_name || "Anonymous"}
                  </span>
                </div>
                <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              {r.title && <p className="font-bold mb-1">{r.title}</p>}
              <p className="text-sm text-muted-foreground whitespace-pre-line">{r.body}</p>
              {r.photo_urls.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {r.photo_urls.map((url) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer">
                      <img src={url} alt="" loading="lazy" className="w-16 h-16 object-cover rounded border border-primary/20" />
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductReviews;
