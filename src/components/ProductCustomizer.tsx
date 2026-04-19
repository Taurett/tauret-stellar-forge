import { useState, useRef } from "react";
import { Upload, Palette, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export interface CustomizationData {
  color: string;
  design: string | null; // preset id or "custom"
  customImage: string | null; // data url
}

interface ProductCustomizerProps {
  baseImage: string;
  productName: string;
  value: CustomizationData;
  onChange: (data: CustomizationData) => void;
}

const COLORS = [
  { id: "neon-cyan", label: "Neon Cyan", hex: "#00f0ff" },
  { id: "magenta", label: "Magenta", hex: "#ff00d4" },
  { id: "void-black", label: "Void Black", hex: "#0a0a14" },
  { id: "arctic", label: "Arctic White", hex: "#f0f4ff" },
  { id: "plasma", label: "Plasma Purple", hex: "#7c3aed" },
  { id: "toxic", label: "Toxic Green", hex: "#39ff14" },
  { id: "blood", label: "Blood Red", hex: "#ff003c" },
  { id: "solar", label: "Solar Orange", hex: "#ff6b00" },
];

const PRESET_DESIGNS = [
  { id: "circuit", label: "Circuit Grid", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
      <defs>
        <pattern id="circuit" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 L20 10 M10 0 L10 20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#circuit)"/>
    </svg>
  )},
  { id: "lightning", label: "Lightning Bolt", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M55 10 L25 55 L45 55 L35 90 L70 40 L50 40 L60 10 Z" fill="currentColor" opacity="0.85"/>
    </svg>
  )},
  { id: "hex", label: "Hexagon Mesh", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
      <defs>
        <pattern id="hex" width="20" height="17.32" patternUnits="userSpaceOnUse">
          <polygon points="10,1 19,6 19,14 10,18 1,14 1,6" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#hex)"/>
    </svg>
  )},
  { id: "stripes", label: "Diagonal Stripes", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
      <defs>
        <pattern id="stripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="14" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#stripes)"/>
    </svg>
  )},
  { id: "skull", label: "Cyber Skull", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="currentColor" opacity="0.9">
        <path d="M50 15 C30 15 20 30 20 48 C20 58 25 65 30 70 L30 80 L40 80 L40 75 L45 75 L45 82 L55 82 L55 75 L60 75 L60 80 L70 80 L70 70 C75 65 80 58 80 48 C80 30 70 15 50 15 Z"/>
        <circle cx="38" cy="48" r="6" fill="#000"/>
        <circle cx="62" cy="48" r="6" fill="#000"/>
        <path d="M45 62 L50 68 L55 62 Z" fill="#000"/>
      </g>
    </svg>
  )},
  { id: "wave", label: "Sound Wave", svg: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="currentColor">
        {[10,20,30,40,50,60,70,80,90].map((x, i) => {
          const h = [20, 40, 60, 80, 100, 80, 60, 40, 20][i];
          return <rect key={x} x={x-3} y={50-h/2} width="5" height={h} rx="2" opacity="0.85"/>;
        })}
      </g>
    </svg>
  )},
];

const ProductCustomizer = ({ baseImage, productName, value, onChange }: ProductCustomizerProps) => {
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedColor = COLORS.find(c => c.id === value.color) ?? COLORS[0];
  const selectedPreset = PRESET_DESIGNS.find(d => d.id === value.design);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...value, customImage: reader.result as string, design: "custom" });
      toast({ title: "Design uploaded", description: "Your custom design is ready." });
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    onChange({ color: "neon-cyan", design: null, customImage: null });
  };

  return (
    <div className="glass clip-angle-lg border border-primary/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-neon flex items-center justify-center shadow-neon-cyan">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <div className="font-display font-bold uppercase tracking-wider text-foreground">Customize</div>
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              // Color · Design · Upload
            </div>
          </div>
        </div>
        <div
          className="h-6 w-6 rounded-full border-2 border-primary/50"
          style={{ backgroundColor: selectedColor.hex }}
          aria-label={`Selected color: ${selectedColor.label}`}
        />
      </button>

      {open && (
        <div className="border-t border-primary/20 p-6 space-y-6">
          {/* Live Preview */}
          <div>
            <div className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">// Live Preview</div>
            <div className="relative glass clip-angle-lg overflow-hidden border border-primary/30 bg-foreground/5 aspect-square max-h-80 mx-auto">
              <img
                src={baseImage}
                alt={productName}
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
              {/* Color tint overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
                style={{ backgroundColor: selectedColor.hex, opacity: 0.55 }}
              />
              <div
                className="absolute inset-0 mix-blend-screen pointer-events-none"
                style={{ backgroundColor: selectedColor.hex, opacity: 0.25 }}
              />
              {/* Design overlay */}
              {selectedPreset && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 pointer-events-none"
                  style={{ color: selectedColor.hex === "#0a0a14" ? "#00f0ff" : "#0a0a14" }}
                >
                  {selectedPreset.svg}
                </div>
              )}
              {value.customImage && value.design === "custom" && (
                <img
                  src={value.customImage}
                  alt="Custom design"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 object-contain pointer-events-none drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                />
              )}
            </div>
          </div>

          {/* Colors */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-primary" />
              <span className="font-tech text-xs uppercase tracking-[0.25em] text-primary">// Color — {selectedColor.label}</span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onChange({ ...value, color: c.id })}
                  className={`aspect-square rounded-full border-2 transition-all ${
                    value.color === c.id
                      ? "border-primary scale-110 shadow-neon-cyan"
                      : "border-primary/20 hover:border-primary/60"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.label}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Preset Designs */}
          <div>
            <div className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">// Preset Design</div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onChange({ ...value, design: null, customImage: null })}
                className={`glass clip-angle aspect-square flex items-center justify-center transition-all ${
                  !value.design
                    ? "border-2 border-primary shadow-neon-cyan"
                    : "border border-primary/30 hover:border-primary/60"
                }`}
              >
                <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">None</span>
              </button>
              {PRESET_DESIGNS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => onChange({ ...value, design: d.id, customImage: null })}
                  className={`glass clip-angle aspect-square p-3 flex items-center justify-center transition-all text-foreground ${
                    value.design === d.id
                      ? "border-2 border-primary shadow-neon-cyan text-primary"
                      : "border border-primary/30 hover:border-primary/60 hover:text-primary"
                  }`}
                  title={d.label}
                >
                  {d.svg}
                </button>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div>
            <div className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">// Upload Your Design</div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            {value.customImage && value.design === "custom" ? (
              <div className="flex items-center gap-3 glass clip-angle p-3 border border-primary/30">
                <img src={value.customImage} alt="" className="h-12 w-12 object-contain" />
                <span className="flex-1 font-tech text-xs text-foreground truncate">Custom design uploaded</span>
                <button
                  onClick={() => onChange({ ...value, customImage: null, design: null })}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove custom design"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => fileRef.current?.click()}
                className="w-full glass border border-primary/40 text-foreground hover:bg-primary/10 hover:text-primary font-tech uppercase tracking-widest clip-angle py-6"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image (max 5MB)
              </Button>
            )}
          </div>

          <button
            onClick={reset}
            className="w-full text-center font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
          >
            Reset customization
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCustomizer;
