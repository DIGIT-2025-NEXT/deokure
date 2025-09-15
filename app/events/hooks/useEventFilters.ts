/*eslint-disable*/
'use client';

import { useState, useMemo } from 'react';
import { City, Tag } from '../data/types';

export const useEventFilters = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const clearFilters = () => {
    setSelectedCity(null);
    setSelectedTags([]);
  };

  const addTag = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.find(t => t.id === tag.id) ? prev : [...prev, tag]
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tagId));
  };

  return {
    selectedCity,
    selectedTags,
    setSelectedCity,
    clearFilters,
    addTag,
    removeTag,
  };
};