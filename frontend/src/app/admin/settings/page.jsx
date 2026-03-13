"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import api from "@/lib/api";

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    brandName: "",
    logo: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
    footerDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get("/settings");
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/settings", settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to save settings");
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Site Settings</h1>
          <p className="text-gray-500">Manage global configurations, contact info, and branding.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-primary-blue hover:bg-blue-600 rounded-xl h-12 px-8 flex items-center gap-2 shadow-lg shadow-blue-100"
        >
          <Save size={20} /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branding Section */}
        <Card className="p-6 border-none shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Globe className="text-primary-blue" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Branding</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Brand Name</label>
              <Input 
                value={settings.brandName} 
                onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                onFocus={(e) => e.target.select()}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Logo Path / URL</label>
              <Input 
                value={settings.logo} 
                onChange={(e) => setSettings({...settings, logo: e.target.value})}
                onFocus={(e) => e.target.select()}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Footer Description</label>
              <textarea 
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue h-24"
                value={settings.footerDescription} 
                onChange={(e) => setSettings({...settings, footerDescription: e.target.value})}
              />
            </div>
          </div>
        </Card>

        {/* Contact info Section */}
        <Card className="p-6 border-none shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Mail className="text-primary-blue" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Contact Info</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.contactEmail} 
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.contactPhone} 
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.address} 
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Social Links Section */}
        <Card className="p-6 border-none shadow-sm space-y-6 md:col-span-2">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Facebook className="text-primary-blue" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Social Media Links</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Facebook URL</label>
              <div className="relative">
                <Facebook className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.socialLinks.facebook} 
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: e.target.value}})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Instagram URL</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.socialLinks.instagram} 
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Twitter URL</label>
              <div className="relative">
                <Twitter className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.socialLinks.twitter} 
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: e.target.value}})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">LinkedIn URL</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-2.5 text-gray-300" size={18} />
                <Input 
                  className="pl-10"
                  value={settings.socialLinks.linkedin} 
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, linkedin: e.target.value}})}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;
