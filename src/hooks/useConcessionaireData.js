import { useQueries } from '@tanstack/react-query';

const useConcessionaireData = (id) => {
  return useQueries({
    queries: [
      {
        queryKey: ['concessionaire', id],
        queryFn: async () => {
          const response = await fetch(`http://localhost:8000/api/concessionaire/${id}`);
          if (!response.ok) throw new Error('Error fetching concessionaire data');
          return response.json();
        },
      },
      {
        queryKey: ['comments', id],
        queryFn: async () => {
          const response = await fetch(`http://localhost:8000/api/concessionaire/${id}/comments`);
          if (!response.ok) throw new Error('Error fetching comments data');
          return response.json();
        },
      },
    ],
  });
};

export { 
    useConcessionaireData,
}