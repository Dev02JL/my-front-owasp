const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  if (!token) return { 'Content-Type': 'application/json' };
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchAuthenticated = async (url: string, options: RequestInit = {}) => {
  const defaultHeaders = getAuthHeaders();
  
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Gérer la déconnexion si le token est invalide
    // On pourrait par exemple appeler la fonction logout du contexte ici
    // ou rediriger vers la page de connexion.
    // Pour l'instant, on lance une erreur.
    throw new Error('Non autorisé. Veuillez vous reconnecter.');
  }

  const responseText = await response.text();

  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.error || errorData.message || 'Une erreur est survenue');
    } catch (e) {
      // Si le JSON n'est pas valide, on envoie le texte brut.
      // C'est souvent une page d'erreur HTML du backend.
      throw new Error(responseText || 'Une erreur est survenue sur le serveur.');
    }
  }

  // Gérer le cas où la réponse est vide (ex: 204 No Content)
  if (response.status === 204 || !responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    console.error('Failed to parse JSON response:', responseText);
    // Cette erreur se produit lorsque le serveur renvoie du HTML (par exemple, une erreur Symfony) avec un statut 200 OK.
    throw new Error('Réponse inattendue du serveur. Assurez-vous que l\'API renvoie bien du JSON.');
  }
}; 