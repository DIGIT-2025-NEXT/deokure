import { Event, City, Tag } from '../data/types';

// イベントフィルタリング用ヘルパー関数
export const filterEventsByCity = (events: Event[], cityId: string | null): Event[] => {
  if (!cityId) return events;
  return events.filter(event => event.city.id === cityId);
};

export const filterEventsByTags = (events: Event[], selectedTags: Tag[]): Event[] => {
  if (selectedTags.length === 0) return events;
  return events.filter(event => 
    selectedTags.some(selectedTag => 
      event.tags.some(eventTag => eventTag.id === selectedTag.id)
    )
  );
};

export const formatEventDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(date);
};

export const searchEvents = (events: Event[], query: string): Event[] => {
  if (!query.trim()) return events;
  
  const lowercaseQuery = query.toLowerCase();
  return events.filter(event =>
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.city.label.toLowerCase().includes(lowercaseQuery) ||
    event.tags.some(tag => tag.label.toLowerCase().includes(lowercaseQuery))
  );
};
