import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ThumbnailUploader = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  /* =========================
     PREVIEW CUANDO CAMBIA FILE
  ========================= */
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value); // para edición
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  return (
    <div className="space-y-3">
      {/* PREVIEW */}
      {preview && (
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
          <AspectRatio ratio={16 / 9}>
            <img
              src={preview}
              alt="Thumbnail preview"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      )}

      {/* BOTÓN */}
      <Button
        type="button"
        variant="outline"
        className="border-zinc-800 text-white"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? "Cambiar thumbnail" : "Subir thumbnail"}
      </Button>

      {/* INPUT OCULTO */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </div>
  );
};

export default ThumbnailUploader;
