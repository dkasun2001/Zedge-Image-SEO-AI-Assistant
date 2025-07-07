import React, { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useSettings } from "./hooks/useSettings";
import { useApiKey } from "./hooks/useApiKey";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";
import { GuidePage } from "./pages/GuidePage";
import type { ImageData, SeoData, Settings, Page } from "./types";
import { generateSeoForImage } from "./services/geminiService";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(() => {
    // Initialize from URL hash
    const hash = window.location.hash.slice(1) as Page;
    return ["home", "about", "contact", "terms", "guide"].includes(hash)
      ? hash
      : "home";
  });

  const [settings, setSettings] = useSettings();
  const [apiKey, saveApiKey, removeApiKey] = useApiKey();
  const [images, setImages] = useState<ImageData[]>([]);
  const [seoResults, setSeoResults] = useState<
    Record<string, SeoData | { error: string }>
  >({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  // Update URL when page changes
  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  // Listen for hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (["home", "about", "contact", "terms", "guide"].includes(hash)) {
        setPage(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleImagesUpload = (newImages: ImageData[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    setSeoResults((prevResults) => {
      const newResults = { ...prevResults };
      delete newResults[id];
      return newResults;
    });
    setLoadingStates((prevLoading) => {
      const newLoading = { ...prevLoading };
      delete newLoading[id];
      return newLoading;
    });
  };

  const handleRemoveAll = () => {
    setImages([]);
    setSeoResults({});
    setLoadingStates({});
  };

  const handleGenerateSeo = useCallback(
    async (image: ImageData, currentSettings: Settings) => {
      if (!apiKey) {
        alert("Please set your API key in the settings panel first.");
        return;
      }
      setLoadingStates((prev) => ({ ...prev, [image.id]: true }));
      try {
        const result = await generateSeoForImage(
          image.base64,
          currentSettings,
          apiKey
        );
        setSeoResults((prev) => ({ ...prev, [image.id]: result }));
      } catch (error) {
        console.error("Error generating SEO:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        setSeoResults((prev) => ({
          ...prev,
          [image.id]: { error: errorMessage },
        }));
      } finally {
        setLoadingStates((prev) => ({ ...prev, [image.id]: false }));
      }
    },
    [apiKey]
  );

  const handleGenerateAllSeo = useCallback(async () => {
    if (!apiKey) {
      alert("Please set your API key in the settings panel first.");
      return;
    }
    const imagesToProcess = images.filter(
      (image) => !seoResults[image.id] && !loadingStates[image.id]
    );

    if (imagesToProcess.length === 0) {
      return;
    }

    await Promise.all(
      imagesToProcess.map((image) => handleGenerateSeo(image, settings))
    );
  }, [images, seoResults, loadingStates, settings, handleGenerateSeo, apiKey]);

  const handleDownloadCsv = useCallback(() => {
    const successfulResults = images.filter(
      (image) => seoResults[image.id] && !("error" in seoResults[image.id])
    );

    if (successfulResults.length === 0) {
      console.warn("No successful SEO data to download.");
      return;
    }

    const headers = ["filename", "title", "description", "tags"];
    const csvRows = [headers.join(",")]; // Header row

    successfulResults.forEach((image) => {
      const result = seoResults[image.id] as SeoData;
      const rowData = [
        image.file.name,
        result.title,
        result.description,
        result.tags.join(", "), // Tags as a single comma-separated string
      ];
      const escapedRow = rowData
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",");
      csvRows.push(escapedRow);
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "image_seo_data.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [images, seoResults]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <HomePage
            settings={settings}
            onSettingsChange={setSettings}
            apiKey={apiKey}
            onSaveApiKey={saveApiKey}
            onRemoveApiKey={removeApiKey}
            images={images}
            seoResults={seoResults}
            loadingStates={loadingStates}
            onImagesUpload={handleImagesUpload}
            onGenerateSeo={handleGenerateSeo}
            onRemoveImage={handleRemoveImage}
            onRemoveAll={handleRemoveAll}
            onGenerateAllSeo={handleGenerateAllSeo}
            onDownloadCsv={handleDownloadCsv}
          />
        );
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "terms":
        return <TermsPage />;
      case "guide":
        return <GuidePage />;
      default:
        return (
          <HomePage
            settings={settings}
            onSettingsChange={setSettings}
            apiKey={apiKey}
            onSaveApiKey={saveApiKey}
            onRemoveApiKey={removeApiKey}
            images={images}
            seoResults={seoResults}
            loadingStates={loadingStates}
            onImagesUpload={handleImagesUpload}
            onGenerateSeo={handleGenerateSeo}
            onRemoveImage={handleRemoveImage}
            onRemoveAll={handleRemoveAll}
            onGenerateAllSeo={handleGenerateAllSeo}
            onDownloadCsv={handleDownloadCsv}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col">
      <Header page={page} setPage={setPage} />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;
