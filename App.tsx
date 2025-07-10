import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useSettings } from "./hooks/useSettings";
import { useApiKey } from "./hooks/useApiKey";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";
import { GuidePage } from "./pages/GuidePage";
import type { ImageData, SeoData, Settings } from "./types";
import { generateSeoForImage } from "./services/geminiService";

const App: React.FC = () => {
  const [settings, setSettings] = useSettings();
  const [apiKey, saveApiKey, removeApiKey] = useApiKey();
  const [images, setImages] = useState<ImageData[]>([]);
  const [seoResults, setSeoResults] = useState<
    Record<string, SeoData | { error: string }>
  >({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

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
  }, [apiKey, images, loadingStates, seoResults, settings, handleGenerateSeo]);

  const handleDownloadCsv = useCallback(() => {
    if (images.length === 0) return;

    const headers = [
      "File Name",
      "File Size (KB)",
      "Title",
      "Description",
      "Tags",
    ];
    const rows = images.map((image) => {
      const result = seoResults[image.id];
      if (!result || "error" in result) {
        return [
          image.file.name,
          (image.file.size / 1024).toFixed(2),
          "N/A",
          "N/A",
          "N/A",
        ];
      }
      return [
        image.file.name,
        (image.file.size / 1024).toFixed(2),
        result.title,
        result.description,
        result.tags.join(", "),
      ];
    });

    const csvContent =
      headers.join(",") +
      "\n" +
      rows
        .map((row) => {
          return row
            .map((cell) => {
              if (typeof cell !== "string") return cell;
              // Escape quotes and wrap in quotes if contains comma, newline or quote
              if (
                cell.includes(",") ||
                cell.includes("\n") ||
                cell.includes('"')
              ) {
                return `"${cell.replace(/"/g, '""')}"`;
              }
              return cell;
            })
            .join(",");
        })
        .join("\n");

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

  // Common props for HomePage
  const homePageProps = {
    settings,
    onSettingsChange: setSettings,
    apiKey,
    onSaveApiKey: saveApiKey,
    onRemoveApiKey: removeApiKey,
    images,
    seoResults,
    loadingStates,
    onImagesUpload: handleImagesUpload,
    onGenerateSeo: handleGenerateSeo,
    onRemoveImage: handleRemoveImage,
    onRemoveAll: handleRemoveAll,
    onGenerateAllSeo: handleGenerateAllSeo,
    onDownloadCsv: handleDownloadCsv,
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col">
        <Header />
        <main className="container mx-auto p-4 md:p-8 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage {...homePageProps} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
