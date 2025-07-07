import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  type: "banner" | "tower";
}

/**
 * A responsive placeholder component for advertisements.
 * It is hidden on smaller screens (below lg) to avoid disrupting the user experience.
 * - 'banner' type is for wide, horizontal ad spaces.
 * - 'tower' type is for tall, vertical ad spaces.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ type }) => {
  const isBanner = type === "banner";
  const adContainerRef = useRef<HTMLDivElement>(null);

  const containerClasses = [
    "hidden lg:flex", // Only show on large screens to not disturb mobile users
    "w-full",
    "items-center",
    "justify-center",
    "rounded-xl",
    "bg-slate-800/30",
    "border",
    "border-dashed",
    "border-slate-700",
    "text-slate-500",
    "text-xs",
    "font-sans",
    "tracking-widest",
    "uppercase",
    "select-none",
    isBanner ? "min-h-[90px]" : "min-h-[250px]",
  ].join(" ");

  useEffect(() => {
    // Clean up any previous ad scripts
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = "";

      if (isBanner) {
        // Banner Ad (728x90)
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
          atOptions = {
            'key' : '9fb33e8ea293c96e0f77edbb79b68b38',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        adContainerRef.current.appendChild(script);

        const invokeScript = document.createElement("script");
        invokeScript.type = "text/javascript";
        invokeScript.src =
          "//www.highperformanceformat.com/9fb33e8ea293c96e0f77edbb79b68b38/invoke.js";
        adContainerRef.current.appendChild(invokeScript);
      } else {
        // Native/Tower Ad
        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.src =
          "//pl27106144.profitableratecpm.com/7ec6a82f409abb7bc84e148097b613a6/invoke.js";
        adContainerRef.current.appendChild(script);

        const container = document.createElement("div");
        container.id = "container-7ec6a82f409abb7bc84e148097b613a6";
        adContainerRef.current.appendChild(container);
      }
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = "";
      }
    };
  }, [isBanner]);

  return (
    <div
      className={containerClasses}
      aria-label="Advertisement Space"
      ref={adContainerRef}
    >
      {/* Ad scripts will be injected here */}
    </div>
  );
};
