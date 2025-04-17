
import { GenerateResponse } from './types';

export const getMockData = (type: 'logo' | 'theme' | 'image'): GenerateResponse => {
  const mockImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzMzNjZGRiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5NZXRhU3RyZWFtPC90ZXh0Pjwvc3ZnPg==';
  
  if (type === 'logo') {
    return { logos: [mockImage, mockImage, mockImage, mockImage] };
  } else if (type === 'theme') {
    return { 
      themes: [
        {
          id: "theme-mock-1",
          name: "MetaStream Primary",
          colors: [
            { name: "primary", value: "#3B82F6" },
            { name: "secondary", value: "#1D4ED8" },
            { name: "accent", value: "#F59E0B" },
            { name: "background", value: "#1E293B" },
            { name: "text", value: "#F8FAFC" }
          ]
        },
        {
          id: "theme-mock-2",
          name: "MetaStream Vibrant",
          colors: [
            { name: "primary", value: "#8B5CF6" },
            { name: "secondary", value: "#7C3AED" },
            { name: "accent", value: "#EC4899" },
            { name: "background", value: "#18181B" },
            { name: "text", value: "#F9FAFB" }
          ]
        },
        {
          id: "theme-mock-3",
          name: "MetaStream Subtle",
          colors: [
            { name: "primary", value: "#10B981" },
            { name: "secondary", value: "#059669" },
            { name: "accent", value: "#6366F1" },
            { name: "background", value: "#F8FAFC" },
            { name: "text", value: "#1E293B" }
          ]
        }
      ]
    };
  } else if (type === 'image') {
    return { images: [mockImage, mockImage, mockImage, mockImage] };
  }
  return {};
};
