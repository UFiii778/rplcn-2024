"use client";

import React, { useState, useRef, useEffect } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  containerClassName = "",
  fill,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true); 
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" } 
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad && imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [shouldLoad, src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${fill ? "w-full h-full" : ""} ${containerClassName}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}

      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt || "Image"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`transition-opacity duration-300 ease-in-out ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${fill ? "w-full h-full object-cover" : ""} ${className}`}
          {...props}
        />
      )}
    </div>
  );
}