import { createElement, useEffect, useRef } from "react";
import { useEditable } from "@/hooks/useEditableContent";
import { cn } from "@/lib/utils";

interface EditableProps {
  contentKey: string;
  defaultValue: string;
  as?: string;
  className?: string;
  multiline?: boolean;
}

export const Editable = ({
  contentKey,
  defaultValue,
  as = "span",
  className,
  multiline = false,
}: EditableProps) => {
  const { isEditing, get, set } = useEditable();
  const value = get(contentKey, defaultValue);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value, isEditing]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = multiline
      ? e.currentTarget.innerText
      : e.currentTarget.innerText.replace(/\n/g, " ");
    if (next !== value) set(contentKey, next);
  };

  return createElement(
    as,
    {
      ref,
      contentEditable: isEditing,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
      className: cn(
        className,
        isEditing &&
          "outline-none ring-1 ring-primary/40 ring-offset-2 ring-offset-background rounded-md px-1 -mx-1 cursor-text hover:ring-primary/70 transition-smooth"
      ),
    },
    value
  );
};

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

export const EditableImage = ({ contentKey, defaultSrc, alt, className }: EditableImageProps) => {
  const { isEditing, get, set } = useEditable();
  const src = get(contentKey, defaultSrc);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") set(contentKey, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("relative group", className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-[inherit]" />
      {isEditing && (
        <label className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer rounded-[inherit] text-sm font-medium text-primary">
          Bild ändern
          <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </label>
      )}
    </div>
  );
};
