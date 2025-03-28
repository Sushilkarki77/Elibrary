export const formatDate = (dateString: string, locale: string = 'en-US'): string => {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  