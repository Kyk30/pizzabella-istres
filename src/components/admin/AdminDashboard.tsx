"use client";

import { useState, useEffect, useCallback } from "react";
import { SiteContent, MenuCategory, MenuItem, Event as SiteEvent } from "@/lib/types";

type Tab = "info" | "menu" | "events" | "gallery";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/content");
    if (res.ok) {
      setContent(await res.json());
      setHasChanges(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  function updateContent(updater: (c: SiteContent) => SiteContent) {
    if (!content) return;
    setContent(updater(content));
    setHasChanges(true);
    setMessage(null);
  }

  async function saveAll() {
    if (!content) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Modifications sauvegardees !" });
        setHasChanges(false);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Erreur lors de la sauvegarde" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion au serveur" });
    }

    setSaving(false);
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-spin">🍕</div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "info", label: "Informations", icon: "ℹ️" },
    { id: "menu", label: "Menu", icon: "📋" },
    { id: "events", label: "Evenements", icon: "📢" },
    { id: "gallery", label: "Galerie", icon: "📷" },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="bg-brand-dark text-white px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">🍕</span>
          <span className="font-heading font-bold">Pizza Bella Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-sm text-stone-400 hover:text-white transition-colors"
          >
            Voir le site →
          </a>
          <button
            onClick={onLogout}
            className="text-sm text-stone-400 hover:text-red-400 transition-colors"
          >
            Deconnexion
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-brand-red text-white"
                  : "bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {activeTab === "info" && (
            <InfoTab content={content} updateContent={updateContent} />
          )}
          {activeTab === "menu" && (
            <MenuTab content={content} updateContent={updateContent} />
          )}
          {activeTab === "events" && (
            <EventsTab content={content} updateContent={updateContent} />
          )}
          {activeTab === "gallery" && (
            <GalleryTab content={content} updateContent={updateContent} />
          )}
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-0 bg-stone-100 border-t border-stone-200 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              {message && (
                <p
                  className={`text-sm font-medium ${
                    message.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message.text}
                </p>
              )}
              {hasChanges && !message && (
                <p className="text-sm text-amber-600 font-medium">
                  Modifications non sauvegardees
                </p>
              )}
            </div>
            <button
              onClick={saveAll}
              disabled={saving || !hasChanges}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== INFO TAB ========== */
function InfoTab({
  content,
  updateContent,
}: {
  content: SiteContent;
  updateContent: (fn: (c: SiteContent) => SiteContent) => void;
}) {
  function updateInfo(field: string, value: string | number) {
    updateContent((c) => ({
      ...c,
      info: { ...c.info, [field]: value },
    }));
  }

  function updateHero(field: string, value: string) {
    updateContent((c) => ({
      ...c,
      hero: { ...c.hero, [field]: value },
    }));
  }

  function updateHours(index: number, hours: string) {
    updateContent((c) => ({
      ...c,
      info: {
        ...c.info,
        hours: c.info.hours.map((h, i) => (i === index ? { ...h, hours } : h)),
      },
    }));
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-heading font-bold mb-4">Informations du restaurant</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom" value={content.info.name} onChange={(v) => updateInfo("name", v)} />
          <Field label="Sous-titre" value={content.info.subtitle} onChange={(v) => updateInfo("subtitle", v)} />
          <Field label="Adresse" value={content.info.address} onChange={(v) => updateInfo("address", v)} />
          <Field label="Ville" value={content.info.city} onChange={(v) => updateInfo("city", v)} />
          <Field label="Code postal" value={content.info.postalCode} onChange={(v) => updateInfo("postalCode", v)} />
          <Field label="Telephone" value={content.info.phone} onChange={(v) => updateInfo("phone", v)} />
          <Field label="Email" value={content.info.email} onChange={(v) => updateInfo("email", v)} />
          <Field
            label="Commande minimum livraison (€)"
            value={String(content.info.deliveryMinimum)}
            onChange={(v) => updateInfo("deliveryMinimum", parseFloat(v) || 0)}
            type="number"
          />
        </div>
        <div className="mt-4">
          <Field
            label="Description"
            value={content.info.description}
            onChange={(v) => updateInfo("description", v)}
            textarea
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-bold mb-4">Horaires</h3>
        <div className="space-y-2">
          {content.info.hours.map((h, i) => (
            <div key={h.day} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-stone-700">{h.day}</span>
              <input
                type="text"
                value={h.hours}
                onChange={(e) => updateHours(i, e.target.value)}
                className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                placeholder="Ex: 18h00 - 22h00 ou Fermé"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-bold mb-4">Page d&apos;accueil (Hero)</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Titre principal" value={content.hero.title} onChange={(v) => updateHero("title", v)} />
          <Field label="Sous-titre" value={content.hero.subtitle} onChange={(v) => updateHero("subtitle", v)} />
          <Field label="Texte du bouton" value={content.hero.ctaText} onChange={(v) => updateHero("ctaText", v)} />
          <Field label="Lien du bouton" value={content.hero.ctaLink} onChange={(v) => updateHero("ctaLink", v)} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-bold mb-4">Reseaux sociaux</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Facebook (URL)"
            value={content.info.socialLinks.facebook || ""}
            onChange={(v) =>
              updateContent((c) => ({
                ...c,
                info: { ...c.info, socialLinks: { ...c.info.socialLinks, facebook: v } },
              }))
            }
          />
          <Field
            label="Instagram (URL)"
            value={content.info.socialLinks.instagram || ""}
            onChange={(v) =>
              updateContent((c) => ({
                ...c,
                info: { ...c.info, socialLinks: { ...c.info.socialLinks, instagram: v } },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

/* ========== MENU TAB ========== */
function MenuTab({
  content,
  updateContent,
}: {
  content: SiteContent;
  updateContent: (fn: (c: SiteContent) => SiteContent) => void;
}) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  function addCategory() {
    const newCat: MenuCategory = {
      id: generateId(),
      name: "Nouvelle categorie",
      description: "",
      items: [],
    };
    updateContent((c) => ({ ...c, menu: [...c.menu, newCat] }));
    setExpandedCategory(newCat.id);
  }

  function removeCategory(id: string) {
    updateContent((c) => ({ ...c, menu: c.menu.filter((cat) => cat.id !== id) }));
  }

  function updateCategory(id: string, field: string, value: string) {
    updateContent((c) => ({
      ...c,
      menu: c.menu.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)),
    }));
  }

  function addItem(categoryId: string) {
    const newItem: MenuItem = {
      id: generateId(),
      name: "Nouvel article",
      description: "",
      price: 0,
    };
    updateContent((c) => ({
      ...c,
      menu: c.menu.map((cat) =>
        cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat
      ),
    }));
  }

  function removeItem(categoryId: string, itemId: string) {
    updateContent((c) => ({
      ...c,
      menu: c.menu.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      ),
    }));
  }

  function updateItem(categoryId: string, itemId: string, field: string, value: string | number) {
    updateContent((c) => ({
      ...c,
      menu: c.menu.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : cat
      ),
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-bold">Gestion du Menu</h3>
        <button onClick={addCategory} className="btn-primary text-sm !px-4 !py-2">
          + Categorie
        </button>
      </div>

      <div className="space-y-4">
        {content.menu.map((category) => (
          <div key={category.id} className="border border-stone-200 rounded-lg overflow-hidden">
            {/* Category Header */}
            <div
              className="bg-stone-50 px-4 py-3 flex items-center justify-between cursor-pointer"
              onClick={() =>
                setExpandedCategory(expandedCategory === category.id ? null : category.id)
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-sm">{expandedCategory === category.id ? "▼" : "▶"}</span>
                <span className="font-semibold">{category.name}</span>
                <span className="text-xs text-stone-400 bg-stone-200 px-2 py-0.5 rounded-full">
                  {category.items.length} articles
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Supprimer la categorie "${category.name}" et tous ses articles ?`)) {
                    removeCategory(category.id);
                  }
                }}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
            </div>

            {/* Category Content */}
            {expandedCategory === category.id && (
              <div className="p-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Nom de la categorie"
                    value={category.name}
                    onChange={(v) => updateCategory(category.id, "name", v)}
                  />
                  <Field
                    label="Description (optionnel)"
                    value={category.description || ""}
                    onChange={(v) => updateCategory(category.id, "description", v)}
                  />
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm text-stone-600">Articles</h4>
                    <button
                      onClick={() => addItem(category.id)}
                      className="text-sm text-brand-red hover:text-brand-red-dark font-medium"
                    >
                      + Ajouter un article
                    </button>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="bg-stone-50 rounded-lg p-3">
                        <div className="grid grid-cols-[1fr_1fr_80px_auto] gap-2 items-end">
                          <Field
                            label="Nom"
                            value={item.name}
                            onChange={(v) => updateItem(category.id, item.id, "name", v)}
                            small
                          />
                          <Field
                            label="Description"
                            value={item.description}
                            onChange={(v) => updateItem(category.id, item.id, "description", v)}
                            small
                          />
                          <Field
                            label="Prix (€)"
                            value={String(item.price)}
                            onChange={(v) => updateItem(category.id, item.id, "price", parseFloat(v) || 0)}
                            type="number"
                            small
                          />
                          <button
                            onClick={() => removeItem(category.id, item.id)}
                            className="text-red-400 hover:text-red-600 pb-1 text-lg"
                            title="Supprimer"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                    {category.items.length === 0 && (
                      <p className="text-sm text-stone-400 text-center py-4">
                        Aucun article. Cliquez sur &quot;+ Ajouter un article&quot; pour commencer.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== EVENTS TAB ========== */
function EventsTab({
  content,
  updateContent,
}: {
  content: SiteContent;
  updateContent: (fn: (c: SiteContent) => SiteContent) => void;
}) {
  function addEvent() {
    const newEvent: SiteEvent = {
      id: generateId(),
      title: "Nouvel evenement",
      description: "",
      active: true,
    };
    updateContent((c) => ({ ...c, events: [...c.events, newEvent] }));
  }

  function removeEvent(id: string) {
    updateContent((c) => ({ ...c, events: c.events.filter((e) => e.id !== id) }));
  }

  function updateEvent(id: string, field: string, value: string | boolean) {
    updateContent((c) => ({
      ...c,
      events: c.events.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold">Evenements & Annonces</h3>
          <p className="text-sm text-stone-500">
            Ajoutez des annonces visibles sur la page d&apos;accueil
          </p>
        </div>
        <button onClick={addEvent} className="btn-primary text-sm !px-4 !py-2">
          + Evenement
        </button>
      </div>

      <div className="space-y-4">
        {content.events.map((event) => (
          <div key={event.id} className="border border-stone-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={event.active}
                    onChange={(e) => updateEvent(event.id, "active", e.target.checked)}
                    className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
                  />
                  <span className={`text-sm ${event.active ? "text-green-600" : "text-stone-400"}`}>
                    {event.active ? "Actif" : "Masque"}
                  </span>
                </label>
              </div>
              <button
                onClick={() => removeEvent(event.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label="Titre"
                value={event.title}
                onChange={(v) => updateEvent(event.id, "title", v)}
              />
              <Field
                label="Date (optionnel)"
                value={event.date || ""}
                onChange={(v) => updateEvent(event.id, "date", v)}
                placeholder="Ex: 14 fevrier 2025"
              />
            </div>
            <div className="mt-3">
              <Field
                label="Description"
                value={event.description}
                onChange={(v) => updateEvent(event.id, "description", v)}
                textarea
              />
            </div>
          </div>
        ))}

        {content.events.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <p className="text-3xl mb-2">📢</p>
            <p>Aucun evenement. Cliquez sur &quot;+ Evenement&quot; pour en ajouter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== GALLERY TAB ========== */
function GalleryTab({
  content,
  updateContent,
}: {
  content: SiteContent;
  updateContent: (fn: (c: SiteContent) => SiteContent) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        updateContent((c) => ({
          ...c,
          gallery: [
            ...c.gallery,
            { id: generateId(), url, alt: file.name.replace(/\.[^/.]+$/, "") },
          ],
        }));
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de l'upload");
      }
    } catch {
      alert("Erreur de connexion");
    }
    setUploading(false);
    e.target.value = "";
  }

  function removeFromGallery(id: string) {
    updateContent((c) => ({
      ...c,
      gallery: c.gallery.filter((img) => img.id !== id),
    }));
  }

  function updateAlt(id: string, alt: string) {
    updateContent((c) => ({
      ...c,
      gallery: c.gallery.map((img) => (img.id === id ? { ...img, alt } : img)),
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold">Galerie Photos</h3>
          <p className="text-sm text-stone-500">
            Photos visibles sur la page d&apos;accueil (JPG, PNG, WebP - max 5 Mo)
          </p>
        </div>
        <label className="btn-primary text-sm !px-4 !py-2 cursor-pointer">
          {uploading ? "Upload..." : "+ Photo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {content.gallery.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.gallery.map((img) => (
            <div key={img.id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => updateAlt(img.id, e.target.value)}
                  placeholder="Description de l'image"
                  className="w-full text-xs px-2 py-1 border border-stone-200 rounded focus:ring-1 focus:ring-brand-red outline-none"
                />
              </div>
              <button
                onClick={() => removeFromGallery(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center
                         opacity-0 group-hover:opacity-100 transition-opacity text-sm hover:bg-red-600"
                title="Supprimer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-stone-400">
          <p className="text-3xl mb-2">📷</p>
          <p>Aucune photo. Cliquez sur &quot;+ Photo&quot; pour en ajouter.</p>
        </div>
      )}
    </div>
  );
}

/* ========== SHARED FIELD COMPONENT ========== */
function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  placeholder,
  small = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  small?: boolean;
}) {
  const inputClasses = `w-full px-3 ${
    small ? "py-1.5 text-sm" : "py-2"
  } border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none`;

  return (
    <div>
      <label className={`block ${small ? "text-xs" : "text-sm"} font-medium text-stone-600 mb-1`}>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} min-h-[80px] resize-y`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
          step={type === "number" ? "0.01" : undefined}
        />
      )}
    </div>
  );
}
