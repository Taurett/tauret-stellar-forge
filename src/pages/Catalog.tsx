import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Eye, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Mock catalog data
const catalogItems = [
  {
    id: 1,
    name: "Football Collection 2024",
    description: "Complete range of football apparel and equipment",
    category: "football",
    items: 45,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  },
  {
    id: 2,
    name: "Basketball Elite Series",
    description: "Professional basketball gear for serious players",
    category: "basketball",
    items: 32,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  },
  {
    id: 3,
    name: "Running Performance Line",
    description: "Advanced running gear for all distances",
    category: "running",
    items: 67,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  },
  {
    id: 4,
    name: "Tennis Pro Collection",
    description: "Professional tennis apparel and accessories",
    category: "tennis",
    items: 28,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  },
  {
    id: 5,
    name: "Soccer Team Gear",
    description: "Complete soccer team equipment and uniforms",
    category: "soccer",
    items: 53,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  },
  {
    id: 6,
    name: "Cycling Performance",
    description: "High-performance cycling apparel and gear",
    category: "cycling",
    items: 34,
    image: "/public/lovable-uploads/3d5d5054-e7b8-40cb-8983-ef4bde177a05.png"
  }
];

const sportCategories = [
  { value: "all", label: "All Sports" },
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "running", label: "Running" },
  { value: "tennis", label: "Tennis" },
  { value: "soccer", label: "Soccer" },
  { value: "cycling", label: "Cycling" }
];

const Catalog = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      <LanguageSwitcher />
      
      {/* Header */}
      <header className="bg-black border-b border-cyan-900/30 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                TAURET CATALOG
              </h1>
              <p className="text-gray-300 mt-2">Browse our complete collections by sport</p>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Download className="h-4 w-4 mr-2" />
              Download Full Catalog
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="px-4 py-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {sportCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-cyan-600 text-white">
                      {sportCategories.find(cat => cat.value === item.category)?.label}
                    </Badge>
                    <div className="absolute top-2 right-2 bg-black/70 text-cyan-400 px-2 py-1 rounded text-sm">
                      {item.items} items
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">{item.name}</CardTitle>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      View Collection
                    </Button>
                    <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No collections found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalog;