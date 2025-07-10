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
    // Add error handling for ad scripts
    const handleAdError = (event: ErrorEvent) => {
      // Only catch errors from the ad scripts
      if (
        (event.filename &&
          event.filename.includes("highperformanceformat.com")) ||
        (event.filename && event.filename.includes("profitableratecpm.com"))
      ) {
        event.preventDefault();
        console.warn("Ad script error intercepted:", event.message);

        // Optionally remove problematic ad container content
        if (adContainerRef.current) {
          adContainerRef.current.innerHTML = "Ad content unavailable";
        }
      }
    };

    window.addEventListener("error", handleAdError, true);

    // Clean up any previous ad scripts
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = "";

      try {
        if (isBanner) {
          // Banner Ad (728x90)
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.innerHTML = `
          atOptions = {
            'key' : 'e5d15dc19a7042b2a3cd56d1c79629dc',
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
            "//www.highperformanceformat.com/e5d15dc19a7042b2a3cd56d1c79629dc/invoke.js";
          adContainerRef.current.appendChild(invokeScript);
        } else {
          // Native/Tower Ad
          const script = document.createElement("script");
          script.async = true;
          script.setAttribute("data-cfasync", "false");
          script.src =
            "//pl27130681.profitableratecpm.com/7f591130f646bbf7879e1d9b26c18b85/invoke.js";
          adContainerRef.current.appendChild(script);

          const container = document.createElement("div");
          container.id = "container-7f591130f646bbf7879e1d9b26c18b85";
          adContainerRef.current.appendChild(container);
        }
      } catch (err) {
        console.error("Error setting up ad:", err);
        if (adContainerRef.current) {
          adContainerRef.current.innerHTML = "Ad failed to load";
        }
      }
    }
    // Cleanup function
    return () => {
      window.removeEventListener("error", handleAdError, true);
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
