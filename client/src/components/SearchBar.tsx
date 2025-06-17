import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products, searchWithKeywordMapping } from "../data/products";
import { categories } from "../data/categories";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{type: 'product' | 'category' | 'keyword', item: any}>>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingKeywords = ["sport shoes", "women sandals", "earbuds", "watches", "men slippers"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const newSuggestions = [];

      // Product suggestions
      const productMatches = products
        .filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
        .slice(0, 3)
        .map(product => ({ type: 'product' as const, item: product }));

      // Category suggestions
      const categoryMatches = categories
        .filter(category => category.name.toLowerCase().includes(query))
        .slice(0, 2)
        .map(category => ({ type: 'category' as const, item: category }));

      // Keyword suggestions
      const keywordMatches = trendingKeywords
        .filter(keyword => keyword.toLowerCase().includes(query))
        .slice(0, 2)
        .map(keyword => ({ type: 'keyword' as const, item: keyword }));

      newSuggestions.push(...productMatches, ...categoryMatches, ...keywordMatches);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const { categoryRedirect } = searchWithKeywordMapping(searchQuery.trim());
      
      if (categoryRedirect) {
        navigate(`/category/${categoryRedirect}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {type: 'product' | 'category' | 'keyword', item: any}) => {
    if (suggestion.type === 'product') {
      navigate(`/product/${suggestion.item.id}`);
    } else if (suggestion.type === 'category') {
      navigate(`/category/${suggestion.item.id}`);
    } else {
      const { categoryRedirect } = searchWithKeywordMapping(suggestion.item);
      if (categoryRedirect) {
        navigate(`/category/${categoryRedirect}`);
      } else {
        setSearchQuery(suggestion.item);
        navigate(`/search?q=${encodeURIComponent(suggestion.item)}`);
      }
    }
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <Input
            type="text"
            placeholder="Search for products, brands, categories..."
            className="w-full rounded-r-none border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
          />
          <Button 
            type="submit"
            variant="default"
            className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || !searchQuery) && (
        <Card className="absolute top-full left-0 right-0 mt-1 bg-white shadow-xl border-2 border-gray-100 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {!searchQuery && (
              <div className="mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 px-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Searches
                </div>
                {trendingKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                    onClick={() => handleSuggestionClick({ type: 'keyword', item: keyword })}
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{keyword}</span>
                  </div>
                ))}
              </div>
            )}

            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.type === 'product' && (
                  <>
                    <img 
                      src={suggestion.item.image[0]} 
                      alt={suggestion.item.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{suggestion.item.name}</div>
                      <div className="text-xs text-gray-500">₹{suggestion.item.discountedPrice || suggestion.item.price}</div>
                    </div>
                  </>
                )}
                
                {suggestion.type === 'category' && (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{suggestion.item.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{suggestion.item.name}</div>
                      <div className="text-xs text-gray-500">Category</div>
                    </div>
                  </>
                )}
                
                {suggestion.type === 'keyword' && (
                  <>
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{suggestion.item}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
