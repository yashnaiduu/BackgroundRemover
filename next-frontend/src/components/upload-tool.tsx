"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ImageIcon,
  Loader2,
  Download,
  FileImage,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { postRemoveBackground } from "@/lib/api";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function UploadTool() {
  const [dragActive, setDragActive] = useState(false);
  const [inputDataUrl, setInputDataUrl] = useState<string | null>(null);
  const [outputDataUrl, setOutputDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"PNG" | "JPG" | "WEBP">("PNG");
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);


  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files || !files[0]) return;

    const file = files[0];

    if (!file.type.match('image.*')) {
      setError("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit. Please upload a smaller image.");
      return;
    }

    setError(null);
    setOutputDataUrl(null);
    const dataUrl = await fileToDataUrl(file);
    setInputDataUrl(dataUrl);
    setIsLoading(true);
    setProcessingProgress(0);

    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const startTime = Date.now();
      const json = await postRemoveBackground({ image: dataUrl, format: outputFormat });
      const processingTime = Date.now() - startTime;

      clearInterval(progressInterval);
      setProcessingProgress(100);

      if (!json.image) throw new Error(json.error || "No image returned");

      setOutputDataUrl(json.image);
    } catch (e: unknown) {
      console.error("Background removal error:", e);
      clearInterval(progressInterval);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setProcessingProgress(0), 1000);
    }
  }, [outputFormat]);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );



  if (!mounted) {
    return (
      <div className="glass rounded-2xl p-6 soft-shadow">
        <h2 className="text-2xl font-semibold tracking-tight">Background Remover</h2>
        <p className="mt-2 opacity-80">Drag & drop an image or click to upload.</p>
        <p className="mt-1 text-xs opacity-70">Loading...</p>

        <div className="mt-6 block cursor-pointer rounded-xl border border-white/15 p-8 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-3">
            <div className="relative">
              <div className="gradient-border rounded-2xl p-4">
                <div className="rounded-xl bg-[--surface] p-4">
                  <Upload className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Drop your image here</p>
              <p className="text-xs opacity-70">PNG, JPG, WebP up to ~10MB</p>
            </div>
            <button
              type="button"
              className="rounded-lg border px-4 py-2 text-sm hover:bg-white/5"
            >
              Choose file
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface border border-border rounded-3xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">Upload Image</h2>
        <p className="mt-2 text-foreground/60">Drag & drop or click to select</p>
      </div>


      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`mt-8 block cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300
          ${dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-surface"}`}
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-border shadow-sm">
            <Upload className="h-6 w-6 text-foreground/70" />
          </div>
          <div>
            <p className="text-lg font-medium">Click or drag image</p>
            <p className="text-sm text-foreground/40 mt-1">PNG, JPG, WebP up to 10MB</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full bg-primary text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Select Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </div>
      </label>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}

        </div>
      )}

      {/* Preview */}
      {/* Preview */}
      {(inputDataUrl || outputDataUrl) && (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Original */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
              <ImageIcon className="h-4 w-4" /> Original
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-background/50 aspect-[4/3] flex items-center justify-center relative">
              {inputDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={inputDataUrl} alt="Original" className="w-full h-full object-contain p-4" />
              ) : (
                <div className="flex items-center justify-center p-12">
                  <FileImage className="h-10 w-10 text-border" />
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
              Result
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-[url('/checker.svg')] bg-repeat aspect-[4/3] flex items-center justify-center relative bg-white/5">
              {outputDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outputDataUrl} alt="Result" className="w-full h-full object-contain p-4 z-10" />
              ) : (
                <div className="flex items-center justify-center p-12">
                  {isLoading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
                  ) : (
                    <FileImage className="h-10 w-10 text-border" />
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              {outputDataUrl ? (
                <a
                  href={outputDataUrl}
                  download={`background-removed.${outputFormat.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  <Download className="h-4 w-4" /> Download Result
                </a>
              ) : (
                <button disabled className="inline-flex items-center gap-2 rounded-full bg-primary/5 text-primary/30 px-6 py-2.5 text-sm font-medium cursor-not-allowed">
                  <Download className="h-4 w-4" /> Download Result
                </button>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}